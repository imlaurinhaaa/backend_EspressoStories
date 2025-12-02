const express = require("express");
const router = express.Router();
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");

router.post("/login", async (req, res) => {
    try {
        const { email, password_hash } = req.body;

        console.log("BODY RECEBIDO BACKEND:", req.body);

        if (!email || !password_hash) {
            return res.status(400).json({ message: "Email e senha são obrigatórios" });
        }

        // Buscar admin pelo email
        const result = await adminModel.getAdmin();
        const admin = result.find(a => a.email === email);

        if (!admin) {
            return res.status(404).json({ message: "Email não encontrado" });
        }

        // Como sua senha NÃO é hash, comparar texto puro
        if (admin.password_hash !== password_hash) {
            return res.status(401).json({ message: "Senha inválida" });
        }

        return res.status(200).json({
            message: "Login bem-sucedido",
            admin
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro interno no servidor", error: err.message });
    }
});

router.post("/login/users", async (req, res) => {
    try {
        const { name, email, password_hash } = req.body;

        console.log("BODY RECEBIDO BACKEND (USERS):", req.body);

        if (!name || !email || !password_hash) {
            return res.status(400).json({ message: "Nome, email e senha são obrigatórios" });
        }

        const result = await userModel.getUsers();
        const user = result.find(u => u.email === email);

        if (!user) {
            return res.status(404).json({ message: "Email não encontrado" });
        }

        if (user.password_hash !== password_hash) {
            return res.status(401).json({ message: "Senha inválida" });
        }

        // Retornar somente os campos que você quer expor
        return res.status(200).json({
            message: "Login bem-sucedido",
            user
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Erro interno no servidor", error: err.message });
    }
});

module.exports = router;
