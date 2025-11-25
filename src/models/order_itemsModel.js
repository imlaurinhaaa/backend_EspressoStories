const pool = require("../config/database");

const getOrderItems = async (product_id) => {
    let query = `
        SELECT 
            order_items.*, 
            products.name AS product_name, 
            products.photo AS product_photo, 
            featured_products.name AS featured_product_name, 
            featured_products.photo AS featured_product_photo, 
            users.name AS user_name
        FROM order_items
        LEFT JOIN products ON order_items.product_id = products.id
        LEFT JOIN featured_products ON order_items.featured_product_id = featured_products.id
        JOIN orders ON order_items.order_id = orders.id
        JOIN users ON orders.user_id = users.id
    `;
    let params = [];

    if (product_id) {
        params.push(product_id);
        query += " WHERE order_items.product_id = $1";
    }

    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar itens do carrinho: ${error.message}`);
    }
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