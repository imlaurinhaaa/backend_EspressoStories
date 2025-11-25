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

const createCartItem = async (cart_id, product_id, featured_product_id, quantity, price, observations) => {
    const result = await pool.query(
        "INSERT INTO cart_items (cart_id, product_id, featured_product_id, quantity, price, observations) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
        [cart_id, product_id, featured_product_id, quantity, price, observations]
    );
    return result.rows[0];
};

const updateCartItem = async (id, cart_id, product_id, featured_product_id, quantity, price, observations) => {
    const currentCartItem = await pool.query("SELECT * FROM cart_items WHERE id = $1", [id]);
    if (!currentCartItem.rows[0]) {
        throw new Error("Item do carrinho não encontrado.");
    }

    const updateCartId = cart_id || currentCartItem.rows[0].cart_id;
    const updateProductId = product_id || currentCartItem.rows[0].product_id;
    const updateFeaturedProductId = featured_product_id || currentCartItem.rows[0].featured_product_id;
    const updateQuantity = quantity || currentCartItem.rows[0].quantity;
    const updatePrice = price || currentCartItem.rows[0].price;
    const updateObservations = observations || currentCartItem.rows[0].observations;

    const result = await pool.query(
        "UPDATE cart_items SET cart_id = $1, product_id = $2, featured_product_id = $3, quantity = $4, price = $5, observations = $6 WHERE id = $7 RETURNING *", 
        [updateCartId, updateProductId, updateFeaturedProductId, updateQuantity, updatePrice, updateObservations, id] 
    );
    return result.rows[0];
};

const deleteCartItem = async (id) => {
    const result = await pool.query("DELETE FROM cart_items WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {getCartItems, getCartItemsById, createCartItem, updateCartItem, deleteCartItem};