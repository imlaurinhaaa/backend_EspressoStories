const pool = require("../config/database");

// Função para buscar filiais pelo nome 
const getBranches = async (name) => {
    let query = "SELECT branches.* FROM branches";
    let conditions = [];
    let params = [];

    // Adiciona condições de busca se o nome for fornecido
    if (name && name.trim()) {

        params.push(`%${name.trim()}%`);

        conditions.push(`branches.name ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    try {
        // Executa a consulta no banco de dados
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar filiais: ${error.message}`);
    }
};

// Função para buscar uma filial pelo ID
const getBranchById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM branches WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Filial não encontrada.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar filial pelo ID: ${error.message}`);
    }
};

// Função para criar uma nova filial
const createBranch = async (name, cep, street, number, neighborhood, city, state, complement) => {
    try {
        const result = await pool.query(
            "INSERT INTO branches (name, cep, street, number, neighborhood, city, state, complement) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
            [name, cep, street, number, neighborhood, city, state, complement]
        );
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`Erro ao criar filial: ${error.message}`);
    }
};

// Função para atualizar os dados de uma filial
const updateBranch = async (id, name, cep, street, number, neighborhood, city, state, complement) => {
    try {
        // Verifica se a filial existe
        const currentBranch = await pool.query("SELECT * FROM branches WHERE id = $1", [id]);
        if (!currentBranch.rows[0]) {
            throw new Error("Filial não encontrada para atualização.");
        }

        // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
        const updatedName = name?.trim() ? name : currentBranch.rows[0].name;
        const updatedCep = cep?.trim() ? cep : currentBranch.rows[0].cep;
        const updatedStreet = street?.trim() ? street : currentBranch.rows[0].street;
        const updatedNumber = number?.trim() ? number : currentBranch.rows[0].number;
        const updatedNeighborhood = neighborhood?.trim() ? neighborhood : currentBranch.rows[0].neighborhood;
        const updatedCity = city?.trim() ? city : currentBranch.rows[0].city;
        const updatedState = state?.trim() ? state : currentBranch.rows[0].state;
        const updatedComplement = complement?.trim() ? complement : currentBranch.rows[0].complement;

        // Executa a atualização no banco de dados
        const result = await pool.query(
            "UPDATE branches SET name = $1, cep = $2, street = $3, number = $4, neighborhood = $5, city = $6, state = $7, complement = $8 WHERE id = $9 RETURNING *",
            [updatedName, updatedCep, updatedStreet, updatedNumber, updatedNeighborhood, updatedCity, updatedState, updatedComplement, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar filial: ${error.message}`);
    }
};

// Função para deletar uma filial
const deleteBranch = async (id) => {
    try {
        const result = await pool.query("DELETE FROM branches WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("Filial não encontrada para exclusão.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar filial: ${error.message}`);
    }
};

module.exports = {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch
};
