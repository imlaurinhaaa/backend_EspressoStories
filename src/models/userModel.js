const pool = require("../config/database");

// Função para buscar usuários pelo nome 
const getUsers = async (name) => {
    let query = "SELECT users.* FROM users";
    let conditions = [];
    let params = [];

    // Adiciona condições de busca se o nome for fornecido
    if (name && name.trim()) {

        params.push(`%${name.trim()}%`);

        conditions.push(`users.name ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    try {
        // Executa a consulta no banco de dados
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar usuários: ${error.message}`);
    }
};

// Função para buscar um usuário pelo ID
const getUserById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Usuário não encontrado.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar usuário pelo ID: ${error.message}`);
    }
};

// Função para criar um novo usuário
const createUser = async (name, email, phone, password_hash, photo) => {
    try {
        const result = await pool.query(
            "INSERT INTO users (name, email, phone, password_hash, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [name, email, phone, password_hash, photo]
        );
        return result.rows[0];
    } catch (error) {
        if (error.code === "23505" && error.constraint === "users_email_key") {
            throw new Error("Erro: O email fornecido já está registrado.");
        }
        throw new Error(`Erro ao criar usuário: ${error.message}`);
    }
};

// Função para atualizar os dados de um usuário
const updateUser = async (id, name, email, phone, password_hash, photo) => {
    try {
        // Verifica se o usuário existe
        const currentUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (!currentUser.rows[0]) {
            throw new Error("Usuário não encontrado para atualização.");
        }

        // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
        const updatedName = name?.trim() ? name : currentUser.rows[0].name;
        const updatedEmail = email?.trim() ? email : currentUser.rows[0].email;
        const updatedPhone = phone?.trim() ? phone : currentUser.rows[0].phone;
        const updatedPasswordHash = password_hash?.trim() ? password_hash : currentUser.rows[0].password_hash;
        const updatedPhoto = photo?.trim() ? photo : currentUser.rows[0].photo;

        // Executa a atualização no banco de dados
        const result = await pool.query(
            "UPDATE users SET name = $1, email = $2, phone = $3, password_hash = $4, photo = $5 WHERE id = $6 RETURNING *",
            [updatedName, updatedEmail, updatedPhone, updatedPasswordHash, updatedPhoto, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
};

// Função para deletar um usuário
const deleteUser = async (id) => {
    try {
        const deletedUser = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        if (!deletedUser.rows[0]) {
            throw new Error("Usuário não encontrado para exclusão.");
        }
        return deletedUser.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar usuário: ${error.message}`);
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};