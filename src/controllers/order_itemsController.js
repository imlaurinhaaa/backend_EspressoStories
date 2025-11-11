const orderItemsModel = require("../models/order_itemsModel");

const getOrderItems = async (req, res) => {
    try {
        const orderItems = await orderItemsModel.getOrderItems();
        res.json(orderItems);
    } catch (error) {
        res.status(404).json({ message: "Erro ao buscar item da encomenda."});
    }
};

const getOrderItemsById = async (req, res) => {
    try {
        const orderItem = await orderItemsModel.getOrderItemsById(req.params.id);
        if (!orderItem) {
            res.status(404).json({ message: "Item da encomenda não encontrado."});
        }
        res.status(200).json({ message: "Item da encomenda encontrado com sucesso.", orderItem});
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Erro ao procurar item da encomenda."});
    }
};

const createOrderItem = async (req, res) => {
    try {
        const { order_id, featuredproduct_branches, product_id, quantity, price } = req.body;

        if (!order_id || !featuredproduct_branches || !product_id || !quantity || !price) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios."});
        }

        const newOrderItem = await orderItemsModel.createOrderItem(order_id, featuredproduct_branches, product_id, quantity, price);
        return res.status(201).json({ message: "Item da encomenda criado com sucesso.", newOrderItem});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar item da encomenda."});
    }
};

const updateOrderItem = async (req, res) => {
    try {
        const { order_id, featuredproduct_branches, product_id, quantity, price } = req.body;
        const updateOrderItem = await orderItemsModel.updateOrderItem(req.params.id, order_id, featuredproduct_branches, product_id, quantity, price);

        if (!updateOrderItem) {
            return res.status(404).json({ message: "Item da encomenda não encontrado."});
        }
        res.status(200).json({ message: "Item da encomenda atualizado com sucesso.", updateOrderItem});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao atualizar item da encomenda."});
    }
};

const deleteOrderItem = async (req, res) => {
    try {
        const message = await orderItemsModel.deleteOrderItem(req.params.id);
        res.status(200).json({ message: "Item da encomenda deletado com sucesso.", details: message});
    } catch (error) {
        res.status(500).json({ message: "Erro ao deletar item da encomenda."});
    }
};

module.exports = {getOrderItems, getOrderItemsById, createOrderItem, updateOrderItem, deleteOrderItem};