var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcrypt = require ('bcrypt');
var db = require('../db');
var router = express.Router();
const UserModel = require ('../models/user')

module.exports = (app) => {
  
  const user = new UserModel
  app.use('/auth',router);

  router.get('/register', function(req, res, next) {
    res.send('register');
    });

  router.post('/register', async (req, res, next) => {
    try {
      const data = req.body
      data.password = await bcrypt.hash (data.password, 10)
      console.log(data)
      res.send(await user.createUser(data))
    } catch(err) {
      next(err);
    }
    });
  
  router.get('/login', function(req, res, next) {
    res.send('login');
    });

  router.post('/login', passport.authenticate('local', {
    successFlash: true,
    failureFlash: true
  }),
  (req,res,next)=>{
    res.send("good")
  });
  
  };