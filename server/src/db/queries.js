const pool = require("./pool");
const User = require("./queries/users");
const Item = require("./queries/items");
const Order = require("./queries/orders");

async function userGet(id) {
    return await User.userGet(id);
}
async function usernameGet(username) {
    return await User.usernameGet(username);
}
async function userPost(user) {
    return await User.userPost(user);
}
async function itemsGet() {
    return await Item.itemsGet();
}
async function itemIdGet(itemName) {
    return await Item.itemIdGet(itemName);
}
async function itemsPost(itemName) {
    return await Item.itemsPost(itemName);
}
async function imagesGet() {
    return await Item.imagesGet();
}
async function imagesPost(id, image) {
    return await Item.imagesPost(id, image);
}

async function ordersGet() {
    return await Order.ordersGet();
}
async function ordersPost(userId) {
    return await Order.ordersPost(userId);
}
async function salesGet() {
    return await Order.salesGet();
}
async function salesPost(orderId, itemId, itemQty) {
    return await Order.salesPost(orderId, itemId, itemQty);
}

module.exports = { userGet, usernameGet, userPost, itemsGet, itemIdGet, itemsPost, imagesGet, imagesPost, 
                    ordersGet, ordersPost, salesGet, salesPost
                };