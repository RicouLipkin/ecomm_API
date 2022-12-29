const db = require ('../db')
const pgp = require('pg-promise')({capSQL: true});

module.exports = class ProductModel {

async getProducts() {
    try {
        const statement =   'SELECT * FROM products'
        const response = await db.query(statement)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async getProductById(id) {
    try {
        const statement =   'SELECT * FROM products WHERE id=$1'
        const response = await db.query(statement,[id])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getProductsFromOrders(id) {
    try {
        const statement =   'SELECT * FROM order_items WHERE product_id=$1'
        const response = await db.query(statement,[id])
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async getProductsFromCarts(id) {
    try {
        const statement =   'SELECT * FROM cart_items WHERE product_id=$1'
        const response = await db.query(statement,[id])
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async createProduct(data) {
    try {
        const statement = pgp.helpers.insert(data, null, 'products')
        const response = await db.query(statement + `RETURNING *`)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
} 

async deleteProduct(productId) {
    try {
        const statement =   'DELETE FROM products WHERE id = $1 RETURNING *'
        const response = await db.query(statement,[productId])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
} 

async updateProduct(data,productId) {
    try {
        // Dynamic conditions must be escaped/formatted properly:
        const condition = pgp.as.format(' WHERE id = $1 RETURNING *', [productId]);
        const statement = pgp.helpers.update(data, null, 'products') + condition;
        //=> UPDATE "my-table" SET "val"=123,"msg"='hello' WHERE id = 1
        const response = await db.query(statement)
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}
} 