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

    try {
        // Executa a consulta no banco de dados
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar endereços: ${error.message}`);
    }
};

// Função para buscar um endereço de usuário pelo ID
const getUserAddressById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM user_addresses WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Endereço não encontrado.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar endereço pelo ID: ${error.message}`);
    }
};

// Função para criar um novo endereço de usuário
const createUserAddress = async (user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        if (is_default) {
            await client.query(
                'UPDATE user_addresses SET is_default = false WHERE user_id = $1',
                [user_id]
            );
        }

        const result = await client.query(
            "INSERT INTO user_addresses (user_id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            [user_id, cep, street, number, neighborhood, city, state, complement, reference_point, Boolean(is_default)]
        );

        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Erro ao criar endereço: ${err.message}`);
    } finally {
        client.release();
    }
};

// Função para atualizar os dados de um endereço.
const updateUserAddress = async (id, cep, street, number, neighborhood, city, state, complement, reference_point, is_default) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // trava o registro para evitar condições de corrida e pega user_id
        const currentRes = await client.query('SELECT * FROM user_addresses WHERE id = $1 FOR UPDATE', [id]);
        const current = currentRes.rows[0];
        if (!current) {
            throw new Error('Endereço não encontrado para atualização.');
        }

        // decide valores atualizados (preserva falsy se explicitamente passado)
        const updatedCep = cep?.trim() ? cep : current.cep;
        const updatedStreet = street?.trim() ? street : current.street;
        const updatedNumber = number?.trim() ? number : current.number;
        const updatedNeighborhood = neighborhood?.trim() ? neighborhood : current.neighborhood;
        const updatedCity = city?.trim() ? city : current.city;
        const updatedState = state?.trim() ? state : current.state;
        const updatedComplement = complement?.trim() ? complement : current.complement;
        const updatedReferencePoint = reference_point?.trim() ? reference_point : current.reference_point;
        const updatedIsDefault = is_default !== undefined ? Boolean(is_default) : current.is_default;

        // Se o endereço for para virar default, desmarca outros endereços do mesmo usuário
        if (updatedIsDefault) {
            await client.query(
                'UPDATE user_addresses SET is_default = false WHERE user_id = $1 AND id != $2',
                [current.user_id, id]
            );
        }

        // atualiza este registro
        const result = await client.query(
            `UPDATE user_addresses
       SET cep = $1, street = $2, number = $3, neighborhood = $4, city = $5, state = $6,
           complement = $7, reference_point = $8, is_default = $9
       WHERE id = $10
       RETURNING *`,
            [updatedCep, updatedStreet, updatedNumber, updatedNeighborhood, updatedCity, updatedState, updatedComplement, updatedReferencePoint, updatedIsDefault, id]
        );

        await client.query('COMMIT');
        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        throw new Error(`Erro ao atualizar endereço: ${err.message}`);
    } finally {
        client.release();
    }
};

// Função para deletar um endereço de usuário
const deleteUserAddress = async (id) => {
    try {
        const result = await pool.query("DELETE FROM user_addresses WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("Endereço não encontrado para exclusão.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar endereço: ${error.message}`);
    }
};

module.exports = {
    getUsersAddresses,
    getUserAddressById,
    createUserAddress,
    updateUserAddress,
    deleteUserAddress,
};