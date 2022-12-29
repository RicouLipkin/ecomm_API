const { Pool } = require('pg');

console.log(process.env.PGPORT);

(async () => {

  const usersTableStmt = `
    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        firstname VARCHAR(20) NOT NULL,
        lastname VARCHAR(20) NOT NULL
        );
  `

  const productsTableStmt = `
    CREATE TABLE IF NOT EXISTS products (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        name VARCHAR(50) UNIQUE NOT NULL,
        description VARCHAR(50) NOT NULL,
        price MONEY UNIQUE NOT NULL
        );
  `

  const ordersTableStmt = `
    CREATE TABLE IF NOT EXISTS orders (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        total_price MONEY NOT NULL,
        status VARCHAR(20) NOT NULL,
        created_date DATE NOT NULL DEFAULT(CURRENT_DATE),
        user_id INT REFERENCES users(id) NOT NULL
        );
  `

  const orderItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS order_items (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        order_id INT REFERENCES orders(id) NOT NULL,
        product_id INT REFERENCES products(id) NOT NULL,
        quantity INT NOT NULL
        );
  `

  const cartsTableStmt = `
    CREATE TABLE IF NOT EXISTS carts (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        created_date DATE NOT NULL DEFAULT(CURRENT_DATE),
        total_price MONEY NOT NULL,
        user_id INT REFERENCES users(id) NOT NULL
        );
  `

  const cartItemsTableStmt = `
    CREATE TABLE IF NOT EXISTS cart_items (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY NOT NULL,
        cart_id INT REFERENCES carts (id) NOT NULL,
        product_id INT REFERENCES products(id) NOT NULL,
        quantity INT NOT NULL
        );
  `

  try {
    const db = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: process.env.PGPORT
    });

    await db.connect();

    // Create tables on database
    await db.query(usersTableStmt);
    await db.query(productsTableStmt);
    await db.query(ordersTableStmt);
    await db.query(orderItemsTableStmt);
    await db.query(cartsTableStmt);
    await db.query(cartItemsTableStmt);

    await db.end();

  } catch(err) {
    console.log("ERROR CREATING ONE OR MORE TABLES: ", err);
  }

})();