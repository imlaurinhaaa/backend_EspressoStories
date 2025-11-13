const pool = require("../config/database");

// Função para buscar produtos em destaque pelo nome 
const getFeaturedProducts = async (name, branchId, categoryId) => {
    let query = `SELECT fb.*, b.name AS branches_name, c.name AS categories_name
    FROM feature_products fb
    JOIN branches b ON fb.branch_id = b.id
    JOIN categories c ON fb.category_id = c.id`;
    let conditions = [];
    let params = [];

    // Adiciona condições de busca se o nome for fornecido
    if (name && name.trim()) {
        params.push(`%${name.trim()}%`);
        conditions.push(`fb.name ILIKE $${params.length}`);
    }

    // Adiciona condição de busca para branchId se fornecido
    if (branchId) {
        params.push(branchId);
        conditions.push(`fb.branch_id = $${params.length}`);
    }

    // Adiciona condição de busca para categoryId se fornecido
    if (categoryId) {
        params.push(categoryId);
        conditions.push(`fb.category_id = $${params.length}`);
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
const getFeaturedProductById = async (id) => {
    try {
        const result = await pool.query("SELECT * FROM feature_products WHERE id = $1", [id]);
        if (result.rows.length === 0) {
            throw new Error("Produto em destaque não encontrado.");
        }
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar produto em destaque pelo ID: ${error.message}`);
    }
};

// Função para criar um novo produto
const createFeaturedProduct = async (branch_id, category_id, name, photo, description, price, inspiration, photo_inspiration) => {
    try {
        const result = await pool.query(
            `INSERT INTO feature_products 
            (branch_id, category_id, name, photo, description, price, inspiration, photo_inspiration)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *`,
            [branch_id, category_id, name, photo, description, price, inspiration, photo_inspiration]
        );

        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao criar produto: ${error.message}`);
    }
};

// Função para atualizar os dados de um produto
const updateFeaturedProduct = async (id, branch_id, category_id, name, photo, description, price, inspiration, photo_inspiration) => {
    try {
        // Verifica se o produto existe
        const currentProduct = await pool.query("SELECT * FROM feature_products WHERE id = $1", [id]);
        if (!currentProduct.rows[0]) {
            throw new Error("Produto em destaque não encontrado para atualização.");
        }

        // Atualiza os campos com os valores fornecidos ou mantém os valores atuais
        const updatedBranchId = branch_id?.trim() ? branch_id : currentProduct.rows[0].branch_id;
        const updatedCategoryId = category_id?.trim() ? category_id : currentProduct.rows[0].category_id;
        const updatedName = name?.trim() ? name : currentProduct.rows[0].name;
        const updatedPhoto = photo?.trim() ? photo : currentProduct.rows[0].photo;
        const updatedDescription = description?.trim() ? description : currentProduct.rows[0].description;
        const updatedPrice = price?.trim() ? price : currentProduct.rows[0].price;
        const updatedInspiration = inspiration?.trim() ? inspiration : currentProduct.rows[0].inspiration;
        const updatedPhotoInspiration = photo_inspiration?.trim() ? photo_inspiration : currentProduct.rows[0].photo_inspiration;

        // Executa a atualização no banco de dados
        const result = await pool.query(
            "UPDATE feature_products SET branch_id = $1, category_id = $2, name = $3, photo = $4, description = $5, price = $6, inspiration = $7, photo_inspiration = $8 WHERE id = $9 RETURNING *",
            [updatedBranchId, updatedCategoryId, updatedName, updatedPhoto, updatedDescription, updatedPrice, updatedInspiration, updatedPhotoInspiration, id]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error(`Erro ao atualizar produto em destaque: ${error.message}`);
    }
};

// Função para deletar um produto
const deleteFeaturedProduct = async (id) => {
    try {
        const deletedProduct = await pool.query("DELETE FROM feature_products WHERE id = $1 RETURNING *", [id]);
        if (!deletedProduct.rows[0]) {
            throw new Error("Produto em destaque não encontrado para exclusão.");
        }
        return deletedProduct.rows[0];
    } catch (error) {
        throw new Error(`Erro ao deletar produto em destaque: ${error.message}`);
    }
};

module.exports = {
    getFeaturedProducts,
    getFeaturedProductById,
    createFeaturedProduct,
    updateFeaturedProduct,
    deleteFeaturedProduct
};