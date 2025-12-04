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
        res.status(500).json({ message: `Erro ao encontrar encomenda: ${error.message}` });
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

const finalizeOrder = async (req, res) => {
    // 🚨 Pegue os itens do carrinho e os totais do frontend, além dos dados do pedido
    const { 
        user_id, 
        branch_id, 
        user_address_id, 
        payment_method, 
        items // <--- Novo: Lista de itens do carrinho
    } = req.body;

    const frete = 15.00; // Valor fixo do frete (melhor se viesse de config ou BD)
    
    if (!user_id || !branch_id || !user_address_id || !payment_method || !items || items.length === 0) {
        return res.status(400).json({ message: "Dados do pedido incompletos." });
    }

    const client = await pool.connect(); // Obtém uma conexão para a transação
    
    try {
        // 1. INÍCIO DA TRANSAÇÃO
        await client.query('BEGIN');
        
        // 2. CRIA O PEDIDO BÁSICO (sem total_value ainda)
        const orderCreationResult = await client.query(
            "INSERT INTO orders (user_id, branch_id, user_address_id, payment_method) VALUES ($1, $2, $3, $4) RETURNING id",
            [user_id, branch_id, user_address_id, payment_method]
        );
        
        const orderId = orderCreationResult.rows[0].id; // 🚨 CAPTURA DO ID AUTOMÁTICO
        
        // 3. INSERE OS ITENS E CALCULA O SUBTOTAL
        const subtotal = await ordersModel.insertOrderItems(client, orderId, items);
        
        // 4. CALCULA O TOTAL FINAL
        const finalTotalValue = subtotal + frete;
        
        // 5. ATUALIZA O PEDIDO COM OS VALORES FINAIS
        await client.query(
            // Salvando o subtotal para facilitar a exibição na tela de resumo
            `UPDATE orders SET total_value = $1, subtotal = $2, frete = $3 WHERE id = $4`,
            [finalTotalValue, subtotal, frete, orderId]
        );
        
        // 6. LIMPA O CARRINHO (Esta lógica deve estar aqui para garantir atomicidade)
        // Você precisará de uma função no seu CartModel para limpar o carrinho do usuário.
        // Exemplo: 
        // const cartClearResult = await client.query("DELETE FROM cart_items WHERE user_id = $1", [user_id]);
        
        // 7. FIM DA TRANSAÇÃO (Sucesso)
        await client.query('COMMIT');
        
        // 8. RETORNA O ID AUTOMÁTICO PARA O FRONTEND REDIRECIONAR
        return res.status(201).json({ 
            message: "Pedido finalizado com sucesso.", 
            order_id: orderId // <--- É este ID que você precisa para o redirecionamento!
        }); 

    } catch (error) {
        // ROLLBACK em caso de qualquer erro
        await client.query('ROLLBACK');
        console.error("Erro na finalização do pedido:", error);
        return res.status(500).json({ message: `Erro ao finalizar encomenda: ${error.message}` });
    } finally {
        // Libera a conexão
        client.release();
    }
};
module.exports = { getOrders, getOrdersById, createOrders, updateOrder, deleteOrder, getOrderWithItems, finalizeOrder };