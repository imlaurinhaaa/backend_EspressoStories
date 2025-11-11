const pool = require("../config/database");

// Função para buscar produtos pelo nome 
const getProducts = async (name) => {
    let query = "SELECT products.* FROM products";
    let conditions = [];
    let params = [];

    // Adiciona condições de busca se o nome for fornecido
    if (name && name.trim()) {

        params.push(`%${name.trim()}%`);

        conditions.push(`products.name ILIKE $${params.length}`);
    }

    if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
    }

    try {
        // Executa a consulta no banco de dados
        const result = await pool.query(query, params);
        return result.rows;
    } catch (error) {
        throw new Error(`Erro ao buscar produtos: ${error.message}`);
    }
};

// Função para buscar um produto pelo ID
const getProductById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Produto não encontrado.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar produto pelo ID: ${error.message}`);
    }
};

// Função para criar um novo produto
const createProduct = async (category_id, name, photo, description, price, inspiration, photo_inspiration) => {
    try {
        const result = await pool.query(
            `INSERT INTO products 
            (category_id, name, photo, description, price, inspiration, photo_inspiration)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *`,
            [category_id, name, photo, description, price, inspiration, photo_inspiration]
        );

        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao criar produto: ${error.message}`);
    }
};

// Função para atualizar os dados de um produto
const updateProduct = async (id, category_id, name, photo, description, price, inspiration, photo_inspiration) => {
    try {
        // Verifica se o produto existe
        const currentProduct = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        if (!currentProduct.rows[0]) {
            throw new Error("Produto não encontrado para atualização.");
        }

        // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
        const updatedCategoryId = category_id?.trim() ? category_id : currentProduct.rows[0].category_id;
        const updatedName = name?.trim() ? name : currentProduct.rows[0].name;
        const updatedPhoto = photo?.trim() ? photo : currentProduct.rows[0].photo;
        const updatedDescription = description?.trim() ? description : currentProduct.rows[0].description;
        const updatedPrice = price?.trim() ? price : currentProduct.rows[0].price;
        const updatedInspiration = inspiration?.trim() ? inspiration : currentProduct.rows[0].inspiration;
        const updatedPhotoInspiration = photo_inspiration?.trim() ? photo_inspiration : currentProduct.rows[0].photo_inspiration;

        // Executa a atualização no banco de dados
        const result = await pool.query(
            "UPDATE products SET category_id = $1, name = $2, photo = $3, description = $4, price = $5, inspiration = $6, photo_inspiration = $7 WHERE id = $8 RETURNING *",
            [updatedCategoryId, updatedName, updatedPhoto, updatedDescription, updatedPrice, updatedInspiration, updatedPhotoInspiration, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar produto: ${error.message}`);
    }
};

// Função para deletar um produto
const deleteProduct = async (id) => {
    try {
        const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
        if (result.rows.length === 0) {
            throw new Error("Produto não encontrado para exclusão.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar produto: ${error.message}`);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
