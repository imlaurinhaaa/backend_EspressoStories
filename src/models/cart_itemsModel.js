const pool = require("../config/database");

const getCartItems = async (product_id) => {
    let query = "SELECT cart_items.* FROM cart_items";
    let params = [];

    if (product_id) {
        params.push(product_id);
        query += " WHERE cart_items.product_id = $1";
    }

    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar itens do carrinho: ${error.message}`);
    }
};

const getCartItemsById = async (id) => {
    const result = await pool.query("SELECT * FROM cart_items WHERE id = $1", [id]);
    return result.rows[0];
};

const calculatePrice = (unitPrice, quantity) => {
    const up = Number(unitPrice);
    const q = Number(quantity);
    if (Number.isNaN(up) || Number.isNaN(q)) {
        throw new Error("Preço do produto ou quantidade inválidos.");
    }
    return (Math.round((up * q) * 100) / 100).toFixed(2);
};

const createCartItem = async (cart_id, product_id, featured_product_id = null, quantity = 1, observations = null) => {
    if (!cart_id || !product_id || !quantity) {
        throw new Error("Os campos cart_id, product_id e quantity são obrigatórios.");
    }
    const productResult = await pool.query("SELECT price FROM products WHERE id = $1", [product_id]);
    if (productResult.rowCount === 0) {
        throw new Error("Produto não encontrado.");
    }

    const unitPrice = productResult.rows[0].price;
    const price = calculatePrice(unitPrice, quantity);

    const result = await pool.query(
        `INSERT INTO cart_items 
            (cart_id, product_id, featured_product_id, quantity, price, observations) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [cart_id, product_id, featured_product_id, quantity, price, observations]
    );
    return result.rows[0];
};

const updateCartItem = async (id, { cart_id, product_id, featured_product_id, quantity, observations }) => {
    const currentRes = await pool.query("SELECT * FROM cart_items WHERE id = $1", [id]);
    if (currentRes.rowCount === 0) {
        throw new Error("Item do carrinho não encontrado.");
    }
    const current = currentRes.rows[0];

    const updateCartId = cart_id ?? current.cart_id;
    const updateProductId = product_id ?? current.product_id;
    const updateFeaturedProductId = featured_product_id ?? current.featured_product_id;
    const updateQuantity = quantity ?? current.quantity;
    const updateObservations = observations ?? current.observations;

    const productResult = await pool.query("SELECT price FROM products WHERE id = $1", [updateProductId]);
    if (productResult.rowCount === 0) {
        throw new Error("Produto não encontrado.");
    }
    const unitPrice = productResult.rows[0].price;
    const updatePrice = calculatePrice(unitPrice, updateQuantity);

    const result = await pool.query(
        `UPDATE cart_items 
         SET cart_id = $1, product_id = $2, featured_product_id = $3, quantity = $4, price = $5, observations = $6 
         WHERE id = $7 RETURNING *`,
        [updateCartId, updateProductId, updateFeaturedProductId, updateQuantity, updatePrice, updateObservations, id]
    );
    return result.rows[0];
};

const deleteCartItem = async (id) => {
    const result = await pool.query("DELETE FROM cart_items WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const getItemsByCartId = async (cart_id) => {
    try {
        const result = await pool.query(
            `SELECT 
                ci.*, 
                p.name AS product_name,
                p.photo AS product_photo
            FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.cart_id = $1
            ORDER BY ci.id DESC`,
            [cart_id]
        );
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar itens do carrinho: ${error.message}`);
    }
};

module.exports = {
    getCartItems,
    getCartItemsById,
    createCartItem,
    updateCartItem,
    deleteCartItem,
    getItemsByCartId
};
