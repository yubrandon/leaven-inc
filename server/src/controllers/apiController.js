const db = require("../db/queries.js");

async function getUser(req, res) {
    const { id } = req.params;
    console.log('fetching user id:',id);
    const user = await db.userGet(id);
    console.log(user);
    if(Object.values(user.length)) {
        res.status(200).json({msg:"ok"});
    } else {
        res.status(404).json({msg: "user not found!"});
    }
    
}


async function getItems(req, res)  {
    const items = await db.itemsGet();
    const images = await db.imagesGet();
    console.log(items);
};

async function createItem(req, res) {
    const { itemName, image } = req.body;
    console.log(itemName,image);
}
async function createCheckout(req, res) {
    
}
async function getOrders(req, res) {
    
}



module.exports = { getUser, getItems, createItem, createCheckout, getOrders };