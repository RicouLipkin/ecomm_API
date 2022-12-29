const express = require('express');
const app = express();
const port = process.env.PORT;
const routes = require ('./routes');
const bodyParser = require('body-parser');
const initializePassport = require ('./loaders/passport')
const checkAuthenticated = require ('./loaders/passport')
var passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

initializePassport(passport);

app.use(bodyParser.json());
app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize())
app.use(passport.session())

routes(app);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});