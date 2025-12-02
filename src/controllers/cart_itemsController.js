const cartItemsModel = require("../models/cart_itemsModel");

const getCartItems = async (req, res) => {
    try {
        const { product_id } = req.query;
        const cartItems = await cartItemsModel.getCartItems(product_id);
        res.json(cartItems);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar itens do carrinho."});
    }
};

const getCartItemsById = async (req, res) => {
    try {
        const cartItem = await cartItemsModel.getCartItemsById(req.params.id);
        if (!cartItem) {
            res.status(404).json({ message: "Item do carrinho não encontrado."});
        }
        res.status(200).json({ message: "Item do carrinho encontrado com sucesso.", cartItem});
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Erro ao procurar item do carrinho."});
    }
};

const createCartItem = async (req, res) => {
    try {
        const { cart_id, product_id, featured_product_id, quantity = 1, observations = null } = req.body;

        if (!cart_id || (!product_id && !featured_product_id) || !quantity) {
            return res.status(400).json({ 
                message: "Os campos cart_id e pelo menos um entre product_id ou featured_product_id são obrigatórios." 
            });
        }

        const newCartItem = await cartItemsModel.createCartItem(cart_id, product_id, featured_product_id, quantity, observations);
        return res.status(201).json({ message: "Item do carrinho criado com sucesso.", newCartItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar item do carrinho." });
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { cart_id, product_id, featured_product_id, quantity, observations } = req.body;

        const updatedCartItem = await cartItemsModel.updateCartItem(id, {
            cart_id,
            product_id,
            featured_product_id,
            quantity,
            observations
        });

        if (!updatedCartItem) {
            return res.status(404).json({ message: "Item do carrinho não encontrado." });
        }

        res.status(200).json({ message: "Item do carrinho atualizado com sucesso.", updatedCartItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao atualizar item do carrinho." });
    }
};

const deleteCartItem = async (req, res) => {
    try {
        const message = await cartItemsModel.deleteCartItem(req.params.id);
        res.status(200).json({ message: "Item do carrinho deletado com sucesso.", details: message});
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar item do carrinho."});
    }
};

module.exports = {getCartItems, getCartItemsById, createCartItem, updateCartItem, deleteCartItem};