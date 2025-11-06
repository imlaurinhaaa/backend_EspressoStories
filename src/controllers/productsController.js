const productsModel = require("../models/productsModel");

// Rota para buscar produtos pelo nome
const getProducts = async (req, res) => {
    try {
        const { name } = req.query;
        const products = await productsModel.getProducts(name);
        res.status(200).json({ message: "Produtos encontrados com sucesso.", products });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar produtos: ${error.message}` });
    }
};

// Rota para buscar um produto pelo ID
const getProductById = async (req, res) => {
    try {
        const product = await productsModel.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: "Produto não encontrado." });
        }
        res.status(200).json({ message: "Produto encontrado com sucesso.", product });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar produto: ${error.message}` });
    }
};

// Rota para criar um novo produto
const createProduct = async (req, res) => {
    try {
        const { category_id, name, photo, description, price, inspiration, photo_inspiration } = req.body;

        // Valida os campos obrigatórios
        if (!name || !category_id || !photo || !description || !price ) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const newProduct = await productsModel.createProduct(category_id, name, photo, description, price, inspiration, photo_inspiration);

        return res.status(201).json({ message: "Produto criado com sucesso.", newProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Erro ao criar produto: ${error.message}` });
    }
};

// Rota para atualizar os dados de um produto
const updateProduct = async (req, res) => {
    try {
        const { category_id, name, photo, description, price, inspiration, photo_inspiration } = req.body;
        const updatedProduct = await productsModel.updateProduct(req.params.id, category_id, name, photo, description, price, inspiration, photo_inspiration);

        if (!updatedProduct) {
            return res.status(404).json({ message: "Produto não encontrado para atualização." });
        }
        res.status(200).json({ message: "Produto atualizado com sucesso.", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar produto: ${error.message}` });
    }
};

// Rota para deletar um produto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await productsModel.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Produto não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Produto deletado com sucesso.", details: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar produto: ${error.message}` });
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};