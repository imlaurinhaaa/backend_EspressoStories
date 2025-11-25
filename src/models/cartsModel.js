const pool = require("../config/database");
const cartItemsModel = require("./cart_itemsModel");

const getCarts = async () => {
    const result = await pool.query("SELECT * FROM carts");
    return result.rows;
};

const getCartById = async (id) => {
    const result = await pool.query("SELECT * FROM carts WHERE id = $1", [id]);
    return result.rows[0];
};

const createCart = async (user_id, branch_id) => {
    const result = await pool.query(
        "INSERT INTO carts (user_id, branch_id) VALUES ($1, $2) RETURNING *", 
        [user_id, branch_id]
    );
    return result.rows[0];
};

const updateCart = async (id, user_id, branch_id) => {
    const currentCart = await pool.query("SELECT * FROM carts WHERE id = $1", [id]);
    if (!currentCart.rows[0]) {
        throw new Error("Carrinho não encontrado.");
    }

    const updateUserId = user_id || currentCart.rows[0].user_id;
    const updateBranchId = branch_id || currentCart.rows[0].branch_id;

    const result = await pool.query(
        "UPDATE carts SET user_id = $1, branch_id = $2 WHERE id = $3 RETURNING *", 
        [updateUserId, updateBranchId, id]
    );
    return result.rows[0];
};

const deleteCart = async (id) => {
    const result = await pool.query("DELETE FROM carts WHERE id = $1 RETURNING *", [id]);
    return result.rows[0];
};

const getCartWithItems = async (user_id) => {
    const cartResult = await pool.query(
        `SELECT c.*, u.name AS user_name 
         FROM carts c
         JOIN users u ON u.id = c.user_id
         WHERE c.user_id = $1 
         LIMIT 1`,
        [user_id]
    );

    if (cartResult.rowCount === 0) {
        return { cart: null, items: [], total_price: 0 };
    }

    const cart = cartResult.rows[0];

    const itemsResult = await pool.query(
        `SELECT ci.*, p.name AS product_name, p.price AS product_price 
         FROM cart_items ci
         JOIN products p ON p.id = ci.product_id
         WHERE ci.cart_id = $1`,
        [cart.id]
    );

    const items = itemsResult.rows.map(item => ({
        ...item,
        total_item_price: item.product_price * item.quantity
    }));

    const totalPrice = items.reduce((sum, item) => sum + item.total_item_price, 0);

    return {
        cart: { ...cart, user_name: cart.user_name },
        items,
        total_price: totalPrice
    };
};

module.exports = { 
    getCarts, 
    getCartById, 
    createCart, 
    updateCart, 
    deleteCart, 
    getCartWithItems 
};