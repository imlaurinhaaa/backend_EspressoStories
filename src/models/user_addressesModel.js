const pool = require("../config/database");

const getUsersAddresses = async (city) => {
    let query = "SELECT user_addresses.* FROM user_addresses";
    let conditions = [];
    let params = [];

    // Adiciona condições de busca se a cidade for fornecida
    if (city && city.trim()) {
       
        params.push(`%${city.trim()}%`);

        conditions.push(`user_addresses.city ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    // Executa a consulta no banco de dados
    const result = await pool.query(query, params);
    return result.rows;
};


// Função para buscar um endereço de usuário pelo ID
const getUserAddressById = async (id) => {
    const result = await pool.query("SELECT * FROM user_addresses WHERE id = $1", [id]);
    return result.rows[0];
};

// Função para criar um novo endereço de usuário
const createUserAddress = async (user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default) => {
    const result = await pool.query(
        "INSERT INTO user_addresses (user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
        [user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default]
    );
    return result.rows[0];
};


// Função para atualizar os dados de um usuário
const updateUserAddress = async (user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default) => {
    // Verifica se o usuário existe
    const currentUser = await pool.query("SELECT * FROM user_addresses WHERE user_id = $1", [user_id]);
    if (!currentUser.rows[0]) {
        throw new Error("User not found");
    }

    // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
    const updatedCep = cep || currentUser.rows[0].cep;
    const updatedStreet = street || currentUser.rows[0].street;
    const updatedNumber = number || currentUser.rows[0].number;
    const updatedNeighborhood = neighborhood || currentUser.rows[0].neighborhood;
    const updatedCity = city || currentUser.rows[0].city;
    const updatedState = state || currentUser.rows[0].state;
    const updatedComplement = complement || currentUser.rows[0].complement;
    const updatedReferencePoint = reference_point || currentUser.rows[0].reference_point;
    const updatedIsDefault = is_default !== undefined ? is_default : currentUser.rows[0].is_default;

    // Executa a atualização no banco de dados
    const result = await pool.query(
        "UPDATE user_addresses SET cep = $1, street = $2, number = $3, neighborhood = $4, city = $5, state = $6, complement = $7, reference_point = $8, is_default = $9 WHERE user_id = $10 RETURNING *",
        [updatedCep, updatedStreet, updatedNumber, updatedNeighborhood, updatedCity, updatedState, updatedComplement, updatedReferencePoint, updatedIsDefault, user_id]
    );
    return result.rows[0];
};
