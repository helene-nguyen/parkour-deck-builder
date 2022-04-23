//!DOTENV
require('dotenv').config();

//~import modules
const express = require('express');
const app = express();
const session = require('express-session');
//~locals
/* const cards = require('./data/cards.json');
app.locals.cards = cards; */

//~import router
const router = require('./app/router');
const errorController = require('./app/controllers/errorController');

//~static
app.use(express.static('public'));

//~session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: {}
}));

//~motor
app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

//~url encoded
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

//~router
app.use(router);

//~error
app.use((errorController._404));

//~launch app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Running server on http://localhost:${PORT}`);
});
