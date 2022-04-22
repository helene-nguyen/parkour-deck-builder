//~import modules
const cardsDataMapper = require('../datamapper/cards.dataMapper.js');
const {
  getAllCards,
  getOneCard
} = cardsDataMapper;
const errorController = require('./errorController')

//~controller
const mainController = {
  //render home page
  async homePage(req, res) {
    try {
      const cards = await getAllCards()
      res.render('homePage', {
        cards,
        title: 'Liste des cartes'
      });
    } catch (err) {
      errorController._500(err, req, res);
    }
  },
  //render card details
  async renderCardDetails(req, res, next) {
    try {
      const targetId = req.params.id;
      const card = await getOneCard(targetId)
      console.log(card);
      res.render('cardDetails', {
        card
      });

    } catch (err) {
      errorController._500(err, req, res);
    }
  }

};

module.exports = mainController;