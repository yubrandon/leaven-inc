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
    res.status(200).json({items: items, images: images});
};
async function checkItem(req, res) {
    const { itemName } = req.body;
    const exists = await db.itemExists(itemName);
    if(exists){
        res.status(400).json({msg: 'Item already exists!'});
    } else {
        res.status(200).json({msg: 'Item does not exist!'});
    }
}
async function createItem(req, res) {
    const { itemName, images } = req.body;
    await db.itemsPost(itemName);
    await addImage(req,res);

}

async function addImage(req, res) {
    console.log('adding image');
    const { itemName, image } = req.body;
    const id = await db.itemIdGet(itemName);
    //console.log(id);
    await db.imagesPost(id, image);
}
async function createOrder(req, res) {
    const { id } = req.body;
    const orderId = await db.ordersPost(id);
    createSales(req, res, orderId);
}
async function getOrders(req, res) {
    const orders = await db.ordersGet();
    const sales = await db.salesGet();
    res.status(200).json({orders: orders, sales: sales});
}
async function getUserOrders(req, res) {
    
}

async function createSales(req, res, orderId) {
    const { items } = req.body;
    items.map(async (item) => {
        await db.salesPost(orderId, item.id, item.quantity);
    });
    res.status(200).json({msg:"ok"});
}



module.exports = { getUser, getItems, checkItem, createItem, createOrder, getOrders, getUserOrders };