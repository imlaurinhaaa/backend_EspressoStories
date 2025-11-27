const cartsModel = require("../models/cartsModel");

const getCarts = async (req, res) => {
    try {
        const carts = await cartsModel.getCarts();
        res.json(carts);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar carrinhos."});
    }
};

const getCartById = async (req, res) => {
    try {
        const cart = await cartsModel.getCartById(req.params.id);
        if (!cart) {
            res.status(404).json({ message: "Carrinho não encontrado."});
        }
        res.status(200).json({ message: "Carrinho encontrado com sucesso.", cart});
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Erro ao procurar carrinho."});
    }
};

const createCart = async (req, res) => {
    try {
        const { user_id, branch_id } = req.body;

        if (!user_id || !branch_id) {
            return res.status(400).json({ message: "Os campos de usuário e filial são obrigatórios."});
        }
        const newCart = await cartsModel.createCart(user_id, branch_id);
        return res.status(201).json({ message: "Carrinho criado com sucesso.", newCart});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar carrinho."})
    }
};

const updateCart = async (req, res) => {
    try {
        const { user_id, branch_id } = req.body;
        const updatedCart = await cartsModel.updateCart(req.params.id, user_id, branch_id);

        if (!updatedCart) {
            return res.status(404).json({ message: "Carrinho não encontrado."});
        }
        res.status(200).json({ message: "Carrinho atualizado com sucesso.", updatedCart});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao atualizar carrinho."});
    }
};

const deleteCart = async (req, res) => {
    try {
        const message = await cartsModel.deleteCart(req.params.id);
        res.status(200).json({ message: "Carrinho deletado com sucesso.", details: message });
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar carrinho."});
    }
};

const getCartWithItems = async (req, res) => {
    try {
    
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "O parâmetro userId é obrigatório." });
        }

        const cartWithItems = await cartsModel.getCartWithItems(userId);
        return res.status(200).json(cartWithItems);
    } catch (error) {
        console.error("Erro ao buscar carrinho:", error);
        return res.status(500).json({ message: "Erro ao buscar carrinho.", error: error.message });
    }
};

const clearCart = async (req, res) => {
    const { cart_id } = req.params;

    try {
        await cartsModel.clearCart(cart_id);

        return res.status(200).json({
            message: "Todos os itens foram removidos do carrinho."
        });
    } catch (error) {
        console.error("Erro ao limpar carrinho:", error);
        return res.status(500).json({ error: "Erro ao excluir itens do carrinho." });
    }
};

const increaseQty = async (req, res) => {
    try {
        const { item_id } = req.body; 
        await cartsModel.increaseQty(item_id);
        return res.json({ message: "Quantidade aumentada" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};

const decreaseQty = async (req, res) => {
    try {
        const { item_id } = req.body; 
        await cartsModel.decreaseQty(item_id);
        return res.json({ message: "Quantidade diminuída" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};


module.exports = { 
    getCarts, 
    getCartById, 
    createCart, 
    updateCart, 
    deleteCart, 
    getCartWithItems,
    clearCart,
    increaseQty,
    decreaseQty
};