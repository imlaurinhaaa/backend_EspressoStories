const adminModel = require("../models/adminModel");

// Rota para buscar administradores pelo nome
const getAdmin = async (req, res) => {
    try {
        const { name } = req.query;
        const admins = await adminModel.getAdmin(name);
        res.status(200).json({ message: "Administradores encontrados com sucesso.", admins });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar administradores: ${error.message}` });
    }
};

// Rota para buscar um administrador pelo ID
const getAdminById = async (req, res) => {
    try {
        const admin = await adminModel.getAdminById(req.params.id);
        if (!admin) {
            return res.status(404).json({ message: "Administrador não encontrado." });
        }
        res.status(200).json({ message: "Administrador encontrado com sucesso.", admin });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar administrador: ${error.message}` });
    }
};

// Rota para criar um novo administrador
const createAdmin = async (req, res) => {
    try {
        const { name, email, password_hash } = req.body;

        // Valida os campos obrigatórios
        if (!name || !email || !password_hash) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios." });
        }

        const photo = req.file ? req.file.filename : null; // Obtém o nome do arquivo da foto, se fornecido
        const newAdmin = await adminModel.createAdmin(name, email, password_hash, photo);

        return res.status(201).json({ message: "Administrador criado com sucesso.", newAdmin });
    } catch (error) {
        console.error(error);

        if (error.message.includes("O email fornecido já está registrado")) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: `Erro ao criar administrador: ${error.message}` });
    }
};

// Rota para atualizar os dados de um administrador
const updateAdmin = async (req, res) => {
    try {
        const { name, email, password_hash } = req.body;
        const photo = req.file ? req.file.filename : null; // Obtém o nome do arquivo da foto, se fornecido
        const updatedAdmin = await adminModel.updateAdmin(req.params.id, name, email, password_hash, photo);
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Administrador não encontrado para atualização." });
        }
        res.status(200).json({ message: "Administrador atualizado com sucesso.", updatedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar administrador: ${error.message}` });
    }
};

// Rota para deletar um administrador
const deleteAdmin = async (req, res) => {
    try {
        const deletedAdmin = await adminModel.deleteAdmin(req.params.id);
        if (!deletedAdmin) {
            return res.status(404).json({ message: "Administrador não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Administrador deletado com sucesso.", details: deletedAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar administrador: ${error.message}` });
    }
};

module.exports = {
    getAdmin,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
};