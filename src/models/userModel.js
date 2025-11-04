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

    // Executa a consulta no banco de dados
    const result = await pool.query(query, params);
    return result.rows;
};

// Função para buscar um usuário pelo ID
const getUserById = async (id) => {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    return result.rows[0];
};

// Função para criar um novo usuário
const createUser = async (name, email, phone, password_hash, photo) => {
    const result = await pool.query(
        "INSERT INTO users (name, email, phone, password_hash, photo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [name, email, phone, password_hash, photo]
    );
    return result.rows[0];
};

// Função para atualizar os dados de um usuário
const updateUser = async (id, name, email, phone, password_hash, photo) => {
    // Verifica se o usuário existe
    const currentUser = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    if (!currentUser.rows[0]) {
        throw new Error("User not found");
    }

    // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
    const updatedName = name || currentUser.rows[0].name;
    const updatedEmail = email || currentUser.rows[0].email;
    const updatedPhone = phone || currentUser.rows[0].phone;
    const updatedPasswordHash = password_hash || currentUser.rows[0].password_hash;
    const updatedPhoto = photo || currentUser.rows[0].photo;

    // Executa a atualização no banco de dados
    const result = await pool.query(
        "UPDATE users SET name = $1, email = $2, phone = $3, password_hash = $4, photo = $5 WHERE id = $6 RETURNING *",
        [updatedName, updatedEmail, updatedPhone, updatedPasswordHash, updatedPhoto, id]
    );
    return result.rows[0];
};

// Função para deletar um usuário
const deleteUser = async (id) => {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};