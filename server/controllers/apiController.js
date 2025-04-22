const db = require("../db/queries.js");
const bcrypt = require("bcryptjs");

async function getUser(req, res) {

}

async function createUserPost(req, res) {
    const user  = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    await db.userPost(user);
    res.status(200).send({message:"ok"});
}

async function getItems(req, res)  {
    const items = await db.itemsGet();
    const images = await db.imagesGet();
    console.log(items);
};

async function postItems(req, res) {
    
}
async function checkoutItems(req, res) {
    
}
async function getOrders(req, res) {
    
}



module.exports = { getUser, createUserPost, getItems, postItems, checkoutItems, getOrders };