const pool = require("../pool");

// Fetch user information for specific id
module.exports.userGet = async function userGet(id) {
    const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
    return rows;
}
// Fetch user information for specific username
module.exports.usernameGet = async function usernameGet(username) {
    const { rows } = await pool.query("SELECT * FROM users WHERE username=$1", [username]);
    return rows;
}
// Create a new user
module.exports.userPost = async function userPost(user) {
    const SQL = `
        INSERT INTO users (username, password, email) VALUES ($1, $2, $3)
    `;
    await pool.query(SQL, Object.values(user));
}