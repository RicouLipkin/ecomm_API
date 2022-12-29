const db = require ('../db')
const pgp = require('pg-promise')({capSQL: true});


module.exports = class UserModel {

async getUsers() {
    try {
        const statement =   'SELECT * FROM users'
        const response = await db.query(statement)
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}

async createUser(data) {
    try {
        const statement = pgp.helpers.insert(data, null, 'users')
        const response = await db.query(statement + `RETURNING *`)
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
} 

async deleteUser(userId) {
    try {
        const statement =   'DELETE FROM users WHERE id = $1 RETURNING *'
        const response = await db.query(statement,[userId])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
} 

async updateUser(data,userId) {
    try {
        // Dynamic conditions must be escaped/formatted properly:
        const condition = pgp.as.format(' WHERE id = $1 RETURNING *', [userId]);
        const statement = pgp.helpers.update(data, null, 'users') + condition;
        //=> UPDATE "my-table" SET "val"=123,"msg"='hello' WHERE id = 1
        const response = await db.query(statement)
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getUserByEmail(email) {
    try {
        const statement =   'SELECT * FROM users WHERE email=$1'
        const response = await db.query(statement,[email])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getUserById(id) {
    try {
        const statement =   'SELECT * FROM users WHERE id=$1'
        const response = await db.query(statement,[id])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getCartByUser(id) {
    try {
        const statement =   'SELECT * FROM carts WHERE user_id=$1'
        const response = await db.query(statement,[id])
        return response.rows[0]
    } catch(err) {
        throw new Error(err)
    }
}

async getOrdersByUser(id) {
    try {
        const statement =   'SELECT * FROM orders WHERE user_id=$1'
        const response = await db.query(statement,[id])
        return response.rows
    } catch(err) {
        throw new Error(err)
    }
}
} 