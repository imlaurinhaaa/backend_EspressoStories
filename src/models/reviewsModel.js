const pool = require("../config/database");

const getReviews = async (product_id) => {
    let query = "SELECT reviews.* FROM reviews";
    let conditions = [];
    let params = [];

    if (product_id && product_id.trim()) {

        params.push(product_id.trim());

        conditions.push(`reviews.product_id = $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    try {
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar avaliações: ${error.message}`);
    }
};

const getReviewsById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Avaliação não encontrada.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar avaliação pelo ID: ${error.message}`);
    }
};

const createReview = async (user_id, product_id, note, comments) => {
    try {
        const result = await pool.query(
            `INSERT INTO reviews (user_id, product_id, note, comments) VALUES ($1, $2, $3, $4) RETURNING *`,
            [user_id, product_id, note, comments]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao criar comentário: ${error.message}`);
    }
};

const updateReview = async (id, note, comments) => {
    try {
        const currentReview = await pool.query("SELECT * FROM reviews WHERE id = $1", [id]);
        if (!currentReview.rows[0]) {
            throw new Error("Avaliação não encontrada para atualização");
        }

        const updateNote = note?.trim() ? note : currentReview.rows[0].note;
        const updateComments = comments?.trim() ? comments: currentReview.rows[0].comments;

        const result = await pool.query(
            "UPDATE reviews SET note = $1, comments = $2 WHERE id = $3 RETURNING *", 
            [updateNote, updateComments, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar a avaliação: ${error.message}`);
    }
};

const deleteReview = async (id) => {
    try {
        const result = await pool.query("DELETE FROM reviews WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("Avaliação não encontrada para exclusão.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar avaliação: ${error.message}`);
    }
};

module.exports = {getReviews, getReviewsById, createReview, updateReview, deleteReview};