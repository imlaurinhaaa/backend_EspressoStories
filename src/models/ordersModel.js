const pool = require("../config/database");

const getOrders = async (user_id) => {
    let query = `
        SELECT 
            orders.*, 
            users.name AS user_name, 
            products.name AS product_name, 
            products.photo AS product_photo, 
            feature_products.name AS featured_product_name, 
            feature_products.photo AS featured_product_photo
        FROM orders
        JOIN users ON orders.user_id = users.id
        LEFT JOIN order_items ON orders.id = order_items.order_id
        LEFT JOIN products ON order_items.product_id = products.id
        LEFT JOIN feature_products ON order_items.featured_product_id = feature_products.id
    `;
    let params = [];

    if (user_id) {
        params.push(user_id);
        query += " WHERE orders.user_id = $1";
    }

    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar encomendas: ${error.message}`);
    }
};

const getOrdersById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Encomenda não encontrada.")
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar encomenda pelo ID: ${error.message}`);
    }
};

const createOrders = async (user_id, branch_id, user_address_id, payment_method) => {
    try {
        const result = await pool.query(
            "INSERT INTO orders (user_id, branch_id, user_address_id, payment_method) VALUES ($1, $2, $3, $4) RETURNING *",
            [user_id, branch_id, user_address_id, payment_method]
        );
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`Erro ao criar encomenda: ${error.message}`);
    }
};

const updateOrders = async (id, user_id, branch_id, user_address_id, payment_method, payment_status, status, total_value, observations) => {
    try {
        const currentOrder = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (!currentOrder.rows[0]) {
            throw new Error("Encomenda não encontrada para atualização.");
        }

        const result = await pool.query(
            "UPDATE orders set user_id = COALESCE($1, user_id), branch_id = COALESCE($2, branch_id), user_address_id = COALESCE($3, user_address_id), payment_method = COALESCE($4, payment_method), payment_status = COALESCE($5, payment_status), status = COALESCE($6, status), total_value = COALESCE($7, total_value), observations = COALESCE($8, observations) WHERE id = $9 RETURNING *",
            [user_id || null, branch_id || null, user_address_id || null, payment_method || null, payment_status || null, status || null, total_value || null, observations || null, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar encomenda: ${error.message}`);
    }
};

const deleteOrders = async (id) => {
    try {
        const result = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [id]);
        return result.rows[0] || null;
    } catch (error) {
        console.error(error);
        throw new Error(`Erro ao deletar encomenda: ${error.message}`);
    }
};

const getOrderWithItems = async (user_id) => {
    const orderResult = await pool.query(
        `SELECT c.*, u.name AS user_name 
         FROM orders c
         JOIN users u ON u.id = c.user_id
         WHERE c.user_id = $1 
         LIMIT 1`,
        [user_id]
    );

    if (orderResult.rowCount === 0) {
        return { order: null, items: [], total_price: 0 };
    }

    const order = orderResult.rows[0];

    const itemsResult = await pool.query(
        `SELECT ci.*, p.name AS product_name, p.price AS product_price 
         FROM order_items ci
         JOIN products p ON p.id = ci.product_id
         WHERE ci.order_id = $1`,
        [order.id]
    );

    const items = itemsResult.rows.map(item => ({
        ...item,
        total_item_price: item.product_price * item.quantity
    }));

    const totalPrice = items.reduce((sum, item) => sum + item.total_item_price, 0);

    return {
        order: { ...order, user_name: order.user_name },
        items,
        total_price: totalPrice
    };
};

module.exports = { getOrders, getOrdersById, createOrders, updateOrders, deleteOrders, getOrderWithItems };