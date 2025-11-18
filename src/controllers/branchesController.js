const branchesModels = require("../models/branchesModel");

// Rota para buscar filiais pelo nome
const getBranches = async (req, res) => {
    try {
        const { name } = req.query;
        const branches = await branchesModels.getBranches(name);
        res.status(200).json({ message: "Filiais encontradas com sucesso.", branches });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar filiais: ${error.message}` });
    }
};

// Rota para buscar uma filial pelo ID
const getBranchById = async (req, res) => {
    try {
        const branch = await branchesModels.getBranchById(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: "Filial não encontrada." });
        }
        res.status(200).json({ message: "Filial encontrada com sucesso.", branch });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar filial: ${error.message}` });
    }
};

// Rota para criar uma nova filial
const createBranch = async (req, res) => {
    try {
        const { name, cep, street, number, neighborhood, city, state, complement, reference_point } = req.body;

        // Valida os campos obrigatórios
        if (!name || !cep || !street || !number || !neighborhood || !city || !state || !complement || !reference_point) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const newBranch = await branchesModels.createBranch(name, cep, street, number, neighborhood, city, state, complement, reference_point);

        return res.status(201).json({ message: "Filial criada com sucesso.", newBranch });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Erro ao criar filial: ${error.message}` });
    }
};

// Rota para atualizar os dados de uma filial
const updateBranch = async (req, res) => {
    try {
        const { name, cep, street, number, neighborhood, city, state, complement, reference_point } = req.body;
        const updatedBranch = await branchesModels.updateBranch(req.params.id, name, cep, street, number, neighborhood, city, state, complement, reference_point);

        if (!updatedBranch) {
            return res.status(404).json({ message: "Filial não encontrada para atualização." });
        }
        res.status(200).json({ message: "Filial atualizada com sucesso.", updatedBranch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar filial: ${error.message}` });
    }
};

// Rota para deletar uma filial
const deleteBranch = async (req, res) => {
    try {
        const deletedBranch = await branchesModels.deleteBranch(req.params.id);
        if (!deletedBranch) {
            return res.status(404).json({ message: "Filial não encontrada para exclusão." });
        }
        res.status(200).json({ message: "Filial deletada com sucesso.", details: deletedBranch });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar filial: ${error.message}` });
    }
};

module.exports = {
    getBranches,
    getBranchById,
    createBranch,
    updateBranch,
    deleteBranch,
};


