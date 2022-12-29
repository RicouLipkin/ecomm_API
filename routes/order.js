const express = require('express')
const router = express.Router()
const OrderModel = require ('../models/order')

module.exports = (app,checkAuthenticated) => {

const order = new OrderModel

app.use('/orders', checkAuthenticated, router);
    
router.get('/',async (req, res, next) => {
  try {
    res.send(await order.getOrders())
  } catch(err) {
    next(err);
  }
  });

router.get('/:id',async (req, res, next) => {
  try {
    res.send(await order.getOrderById(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.get('/:id/items',async (req, res, next) => {
  try {
    res.send(await order.getItemsFromOrder(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.post('/', async (req, res, next) => {
  try {
    const data = req.body
    res.send(await order.createOrder(data))
  } catch(err) {
    next(err);
  }
  });

router.put('/:id', async (req, res, next) => {
  try {
    const {id : orderId} = req.params
    const data = req.body
    res.send(await order.updateOrder(data,orderId))
  } catch(err) {
    next(err);
  }
  });

router.delete('/:id', async (req, res, next) => {
  try {
    const {id : orderId} = req.params
    res.send(await order.deleteOrder(orderId))
  } catch(err) {
    next(err);
  }
  });

}