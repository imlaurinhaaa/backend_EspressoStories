const pool = require("../config/database");

// Função para buscar categorias pelo nome 
const getCategories = async (name) => {
    let query = "SELECT categories.* FROM categories";
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
        throw new Error(`Erro ao buscar categorias: ${error.message}`);
    }
};

// Função para buscar uma categoria pelo ID
const getCategoryById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Categoria não encontrada.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar categoria pelo ID: ${error.message}`);
    }
};

// Função para criar uma nova categoria
const createCategory = async (name, description) => {
    try {
        const result = await pool.query(
            "INSERT INTO categories (name, description) VALUES ($1, $2) RETURNING *",
            [name, description]
        );
        return result.rows[0];
    } catch (error) {
        console.error(error);
        throw new Error(`Erro ao criar categoria: ${error.message}`);
    }
};

// Função para atualizar os dados de um usuário
const updateCategory = async (id, name, description) => {
    try {
        // Verifica se a categoria existe
        const currentCategory = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
        if (!currentCategory.rows[0]) {
            throw new Error("Categoria não encontrada para atualização.");
        }

        // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
        const updatedName = (name !== undefined) ? name : currentCategory.rows[0].name;
        const updatedDescription = (description !== undefined) ? description : currentCategory.rows[0].description;
        
        // Executa a atualização no banco de dados
        const result = await pool.query(
            "UPDATE categories SET name = $1, description = $2 WHERE id = $3 RETURNING *",
            [updatedName, updatedDescription, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar categoria: ${error.message}`);
    }
};

// Função para deletar uma categoria
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await pool.query("DELETE FROM categories WHERE id = $1 RETURNING *", [req.params.id]);
        if (!deletedCategory.rows[0]) {
            return res.status(404).json({ message: "Categoria não encontrada para exclusão." });
        }
        res.status(200).json({ message: "Categoria deletada com sucesso.", details: deletedCategory.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar categoria: ${error.message}` });
    }
};

module.exports = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
