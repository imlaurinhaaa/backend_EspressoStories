const pool = require("../config/database");

const getOrders = async (user_id) => {
    let query = "SELECT orders.* FROM orders";
    let conditions = [];
    let params = [];

    if (user_id && user_id.trim()) {
        params.push(`%${user_id.trim()}%`);
        conditions.push(`orders.user_id ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
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

const createOrders = async (user_id, branch_id, user_addresses, request_date, payment_method, payment_status, status, total_value, observations) => {
    try {
        const result = await pool.query(
            "INSERT INTO orders (user_id, branch_id, user_addresses, request_date, payment_method, payment_status, status, total_value, observations) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [user_id, branch_id, user_addresses, request_date, payment_method, payment_status, status, total_value, observations]
        );
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`Erro ao criar encomenda: ${error.message}`);
    }
};

const updateOrders = async (id, user_id, branch_id, user_addresses, request_date, payment_method, payment_status, status, total_value, observations) => {
    try {
        const currentOrder = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (!currentOrder.rows[0]) {
            throw new Error("Encomenda não encontrada para atualização.");
        }

        const updatedUserId = (user_id !== undefined) ? user_id : currentOrder.rows[0].user_id
        const updatedBranchId = (branch_id !== undefined) ? branch_id : currentOrder.rows[0].branch_id
        const updatedUserAddresses = (user_addresses !== undefined) ? user_addresses : currentOrder.rows[0].user_addresses
        const updatedRequestDate = (request_date !== undefined) ? request_date : currentOrder.rows[0].request_date
        const updatedPaymentMethod = (payment_method !== undefined) ? payment_method : currentOrder.rows[0].payment_method
        const updatedPaymentStatus = (payment_status !== undefined) ? payment_status : currentOrder.rows[0].payment_status
        const updatedStatus = (status !== undefined) ? status : currentOrder.rows[0].status
        const updatedTotalValue = (total_value !== undefined) ? total_value : currentOrder.rows[0].total_value
        const updatedObservations = (observations !== undefined) ? observations : currentOrder.rows[0].observations

        const result = await pool.query(
            "UPDATE orders set user_id = $1, branch_id = $2, user_addresses = $3, request_date = $4, payment_method = $5, payment_status = $6, status = $7, total_value = $8, observations = $9 WHERE id = $10 RETURNING *",
            [updatedUserId, updatedBranchId,updatedUserAddresses, updatedRequestDate, updatedPaymentMethod, updatedPaymentStatus, updatedStatus, updatedTotalValue, updatedObservations, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar encomenda: ${error.message}`);
    }
};

const deleteOrders = async (req, res) => {
    try {
        const deleteOrders = await pool.query("DELETE FROM orders WHERE id = $1 RETURNING *", [req.params.id]);
        if (!deleteOrders.rows[0]) {
            return res.status(404).json({ message: "Encomenda não encontrada para exclusão."});
        }
        res.status(200).json({ message: "Encomenda deletada com sucesso.", details: deleteOrders.rows[0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar encomenda: ${error.message}`});
    }
};

module.exports = { getOrders, getOrdersById, createOrders, updateOrders, deleteOrders };