const ordersModel = require("../models/ordersModel");

const getOrders = async (req, res) => {
    try {
        const { user_id } = req.query;
        const orders = await ordersModel.getOrders(user_id);
        res.status(200).json({ message: "Encomendas encontradas com sucesso.", orders });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: `Erro ao encontrar encomendas: ${error.message}` });
    }
};

const getOrdersById = async (req, res) => {
    try {
        const order = await ordersModel.getOrdersById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: "Encomenda não encontrada." });
        }
        res.status(200).json({ message: "Encomenda encontrada com sucesso.", order });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: `Erro ao encontrar encomenda: ${error.message}` });
    }
};

const createOrders = async (req, res) => {
    try {
        const { user_id, branch_id, user_address_id, payment_method} = req.body;

        if (!user_id || !branch_id || !user_address_id || !payment_method) {
            return res.status(400).json({ message: "Todos os campos obrigatórios devem ser preenchidos." });
        }

        const newOrder = await ordersModel.createOrders(user_id, branch_id, user_address_id, payment_method);

        return res.status(201).json({ message: "Encomenda criada com sucesso.", newOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: `Erro ao criar encomenda: ${error.message}` });
    }
};

const updateOrder = async (req, res) => {
    try {
        const { user_id, branch_id, user_address_id, payment_method, payment_status, status, total_value, observations } = req.body;

        const updatedOrder = await ordersModel.updateOrders(req.params.id, user_id, branch_id, user_address_id, payment_method, payment_status, status, total_value, observations);

        if (!updatedOrder) {
            return res.status(404).json({ message: "Encomenda não encontrada para atualização." });
        }
        res.status(200).json({ message: "Encomenda atualizada com sucesso.", updatedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao atualizar encomenda: ${error.message}` });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await ordersModel.deleteOrders(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Encomenda não encontrada para exclusão." });
        }
        res.status(200).json({ message: "Encomenda deletada com sucesso.", details: deletedOrder });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Erro ao deletar encomenda: ${error.message}` });
    }
};

const getOrderWithItems = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "O parâmetro userId é obrigatório." });
        }

        const orderWithItems = await ordersModel.getOrderWithItems(userId);

        if (!orderWithItems.order) {
            return res.status(404).json({ message: "Pedido não encontrado." });
        }

        return res.status(200).json(orderWithItems);
    } catch (error) {
        console.error("Erro ao buscar pedido com itens:", error);
        return res.status(500).json({ message: "Erro ao buscar pedido com itens.", error: error.message });
    }
};

module.exports = { getOrders, getOrdersById, createOrders, updateOrder, deleteOrder, getOrderWithItems };