const userModel = require("../models/userModel");

// Rota para buscar usuários pelo nome ou username
const getUsers = async (req, res) => {
    try {
        const { name } = req.query;
        const users = await userModel.getUsers(name);
        res.status(200).json({ message: "Usuários encontrados com sucesso.", users });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar usuários: ${error.message}` });
    }
};

// Rota para buscar um usuário pelo ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }
        res.status(200).json({ message: "Usuário encontrado com sucesso.", user });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar usuário: ${error.message}` });
    }
};

// Rota para criar um novo usuário
const createUser = async (req, res) => {
    try {
        const { name, email, phone, password_hash } = req.body;

        // Valida os campos obrigatórios
        if (!name || !email || !phone || !password_hash) {
            return res.status(400).json({ message: "Os campos 'name', 'email', 'phone' e 'password_hash' são obrigatórios." });
        }

        // Validação de phone: apenas dígitos (sem espaços).
        if (phone && !/^\d+$/.test(phone)) {
            return res.status(400).json({ message: "O campo 'phone' deve conter apenas números." });
        }

        const photo = req.file ? req.file.filename : null; // Obtém o nome do arquivo da foto, se fornecido
        const newUser = await userModel.createUser(name, email, phone, password_hash, photo);

        return res.status(201).json({ message: "Usuário criado com sucesso.", newUser });
    } catch (error) {
        console.error(error);

        if (error.message.includes("O email fornecido já está registrado")) {
            return res.status(400).json({ message: error.message });
        }

        return res.status(500).json({ message: `Erro ao criar usuário: ${error.message}` });
    }
};

// Rota para atualizar os dados de um usuário
const updateUser = async (req, res) => {
    try {
        const { name, email, phone, password_hash } = req.body;
        const photo = req.file ? req.file.filename : null; // Obtém o nome do arquivo da foto, se fornecido
        const updatedUser = await userModel.updateUser(req.params.id, name, email, phone, password_hash, photo);

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuário não encontrado para atualização." });
        }
        res.status(200).json({ message: "Usuário atualizado com sucesso.", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar usuário: ${error.message}` });
    }
};

// Rota para deletar um usuário
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await userModel.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "Usuário não encontrado para exclusão." });
        }
        res.status(200).json({ message: "Usuário deletado com sucesso.", details: deletedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar usuário: ${error.message}` });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};