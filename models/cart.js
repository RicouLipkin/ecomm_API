const db = require ('../db')
const pgp = require('pg-promise')({capSQL: true});

module.exports = class CartModel {

async getCarts() {
    try {
        const statement =   'SELECT * FROM carts'
        const response = await db.query(statement)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async getCartById(id) {
    try {
        const statement =   'SELECT * FROM carts WHERE id=$1'
        const response = await db.query(statement,[id])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getItemsFromCarts(id) {
    try {
        const statement =   'SELECT * FROM cart_items WHERE cart_id=$1'
        const response = await db.query(statement,[id])
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async createCart(data) {
    try {
        const statement = pgp.helpers.insert(data, null, 'carts')
        const response = await db.query(statement + `RETURNING *`)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
} 

async deleteCart(cartId) {
    try {
        const statement =   'DELETE FROM carts WHERE id = $1 RETURNING *'
        const response = await db.query(statement,[cartId])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
} 

async updateCart(data,cartId) {
    try {
        // Dynamic conditions must be escaped/formatted properly:
        const condition = pgp.as.format(' WHERE id = $1 RETURNING *', [cartId]);
        const statement = pgp.helpers.update(data, null, 'carts') + condition;
        //=> UPDATE "my-table" SET "val"=123,"msg"='hello' WHERE id = 1
        const response = await db.query(statement)
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}
} 