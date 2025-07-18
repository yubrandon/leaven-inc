#! /usr/bin/env node

const { Client } = require("pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();
 
const SQL = `
CREATE SCHEMA IF NOT EXISTS public;
SET search_path TO public;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    username VARCHAR (255) NOT NULL,
    password VARCHAR (255) NOT NULL,
    email VARCHAR (255),
    admin BOOL DEFAULT false,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS items (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    name VARCHAR (255) NOT NULL,
    description VARCHAR (255) DEFAULT NULL,
    hidden BOOL DEFAULT false,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS images (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    item_id INTEGER NOT NULL,
    url VARCHAR(255) NOT NULL DEFAULT 'http://res.cloudinary.com/dlm75mx0p/image/upload/v1749090545/no-image-icon-23485_ifkrhl.png',
    asset_id VARCHAR(255),
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    id INTEGER GENERATED ALWAYS AS IDENTITY,
    user_id INTEGER NOT NULL,
    completed BOOL DEFAULT false,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS sales (
    order_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders (id),
    FOREIGN KEY (item_id) REFERENCES items (id)
);
`;

const adminConfig = `
INSERT INTO users (username, password, admin) VALUES ($1, $2, $3);`;

async function main() {
    console.log('seeding');
    const client = new Client({
        connectionString: process.env.DB_URL
    });
    await client.connect();
    await client.query(SQL);
    await client.query(adminConfig,['admin', await bcrypt.hash(process.env.DB_PASSWORD, 10), true]);
    await client.end();
    console.log("done");
}
main();