const express = require('express')
const router = express.Router()
const ProductModel = require ('../models/product')

module.exports = (app,checkAuthenticated) => {

app.use('/products',checkAuthenticated, router);

const product = new ProductModel
    
router.get('/',async (req, res, next) => {
  try {
    res.send(await product.getProducts())
  } catch(err) {
    next(err);
  }
  });

router.get('/:id',async (req, res, next) => {
  try {
    res.send(await product.getProductById(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.get('/:id/carts',async (req, res, next) => {
  try {
    res.send(await product.getProductsFromCarts(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.get('/:id/orders',async (req, res, next) => {
  try {
    res.send(await product.getProductsFromOrders(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    res.send(await product.createProduct(data))
  } catch(err) {
    next(err);
  }
  });

router.put('/:id', async (req, res, next) => {
  try {
    const {id : userId} = req.params
    const data = req.body
    res.send(await product.updateProduct(data,userId))
  } catch(err) {
    next(err);
  }
  });

router.delete('/:id', async (req, res, next) => {
  try {
    const {id : productId} = req.params
    res.send(await product.deleteProduct(productId))
  } catch(err) {
    next(err);
  }
  });

}