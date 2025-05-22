const pool = require("./pool");
const User = require("./queries/users");
const Item = require("./queries/items");
const Order = require("./queries/orders");

async function userGet(id) {
    return User.userGet(id);
}
async function usernameGet(username) {
    return User.usernameGet(username);
}
async function userPost(user) {
    return User.userPost(user);
}
async function itemsGet() {
    return Item.itemsGet();
}
async function itemIdGet(itemName) {
    return Item.itemIdGet(itemName);
}
async function itemsPost(itemName) {
    return Item.itemsPost(itemName);
}
async function imagesGet() {
    return Item.imagesGet();
}
async function imagesPost(id, image) {
    return Item.imagesGet(id, image);
}

async function ordersGet() {
    return Order.ordersGet();
}
async function ordersPost(userId) {
    return Order.ordersPost(userId);
}
async function salesGet() {
    return Order.salesGet();
}
async function salesPost(orderId, itemId, itemQty) {
    return Order.salesPost(orderId, itemId, itemQty);
}

module.exports = { userGet, usernameGet, userPost, itemsGet, itemIdGet, itemsPost, imagesGet, imagesPost, 
                    ordersGet, ordersPost, salesGet, salesPost
                };