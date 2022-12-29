const express = require('express')
const router = express.Router()
const bcrypt = require ('bcrypt');
const UserModel = require ('../models/user')

module.exports = (app,checkAuthenticated) => {

const user = new UserModel

app.use('/users', checkAuthenticated,router);

router.get('/',async (req, res, next) => {
  try {
    res.send(await user.getUsers())
  } catch(err) {
    next(err);
  }
  });

router.get('/:id',async (req, res, next) => {
  try {
    res.send(await user.getUserById(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.get('/:id/carts',async (req, res, next) => {
  try {
    res.send(await user.getCartByUser(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.get('/:id/orders',async (req, res, next) => {
  try {
    res.send(await user.getOrdersByUser(req.params.id))
  } catch(err) {
    next(err);
  }
  });

router.put('/:id', async (req, res, next) => {
  try {
    const {id : userId} = req.params
    const data = req.body
    if(data.password){ 
      data.password = await bcrypt.hash (data.password, 10)}
    res.send(await user.updateUser(data,userId))
  } catch(err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const {id : userId} = req.params
    res.send(await user.deleteUser(userId))
  } catch(err) {
    next(err);
  }
  });

}

