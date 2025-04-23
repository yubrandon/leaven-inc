const pool = require("./pool");

//USERS
async function userGet(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    return rows;
}
async function usernameGet(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    return rows;
}
async function userPost(user) {
    const SQL = `
        INSERT INTO users (username, password) VALUES ($1, $2)
    `;
    await pool.query(SQL, Object.values(user));
}




//ITEMS
async function itemExists(itemName) {
    const { rows } = await pool.query("SELECT * FROM items WHERE name=$1", [itemName]);
    if(rows.length) return true;
    return false;
}
async function itemsGet() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}
async function itemIdGet(itemName) {
    const SQL = `
        SELECT id FROM items WHERE name = ($1)
    `
    const { rows } = await pool.query(SQL, [itemName]);
    return rows[0];
}
async function itemsPost(itemName) {
    const SQL = `
        INSERT INTO items (name) VALUES ($1) 
    `;
    await pool.query(SQL, [itemName]);
    console.log('item uploaded!');
}




//IMAGES
async function imagesGet() {
    const { rows } = await pool.query("SELECT * FROM images");
    return rows;
}

async function imagesPost(id, image) {
    const SQL = `
        INSERT INTO images (item_id, url, asset_id) VALUES ($1, $2, $3)
    `; 
    await pool.query(SQL, [id.id, image.url, image.assetId]);
    console.log('image uploaded!');
}





//ORDERS + SALES
async function ordersGet() {
    const { rows } = await pool.query("SELECT * FROM orders");
    return rows;
}
async function ordersPost(userId) {
    const orderSQL = `
        INSERT INTO orders (user_id) VALUES ($1)
    `;
    await pool.query(orderSQL, [userId]);
    const idSQL = "SELECT id FROM orders ORDER BY id DESC LIMIT 1";
    const { rows } = await pool.query(idSQL);
    return rows[0].id;
}
async function salesGet() {
    const { rows } = await pool.query("SELECT * FROM sales");
    return rows;
}
async function salesPost(orderId, itemId, itemQty) {
    const SQL = "INSERT INTO sales VALUES ($1, $2, $3)";
    await pool.query(SQL, [orderId, itemId, itemQty]);
}

module.exports = { userGet, usernameGet, userPost, itemExists, itemsGet, itemIdGet, itemsPost, imagesGet, imagesPost, 
                    ordersGet, ordersPost, salesGet, salesPost
                };