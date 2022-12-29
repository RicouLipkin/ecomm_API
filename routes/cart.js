const express = require('express')
const router = express.Router()
const CartModel = require ('../models/cart')

module.exports = (app,checkAuthenticated) => {

app.use('/carts',checkAuthenticated, router);

const cart = new CartModel
    
router.get('/',async (req, res, next) => {
  try {
    res.send(await cart.getCarts())
  } catch(err) {
    next(err);
  }
  });

router.get('/:id',async (req, res, next) => {
  try {
    res.send(await cart.getCartById(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.get('/:id/items',async (req, res, next) => {
  try {
    res.send(await cart.getItemsFromCarts(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    res.send(await cart.createCart(data))
  } catch(err) {
    next(err);
  }
  });

router.put('/:id', async (req, res, next) => {
  try {
    const {id : cartId} = req.params
    const data = req.body
    res.send(await cart.updateCart(data,cartId))
  } catch(err) {
    next(err);
  }
  });

router.delete('/:id', async (req, res, next) => {
  try {
    const {id : cartId} = req.params
    res.send(await cart.deleteCart(cartId))
  } catch(err) {
    next(err);
  }
  });

}