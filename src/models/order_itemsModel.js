const pool = require("../config/database");

const getOrderItems = async () => {
    const result = await pool.query("SELECT * FROM order_items");
    return result.rows;
};

const getOrderItemsById = async (id) => {
    const result = await pool.query("SELECT * from order_items WHERE id = $1", [id]);
    return result.rows;
};

const createOrderItem = async (order_id, featured_product_id, product_id, quantity, price) => {
    const result = await pool.query(
        "INSERT INTO order_items (order_id, featured_product_id, product_id, quantity, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [order_id, featured_product_id, product_id, quantity, price]
    );
    return result.rows[0];
};

const updateOrderItem = async (id, order_id, featured_product_id, product_id, quantity, price) => {
    const currentOrderItem = await pool.query("SELECT * FROM order_items WHERE id = $1", [id]);
    if (!currentOrderItem.rows[0]) {
        throw new Error("Item do carrinho não encontrado.");
    }

    const updateOrderItem = order_id ?? currentOrderItem.rows[0].order_id;
    const updateFeaturedProductBranches = featured_product_id ?? currentOrderItem.rows[0].featured_product_id;
    const updateProductId = product_id ?? currentOrderItem.rows[0].product_id;
    const updateQuantity = quantity ?? currentOrderItem.rows[0].quantity;
    const updatePrice = price ?? currentOrderItem.rows[0].price;

    const result = await pool.query(
        "UPDATE order_items SET order_id = $1, featured_product_id = $2, product_id = $3, quantity = $4, price = $5 WHERE id = $6 RETURNING *",
        [updateOrderItem, updateFeaturedProductBranches, updateProductId, updateQuantity, updatePrice, id]
    );
    return result.rows[0];
};

const deleteOrderItem = async (id) => {
    const result = await pool.query("DELETE FROM order_items WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {getOrderItems, getOrderItemsById, createOrderItem, updateOrderItem, deleteOrderItem}