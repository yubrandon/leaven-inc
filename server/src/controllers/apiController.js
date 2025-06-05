const db = require("../db/queries.js");
const Item = require("../db/queries/items");

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

async function getItem(req, res) {
    const { name } = req.params;
    const item = await db.itemCheck(name);
    if(item.length) {
        res.status(200).send(item[0]);
    }
    else {
        res.status(404).json({msg: "Item not found!"});
    }

}
async function getItems(req, res)  {
    const items = await db.itemsGet();
    const images = await db.imagesGet();
    res.status(200).json({items: items, images: images});
};
async function createItem(req, res) {
    const { itemName } = req.body;
    await db.itemsPost(itemName);
    await addImage(req,res);
}
async function editItem(req, res) {
    const { id } = req.params;
    const item = req.body;
    console.log('body', item);
    await Item.updateItemName(id, item.name);
    await Item.updateItemImage(id, item.image);
    //WIP: delete original image
    //const del = deleteCloudImage(item.asset_id);
}

async function addImage(req, res) {
    const { itemName, image } = req.body;
    const id = await db.itemIdGet(itemName);
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

async function createSales(req, res, orderId) {
    const { items } = req.body;
    items.map(async (item) => {
        await db.salesPost(orderId, item.id, item.quantity);
    });
    res.status(200).json({msg:"ok"});
}



module.exports = { getUser, getItem, getItems, createItem, editItem, createOrder, getOrders };