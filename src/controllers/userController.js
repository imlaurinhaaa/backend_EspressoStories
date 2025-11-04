const userModel = require("../models/userModel");

// Rota para buscar usuários pelo nome ou username
const getUsers = async (req, res) => {
    try {
        const { name } = req.query;
        const users = await userModel.getUsers(name);
        res.status(200).json({ message: "Users retrieved successfully.", users });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error retrieving users." });
    }
};

// Rota para buscar um usuário pelo ID
const getUserById = async (req, res) => {
    try {
        const user = await userModel.getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User retrieved successfully.", user });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Error retrieving user." });
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

        // Validação de phone: apenas dígitos (sem espaços/formatos).
        if (phone && !/^\d+$/.test(phone)) {
            return res.status(400).json({ message: "'phone' deve conter apenas números." });
        }

            const photo = req.file ? req.file.filename : null; // Obtém o nome do arquivo da foto, se fornecido
            const newUser = await userModel.createUser(name, email, phone, password_hash, photo);

            return res.status(201).json({ message: "User created successfully.", newUser });
        } catch (error) {
            console.log(error);

            if (error.code === "23505" && error.constraint === "users_email_key") {
                return res.status(400).json({ message: "Email already registered." });
            }

            return res.status(500).json({ message: "Error creating user." });
        }
};

// Rota para atualizar os dados de um usuário
const updateUser = async (req, res) => {
    try {
        const { name, email, phone, password_hash } = req.body;
        const photo = req.file ? req.file.filename : null; // Obtém o nome do arquivo da foto, se fornecido
        const updatedUser = await userModel.updateUser(req.params.id, name, email, phone, password_hash, photo);

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        res.status(200).json({ message: "User updated successfully.", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating user." });
    }
};

// Rota para deletar um usuário
const deleteUser = async (req, res) => {
    try {
        const message = await userModel.deleteUser(req.params.id);
        res.status(200).json({ message: "User deleted successfully.", details: message });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete user." });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};