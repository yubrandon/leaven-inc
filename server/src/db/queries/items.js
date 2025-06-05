const pool = require("../pool");

// Fetch items
module.exports.itemsGet = async function itemsGet() {
    const { rows } = await pool.query("SELECT items.id, name, description, url, asset_id FROM (items JOIN images ON items.id = images.item_id)");
    return rows;
}
// Auxilliary function - fetch id of a new item in order to reference for image entry
module.exports.itemIdGet = async function itemIdGet(itemName) {
    const SQL = `
        SELECT id FROM items WHERE name = ($1)
    `;
    const data = await pool.query(SQL, [itemName]);
    const { rows } = await pool.query(SQL, [itemName]);
    return rows[0];
}
// Create a new item 
module.exports.itemsPost = async function itemsPost(itemName) {
    const SQL = `
        INSERT INTO items (name) VALUES ($1) 
    `;
    await pool.query(SQL, [itemName]);
    console.log('item uploaded!');
}
// Fetch list of images
module.exports.imagesGet = async function imagesGet() {
    const { rows } = await pool.query("SELECT * FROM images");
    return rows;
}
// Create a new image with item reference
module.exports.imagesPost = async function imagesPost(id, image) {
    const SQL = `
        INSERT INTO images (item_id, url, asset_id) VALUES ($1, $2, $3)
    `; 
    await pool.query(SQL, [id.id, image.url, image.assetId]);
}
//Check if the item name exists
module.exports.itemCheck = async function itemCheck(name) {
    const SQL = `
        SELECT items.id, name, asset_id FROM (items JOIN images ON items.id = images.item_id) WHERE name = $1;
    `;
    const { rows } = await pool.query(SQL, [name]);
    return rows;
}
//Update item name
module.exports.updateItemName = async function updateItemName(id, name) {
    const SQL = `
        UPDATE items SET name = ($1) WHERE id = ($2)
    `;
    await pool.query(SQL, [name, id]);
    console.log('item name updated');
}
//Update image info
module.exports.updateItemImage = async function updateItemImage(id, image) {
    const SQL = `
        UPDATE images SET URL = ($1), asset_id = ($2) WHERE item_id = ($3)
    `;
    const res = await pool.query(SQL, [image.url, image.assetId, id]);
    console.log('item image updated');
}