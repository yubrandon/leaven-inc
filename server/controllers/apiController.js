const db = require("../db/queries.js");

async function getUser(req, res) {

}

async function postUser(req, res) {
    console.log(req, req.params);
    db.userPost(user);
}

async function getItems(res, res)  {
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



module.exports = { getUser, postUser, getItems, postItems, checkoutItems, getOrders };