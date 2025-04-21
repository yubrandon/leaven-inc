const db = require("../db/queries.js");

async function getUser(req, res) {

}
async function postUser(req, res) {
    console.log(req, req.params);
    db.userPost(user);
}

module.exports = { postUser };