//~import modules
const express = require('express');
const router = express.Router();
const mainController = require('./controllers/mainController');
const { homePage, renderCardDetails } = mainController;
const searchController = require('./controllers/searchController');
const { searchPage, getCardByElement, getCardByLevel, getCardByValues, getCardByName} = searchController;
const deckController = require('./controllers/deckController');
const { displayDeck, addCard, deleteCard } = deckController;

//~routers
router.get('/', homePage);
router.get('/search', searchPage);
router.get('/search/element', getCardByElement, searchPage);
router.get('/search/level', getCardByLevel);
router.get('/search/values', getCardByValues);
router.get('/search/name', getCardByName);
router.get('/card/:id', renderCardDetails);
router.get('/deck', displayDeck);
router.get('/deck/add/:id', addCard);
router.get('/deck/delete/:id', deleteCard);

module.exports = router;
