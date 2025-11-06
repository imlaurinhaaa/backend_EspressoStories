const pool = require("../config/database");

const getOrders = async (city) => {
    let query = "SELECT orders.* FROM orders";
    let conditions = [];
    let params = [];

    if (city && city.trim()) {
        params.push(`%${city.trim()}%`);
        conditions.push(`orders.city ILIKE $${params.length}`);
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

const createOrders = async (name, cep, street, number, neighborhood, city, state, complement, reference_point) => {
    try {
        const result = await pool.query(
            "INSERT INTO orders (name, cep, street, number, neighborhood, city, state, complement, reference_point) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [name, cep, street, number, neighborhood, city, state, complement, reference_point]
        );
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`Erro ao criar encomenda: ${error.message}`);
    }
};

const updateOrders = async (id, name, cep, street, number, neighborhood, city, state, complement, reference_point) => {
    try {
        const currentOrder = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
        if (!currentOrder.rows[0]) {
            throw new Error("Encomenda não encontrada para atualização.");
        }

        const updatedName = (name !== undefined) ? name : currentOrder.rows[0].name
        const updatedCep = (cep !== undefined) ? cep : currentOrder.rows[0].cep
        const updatedStreet = (street !== undefined) ? street : currentOrder.rows[0].street
        const updatedNumber = (number !== undefined) ? number : currentOrder.rows[0].number
        const updatedNeighborhood = (neighborhood !== undefined) ? neighborhood : currentOrder.rows[0].neighborhood
        const updatedCity = (city !== undefined) ? city : currentOrder.rows[0].city
        const updatedState = (state !== undefined) ? state : currentOrder.rows[0].state
        const updatedComplement = (complement !== undefined) ? complement : currentOrder.rows[0].complement
        const updatedReferencePoint = (reference_point !== undefined) ? reference_point : currentOrder.rows[0].reference_point

        const result = await pool.query(
            "UPDATE orders set name = $1, cep = $2, street = $3, number = $4, neighborhood = $5, city = $6, state = $7, complement = $8, reference_point = $9 WHERE id = $10 RETURNING *",
            [updatedName, updatedCep, updatedStreet, updatedNumber, updatedNeighborhood, updatedCity, updatedReferencePoint, updatedState, updatedComplement, id]
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