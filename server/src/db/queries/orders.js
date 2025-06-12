const pool = require("../pool");

// Fetch list of orders
module.exports.ordersGet = async function ordersGet() {
    const SQL = `
        SELECT orders.id, username, completed 
        FROM (orders JOIN users ON user_id=users.id) 
        ORDER BY completed ASC, orders.id
        `;
    const { rows } = await pool.query(SQL);
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
    const SQL = `
        SELECT * FROM (sales JOIN items ON item_id=id)
    `;
    const { rows } = await pool.query(SQL);
    return rows;
}
// Create a new sale
module.exports.salesPost = async function salesPost(orderId, itemId, itemQty) {
    const SQL = "INSERT INTO sales VALUES ($1, $2, $3)";
    await pool.query(SQL, [orderId, itemId, itemQty]);
}
//Mark an order as complete
module.exports.setComplete = async function setComplete(id) {
    const SQL = `UPDATE orders SET completed = true WHERE id = $1`;
    await pool.query(SQL, [id]);
    console.log('updated order: ',id);
}

// Fetch list of orders and sales for a specific id
module.exports.ordersGetId = async function ordersGetId(id) {
    const SQL = `
        SELECT orders.id, completed 
        FROM orders
        WHERE orders.user_id IN 
            (SELECT user_id FROM orders 
            WHERE id IN 
                (SELECT orders.id 
                FROM (orders JOIN users ON user_id = users.id) 
                WHERE users.id = $1)
            ) 
        ORDER BY orders.id
    `;
    const { rows } = await pool.query(SQL, [id]);
    return rows;
}

module.exports.salesGetId = async function salesGetId(id) {
    const SQL = `
        SELECT order_id, items.id, name, quantity FROM (sales JOIN items ON sales.item_id = items.id) 
        WHERE order_id IN (
            SELECT orders.id FROM (orders JOIN users ON orders.user_id = users.id) WHERE users.id = $1
            )
    `;
    const { rows } = await pool.query(SQL, [id]);
    return rows;
}
