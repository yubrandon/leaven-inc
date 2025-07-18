const User = require("../db/queries/users");
const Item = require("../db/queries/items");
const Order = require("../db/queries/orders");

async function getUser(req, res) {
    const { id } = req.params;
    console.log('fetching user id:',id);
    const user = await User.userGet(id);
    console.log(user);
    if(Object.values(user.length)) {
        res.status(200).json({msg:"ok"});
    } else {
        res.status(404).json({msg: "user not found!"});
    }
    
}

async function getItem(req, res) {
    const { name } = req.params;
    const item = await Item.itemCheck(name);
    if(item.length) {
        res.status(200).send(item[0]);
    }
    else {
        res.status(404).json({msg: "Item not found!"});
    }

}
async function getItems(req, res)  {
    console.log('fetching items');
    const items = await Item.itemsGet();
    const images = await Item.imagesGet();
    res.status(200).json({items: items, images: images});
};
async function createItem(req, res) {
    const { itemName } = req.body;
    await Item.itemsPost(itemName);
    await addImage(req,res);
    res.status(200).json({msg: "Item upload successful!"});
}
async function editItem(req, res) {
    const { id } = req.params;
    const item = req.body;
    await Item.updateItemName(id, item.name);
    if(item.image) {
        await Item.updateItemImage(id, item.image);
    }
    res.status(200).json({msg: "ok"});
    //WIP: delete original image
    //const del = deleteCloudImage(item.asset_id);
}
/*
async function deleteItem(req, res) {
    const { id } = req.params;
    console.log('item id: ', id)
    await Item.deleteItem(id);
    res.status(200).json({msg:"item deleted"});
}*/
async function toggleItem(req, res) {
    const { id } = req.params;
    const state = await Item.toggleHide(id);
    console.log('hidden: ',state.hidden);
    if(state.hidden) {
        res.status(200).json({msg: "Item has been hidden!"});
    }
    else {
        res.status(200).json({msg: "Item is now displayed!"});
    }
}

async function addImage(req, res) {
    const { itemName, image } = req.body;
    const id = await Item.itemIdGet(itemName);
    await Item.imagesPost(id, image);
}
async function createOrder(req, res) {
    const { id } = req.body;
    const orderId = await Order.ordersPost(id);
    await createSales(req, res, orderId);
    res.status(200).json({msg: "Order created successfuly!"});
}
async function getOrders(req, res) {
    const orders = await Order.ordersGet();
    const sales = await Order.salesGet();
    res.status(200).json({orders: orders, sales: sales});
}
async function getUserOrders(req, res) {
    const { id } = req.params;
    const orders = await Order.ordersGetId(id);
    const sales = await Order.salesGetId(id);
    res.status(200).json({orders: orders, sales: sales});
}
async function updateOrder(req, res) {
    const { id } = req.params;
    await Order.setComplete(id);
    res.status(200).json({msg:"completion status updated"});
}

async function createSales(req, res, orderId) {
    const { items } = req.body;
    items.map(async (item) => {
        await Order.salesPost(orderId, item.id, item.quantity);
    });
}



module.exports = { getUser, getItem, getItems, createItem, editItem, toggleItem,
                 createOrder, getOrders, getUserOrders, updateOrder };