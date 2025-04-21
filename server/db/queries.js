const pool = require("./pool");

async function userGet() {
    const { rows } = await pool.query();
    return rows;
}
async function userPost(user) {
    const SQL = `
        INSERT INTO users (display, username, password) VALUES ($1, $2, $3)
    `;
    await pool.query(SQL, [user.display, user.name, user.password]);
}
async function itemsGet() {
    const { rows } = await pool.query("SELECT * FROM items");
    return rows;
}
async function itemsPost(item) {
    const SQL = `
    
    `;
    await pool.query(SQL);
}
async function imagesGet() {
    const { rows } = await pool.query("SELECT * FROM images");
    return rows;
}

async function imagesPost(image) {
    const SQL = `const { rows } = 
    
    `;
    await pool.query(SQL);
}
async function ordersGet() {
    const { rows } = await pool.query("SELECT * FROM orders");
    return rows;
}
async function ordersPost(order) {
    const SQL = `
    
    `;
    await pool.query(SQL);
}
async function salesGet() {
    const { rows } = await pool.query("SELECT * FROM sales");
    return rows;
}
async function salesPost(sale) {
    const SQL = `
    
    `;
    await pool.query(SQL);
}

module.exports = { userGet, userPost, itemsGet, itemsPost, imagesGet, imagesPost, 
                    ordersGet, ordersPost, salesGet, salesPost
                };