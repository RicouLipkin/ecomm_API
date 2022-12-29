const db = require ('../db')
const pgp = require('pg-promise')({capSQL: true});

module.exports = class OrderModel {

async getOrders() {
    try {
        const statement =   'SELECT * FROM orders'
        const response = await db.query(statement)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async getOrderById(id) {
    try {
        const statement =   'SELECT * FROM orders WHERE id=$1'
        const response = await db.query(statement,[id])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getItemsFromOrder(id) {
    try {
        const statement =   'SELECT * FROM order_items WHERE order_id=$1'
        const response = await db.query(statement,[id])
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async createOrder(data) {
    try {
        const statement = pgp.helpers.insert(data, null, 'orders')
        const response = await db.query(statement + `RETURNING *`)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
} 

async deleteOrder(orderId) {
    try {
        const statement =   'DELETE FROM orders WHERE id = $1 RETURNING *'
        const response = await db.query(statement,[orderId])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
} 

async updateOrder(data,orderId) {
    try {
        // Dynamic conditions must be escaped/formatted properly:
        const condition = pgp.as.format(' WHERE id = $1 RETURNING *', [orderId]);
        const statement = pgp.helpers.update(data, null, 'orders') + condition;
        //=> UPDATE "my-table" SET "val"=123,"msg"='hello' WHERE id = 1
        const response = await db.query(statement)
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}
} 