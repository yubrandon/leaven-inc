const db = require("../db/queries.js");

async function getUser(req, res) {
    const { id } = req.query;
    await db.userGet(id);
    res.status(200).send({message:"ok"});
}


async function getItems(req, res)  {
    const items = await db.itemsGet();
    const images = await db.imagesGet();
    console.log(items);
};

async function createItem(req, res) {
    
}
async function createCheckout(req, res) {
    
}
async function getOrders(req, res) {
    
}



module.exports = { getUser, getItems, createItem, createCheckout, getOrders };