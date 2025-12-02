const pool = require("../config/database");

const getOrderItems = async (product_id) => {
    let query = "SELECT order_items.* FROM order_items";
    const params = [];

    if (product_id) {
        params.push(product_id);
        query += " WHERE order_items.product_id = $1";
    }

    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar itens da encomenda: ${error.message}`);
    }
};

const getOrderItemsById = async (id) => {
    console.log("Fetching order item with ID:", id);
    try {
        const result = await pool.query(
            `SELECT 
                oi.id,
                oi.quantity,
                oi.price,
                p.name
                FROM order_items oi
                LEFT JOIN products p ON p.id = oi.product_id
                LEFT JOIN feature_products fp ON fp.id = oi.featured_product_id
                WHERE oi.order_id = $1`,
            [id]
        );
        return result.rows;
    } catch (error) {
        console.error(error);
        throw new Error("Erro ao buscar item da encomenda por ID.");
    }
};

const calculatePrice = (unitPrice, quantity) => {
    const up = Number(unitPrice);
    const q = Number(quantity);
    if (Number.isNaN(up) || Number.isNaN(q)) {
        throw new Error("Preço do produto ou quantidade inválidos.");
    }
    return (Math.round((up * q) * 100) / 100).toFixed(2);
};

const createOrderItem = async (order_id, featured_product_id = null, product_id = null, quantity = 1) => {
    if (!order_id || (!featured_product_id && !product_id) || !quantity) {
        throw new Error("Os campos order_id, product_id/featured_product_id e quantity são obrigatórios.");
    }

    let unitPrice;
    if (product_id) {
        const prodRes = await pool.query("SELECT price FROM products WHERE id = $1", [product_id]);
        if (prodRes.rowCount === 0) {
            throw new Error("Produto não encontrado.");
        }
        unitPrice = prodRes.rows[0].price;
    } else {
        const featRes = await pool.query("SELECT price FROM feature_products WHERE id = $1", [featured_product_id]);
        if (featRes.rowCount === 0) {
            throw new Error("Produto em destaque não encontrado.");
        }
        unitPrice = featRes.rows[0].price;
    }

    const price = calculatePrice(unitPrice, quantity);

    const result = await pool.query(
        `INSERT INTO order_items (order_id, featured_product_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [order_id, featured_product_id, product_id, quantity, price]
    );
    return result.rows[0];
};

const updateOrderItem = async (id, order_id = null, featured_product_id = null, product_id = null, quantity = null) => {
    const currentRes = await pool.query("SELECT * FROM order_items WHERE id = $1", [id]);
    if (currentRes.rowCount === 0) {
        throw new Error("Item da encomenda não encontrado.");
    }
    const current = currentRes.rows[0];

    const updateOrderId = order_id ?? current.order_id;
    const updateFeaturedProductId = featured_product_id ?? current.featured_product_id;
    const updateProductId = product_id ?? current.product_id;
    const updateQuantity = quantity ?? current.quantity;

    let unitPrice;
    if (updateProductId) {
        const prodRes = await pool.query("SELECT price FROM products WHERE id = $1", [updateProductId]);
        if (prodRes.rowCount === 0) {
            throw new Error("Produto não encontrado.");
        }
        unitPrice = prodRes.rows[0].price;
    } else if (updateFeaturedProductId) {
        const featRes = await pool.query("SELECT price FROM feature_products WHERE id = $1", [updateFeaturedProductId]);
        if (featRes.rowCount === 0) {
            throw new Error("Produto em destaque não encontrado.");
        }
        unitPrice = featRes.rows[0].price;
    } else {
        throw new Error("Nenhum produto especificado para o item da encomenda.");
    }

    const updatePrice = calculatePrice(unitPrice, updateQuantity);

    const result = await pool.query(
        `UPDATE order_items SET order_id = $1, featured_product_id = $2, product_id = $3, quantity = $4, price = $5 WHERE id = $6 RETURNING *`,
        [updateOrderId, updateFeaturedProductId, updateProductId, updateQuantity, updatePrice, id]
    );
    return result.rows[0];
};

const deleteOrderItem = async (id) => {
    const result = await pool.query("DELETE FROM order_items WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    getOrderItems,
    getOrderItemsById,
    createOrderItem,
    updateOrderItem,
    deleteOrderItem
};