const express = require('express')
const router = express.Router()

module.exports = (app, checkAuthenticated) => {

app.use('/checkout', checkAuthenticated, router);
    
router.get('/', (req, res, next) => {
    res.send("show checkout")
  });

}