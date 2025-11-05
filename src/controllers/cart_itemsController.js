const cartItemsModel = require("../models/cart_itemsModel");

const getCartItems = async (req, res) => {
    try {
        const cartItems = await cartItemsModel.getCartItems();
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
        const { cart_id, product_id, featured_product_id, quantity, price, observations } = req.body;

        if (!cart_id || !product_id || !quantity || !price) {
            return res.status(400).json({ message: "Os campos do carrinho, produto, quantidade e preço são obrigatórios."});
        }

        const newCartItem = await cartItemsModel.createCartItem(cart_id, product_id, featured_product_id, quantity, price, observations);
        return res.status(201).json({ message: "Item do carrinho criado com sucesso.", newCartItem});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar item do carrinho."})
    }
};

const updateCartItem = async (req, res) => {
    try {
        const { cart_id, product_id, featured_product_id, quantity, price, observations } = req.body;
        const updateCartItem = await cartItemsModel.updateCartItem(req.params.id, cart_id, product_id, featured_product_id, quantity, price, observations);

        if (!updateCartItem) {
            return res.status(404).json({ message: "Item do carrinho não encontrado."});
        }
        res.status(200).json({ message: "Item do carrinho atualizado com sucesso.", updateCartItem});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao atualizar item do carrinho."});
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