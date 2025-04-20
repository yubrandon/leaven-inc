#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    display VARCHAR(255),
    username VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS items (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    description VARCHAR (255),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS images (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    item_id INTEGER NOT NULL,
    url VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (item_id) REFERENCES items(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS sales (
    order_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (item_id) REFERENCES items (id),

);

INSERT INTO users 

`;
/**
 * users - id (pk), display name, username, password
 * items - id (pk), name, description?
 * images - id(items fk), url
 * orders- id (pk), id(users fk)
 * sales - id(orders fk), id items(fk), quantity
 */

async function main() {
    console.log('seeding');
    const client = new Client({
        connectionString: process.env.url
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
}
main();