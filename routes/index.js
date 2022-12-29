const cartRouter = require ('./cart');
const checkoutRouter = require ('./checkout');
const orderRouter = require ('./order');
const productRouter = require ('./product.js');
const userRouter = require ('./user');
const authRouter = require ('./auth');
const docsRouter = require ('./docs')

function checkAuthenticated (req,res,next){
    console.log(req.isAuthenticated())
    if(req.isAuthenticated()){
      return next()
    } else {
      res.redirect('/auth/login')
    }
  };

module.exports = (app) => {
    docsRouter(app);
    authRouter(app);
    cartRouter(app, checkAuthenticated);
    checkoutRouter(app,checkAuthenticated);
    orderRouter(app,checkAuthenticated);
    productRouter(app,checkAuthenticated);
    userRouter(app, checkAuthenticated);
};