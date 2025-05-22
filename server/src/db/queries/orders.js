const pool = require("../pool");

// Fetch list of orders
module.exports.ordersGet = async function ordersGet() {
    const { rows } = await pool.query("SELECT orders.id, username FROM (orders JOIN users ON user_id=users.id)");
    return rows;
}
// Create a new order
module.exports.ordersPost = async function ordersPost(userId) {
    const orderSQL = `
        INSERT INTO orders (user_id) VALUES ($1)
    `;
    await pool.query(orderSQL, [userId]);
    const idSQL = "SELECT id FROM orders ORDER BY id DESC LIMIT 1";
    const { rows } = await pool.query(idSQL);
    return rows[0].id;
}
// Fetch list of sales
module.exports.salesGet = async function salesGet() {
    const { rows } = await pool.query("SELECT * FROM (sales JOIN items ON item_id=id)");
    return rows;
}
// Create a new sale
module.exports.salesPost = async function salesPost(orderId, itemId, itemQty) {
    const SQL = "INSERT INTO sales VALUES ($1, $2, $3)";
    await pool.query(SQL, [orderId, itemId, itemQty]);
}