//~import modules
const errorController = require('./errorController');
const searchDataMapper = require('../datamapper/search.dataMapper');
const {
  displayElementsOptions,
  getElementCards,
  getElementCardsISNULL,
  getCardByLevel,
  getCardByValues,
  getElementByName
} = searchDataMapper;
const cardsDataMapper = require('../datamapper/cards.dataMapper.js');
const {
  getAllCards
} = cardsDataMapper;

//~controller
const searchController = {
  //^display search page
  async searchPage(req, res, next) {
    try {
      const elements = await displayElementsOptions();
      const allCards = await getAllCards();

      if (!req.session.searchBy) {
        req.session.searchBy = [allCards];
      }
      
      const cards = req.session.searchBy;

      res.render('search', {
        elements,
        cards
      });

    } catch (err) {
      errorController._500(err, req, res)
    }
  },
  //^card by element
  async getCardByElement(req, res, next) {
    try {
      req.session.searchBy = [];
      const searchByElement = req.session.searchBy;

      let element = `${req.query.element}`;
      let cardsByElement = await getElementCards(element);
      const allCards = await getAllCards();
      const cardsISNULL = await getElementCardsISNULL();

      element == 'undefined' ? cardsByElement = allCards : (element == 'null' ? cardsByElement = cardsISNULL : cardsByElement);

      searchByElement.push(cardsByElement);
      next();
      
    } catch (err) {
      errorController._500(err, req, res)
    }
  },
  //^card by level
  async getCardByLevel(req, res, next) {
    req.session.searchBy = [];
    const searchByLevel = req.session.searchBy;

    try {
      let level = `${req.query.level}`;
      const cardsISNULL = await getElementCardsISNULL();
      let cardsByLevel = await getCardByLevel(level);

      level == 0 ? cardsByLevel = cardsISNULL : cardsByLevel;
      console.log(level);

      searchByLevel.push(cardsByLevel);
      next();

    } catch (err) {
      errorController._500(err, req, res);
    }
  },
  //^card by values
  async getCardByValues(req, res, next) {
    req.session.searchBy = [];
    const searchByValues = req.session.searchBy;

    try {
      const direction = req.query.direction;
      const value = req.query.value;
      const cardsISNULL = await getElementCardsISNULL();

      let cardsByValues = await getCardByValues(direction, value);

      value == 0 ? cardsByValues = cardsISNULL : cardsByValues;
      console.log(value);

      searchByValues.push(cardsByValues);
      next();


    } catch (err) {
      errorController._500(err, req, res);
    }
  },
  //^card by name
  async getCardByName(req, res, next) {
    req.session.searchBy = [];
    const searchByName = req.session.searchBy;

    try {
      console.log(req.query.name.toLowerCase());
      const nameQuery = req.query.name.toLowerCase();

      let cardsByName = await getElementByName(nameQuery);

      searchByName.push(cardsByName);
      next();

    } catch (err) {
      errorController._500(err, req, next)
    }
  }
};

module.exports = searchController;