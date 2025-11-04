const pool = require("../config/database");

const getCarts = async () => {
    const result = await pool.query("SELECT * FROM carts");
    return result.rows;
};

const getCartById = async (id) => {
    const result = await pool.query("SELECT * FROM carts WHERE id = $1", [id]);
    return result.rows[0];
};

const createCart = async (user_id, branch_id) => {
    const result = await pool.query(
        "INSERT INTO carts (user_id, branch_id) VALUES ($1, $2) RETURNING *", 
        [user_id, branch_id]
    );
    return result.rows[0];
};

const updateCart = async (id, user_id, branch_id) => {
    const currentCart = await pool.query("SELECT * FROM carts WHERE id = $1", [id]);
    if (!currentCart.rows[0]) {
        throw new Error("Carrinho não encontrado.");
    }

    const updateUserId = user_id || currentCart.rows[0].user_id;
    const updateBranchId = branch_id || currentCart.rows[0].branch_id;

    const result = await pool.query(
        "UPDATE carts SET user_id = $1, branch_id = $2 WHERE id = $3 RETURNING *", 
        [updateUserId, updateBranchId, id]
    );
    return result.rows[0];
};

const deleteCart = async (id) => {
    const result = await pool.query("DELETE FROM carts WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {getCarts, getCartById, createCart, updateCart, deleteCart};