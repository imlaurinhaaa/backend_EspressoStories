const pool = require("../config/database");

const getAdmin = async (name) => {
    let query = "SELECT admin.* FROM admin";
    let conditions = [];
    let params = [];

    // Adiciona condições de busca se o nome for fornecido
    if (name && name.trim()) {
        params.push(`%${name.trim()}%`);
        conditions.push(`admin.name ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    try {
        // Executa a consulta no banco de dados
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar administradores: ${error.message}`);
    }
};

// Função para buscar um administrador pelo ID
const getAdminById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM admin WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Administrador não encontrado.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar administrador pelo ID: ${error.message}`);
    }
};

// Função para criar um novo administrador
const createAdmin = async (name, email, password_hash, photo) => {
    try {
        const result = await pool.query(
            "INSERT INTO admin (name, email, password_hash, photo) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, email, password_hash, photo]
        );
        return result.rows[0];
    } catch (error) {
        if (error.code === "23505" && error.constraint === "admin_email_key") {
            throw new Error("Erro: O email fornecido já está registrado.");
        }
        throw new Error(`Erro ao criar administrador: ${error.message}`);
    }
};


// Função para atualizar os dados de um administrador
const updateAdmin = async (id, name, email, password_hash, photo) => {
    try {
        // Verifica se o administrador existe
        const currentAdmin = await pool.query("SELECT * FROM admin WHERE id = $1", [id]);
        if (!currentAdmin.rows[0]) {
            throw new Error("Administrador não encontrado para atualização.");
        }

        // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
        const updatedName = name?.trim() ? name : currentAdmin.rows[0].name;
        const updatedEmail = email?.trim() ? email : currentAdmin.rows[0].email;
        const updatedPasswordHash = password_hash?.trim() ? password_hash : currentAdmin.rows[0].password_hash;
        const updatedPhoto = photo?.trim() ? photo : currentAdmin.rows[0].photo;

        // Executa a atualização no banco de dados
        const result = await pool.query(
            "UPDATE admin SET name = $1, email = $2, password_hash = $3, photo = $4 WHERE id = $5 RETURNING *",
            [updatedName, updatedEmail, updatedPasswordHash, updatedPhoto, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar administrador: ${error.message}`);
    }
};

// Função para deletar um administrador
const deleteAdmin = async (id) => {
    try {
        const deletedAdmin = await pool.query("DELETE FROM admin WHERE id = $1 RETURNING *", [id]);
        if (!deletedAdmin.rows[0]) {
            throw new Error("Administrador não encontrado para exclusão.");
        }
        return deletedAdmin.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar administrador: ${error.message}`);
    }
};

module.exports = {
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
};