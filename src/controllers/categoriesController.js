const categoriesModel = require("../models/categoriesModel");

// Rota para buscar categorias pelo nome
const getCategories = async (req, res) => {
    try {
        const { name } = req.query;
        const categories = await categoriesModel.getCategories(name);
        res.status(200).json({ message: "Categorias encontradas com sucesso.", categories });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar categorias: ${error.message}` });
    }
};

// Rota para buscar uma categoria pelo ID
const getCategoryById = async (req, res) => {
    try {
        const category = await categoriesModel.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: "Categoria não encontrada." });
        }
        res.status(200).json({ message: "Categoria encontrada com sucesso.", category });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar categoria: ${error.message}` });
    }
};

// Rota para criar uma nova categoria
const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Valida os campos obrigatórios
        if (!name || !description) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const newCategory = await categoriesModel.createCategory(name, description);

        return res.status(201).json({ message: "Categoria criada com sucesso.", newCategory });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Erro ao criar categoria: ${error.message}` });
    }
};

// Rota para atualizar os dados de uma categoria
const updateCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedCategory = await categoriesModel.updateCategory(req.params.id, name, description);

        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoria não encontrada para atualização." });
        }
        res.status(200).json({ message: "Categoria atualizada com sucesso.", updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar categoria: ${error.message}` });
    }
};

// Rota para deletar uma categoria
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await categoriesModel.deleteCategory(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoria não encontrada para exclusão." });
        }
        res.status(200).json({ message: "Categoria deletada com sucesso.", details: deletedCategory });
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
