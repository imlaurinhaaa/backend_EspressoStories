const orderItemsModel = require("../models/order_itemsModel");

const getOrderItems = async (req, res) => {
    try {
        const { product_id } = req.query;
        const orderItems = await orderItemsModel.getOrderItems(product_id);
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
        if(orderItem.length === 0) {
            return res.status(404).json({ message: "Encomenda não possui itens."});
        }
        res.status(200).json({ message: "Item da encomenda encontrado com sucesso.", orderItem});
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Erro ao procurar item da encomenda."});
    }
};

const createOrderItem = async (req, res) => {
    try {
        const { order_id, featured_product_id, product_id, quantity } = req.body;

        if (!order_id || !quantity) {
            return res.status(400).json({ message: "os campos order_id e quantity são obrigatórios." });
        }

        if (!featured_product_id && !product_id) {
            return res.status(400).json({ message: "É necessário fornecer featured_product_id ou product_id." });
        }

        const newOrderItem = await orderItemsModel.createOrderItem(order_id, featured_product_id, product_id, quantity);
        return res.status(201).json({ message: "Item da encomenda criado com sucesso.", newOrderItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao criar item da encomenda." });
    }
};

const updateOrderItem = async (req, res) => {
    try {
        const { order_id, featured_product_id, product_id, quantity } = req.body;

        const updatedOrderItem = await orderItemsModel.updateOrderItem(req.params.id, order_id, featured_product_id, product_id, quantity);

        if (!updatedOrderItem) {
            return res.status(404).json({ message: "Item da encomenda não encontrado." });
        }
        res.status(200).json({ message: "Item da encomenda atualizado com sucesso.", updatedOrderItem });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao atualizar item da encomenda." });
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