var LocalStrategy = require('passport-local').Strategy;
const UserModel = require ('../models/user');
const bcrypt = require('bcrypt');

function initializePassport (passport) {
  const userModel = new UserModel

  passport.use(new LocalStrategy({usernameField: "email"},async (email,password,done) => {
    const user = await userModel.getUserByEmail(email)
    console.log(email)
    console.log(password)
    console.log(user)
    if (!user) {
      console.log("no user")
      return done(null, false, {message: "No user with that email"})
    }
    try {
      await bcrypt.compare(password,user.password, function (err,res) {
        if(res) {
        console.log("user found and good pw")
        return done(null,user)
      } else {
        console.log("wrong password")
        return done(null, false, {message: "Wrong password for that email address"})
      }
    })
    } catch(err) {
      console.log("erreur")
      return done(err)
    }
  }
  ));

  passport.serializeUser((user,done) => {return done(null,user.id)})
  passport.deserializeUser(async (id,done) => {
    return done(null,await userModel.getUserById(id))})

};

function checkAuthenticated (req,res,next){
  if(req.isAuthenticated()){
    return next()
  } else {
    res.redirect('/login')
  }
};

module.exports = initializePassport,checkAuthenticated;