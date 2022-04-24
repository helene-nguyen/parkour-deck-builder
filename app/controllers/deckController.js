//~import modules
const clc = require('cli-color');
const errorController = require('./errorController');
const cardsDataMapper = require('../datamapper/cards.dataMapper.js');
const {
    getOneCard
} = cardsDataMapper;

//~controller
const deckController = {
    //^display deck
    async displayDeck(req, res) {
        //!Sometimes doesn't work if session empty, add [] !!
        const cards = req.session.deck || [];
        const message = req.session.warning;

        try {
            res.render('deck', {
                cards,
                message: message == '' ? ' ' : message
            });
        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    //^add card
    async addCard(req, res) {
        try {
            const targetId = parseInt(req.params.id, 10);
            const oneCard = await getOneCard(targetId);
            //open session
            if (!req.session.deck) {
                req.session.deck = [];
            }
            let deck = req.session.deck;

            const cardAlreadyAdded = deck.find(((card) => {
                return card.id === targetId;
            }))

            //solution 3 : best for me
            deck.length < 5 && !cardAlreadyAdded ? (deck.push(oneCard),  req.session.warning = '') : req.session.warning = 'DEJA AJOUTE OU DEJA 5 CARTES';

            //solution 2
            /* if (deck.length < 5 && !cardAlreadyAdded) {
                deck.push(oneCard);
                req.session.warning = '';
            } else {
                req.session.warning = 'DEJA AJOUTE OU DEJA 5 CARTES';
            } */
            
            //solution 1
            /*    if (deck.length === 0) {
                   deck.push(oneCard);
               } else {
                   const cardAlreadyAdded = deck.find((card) => {
                       return card.id === targetId
                   });
                   //already added
                   if (!cardAlreadyAdded && deck.length < 5) {
                       deck.push(oneCard);
                       req.session.warning = '';
                       console.log("ADDED");
                   } else {
                       req.session.warning = "ALREADY ADDED OR NO MORE CARD CAN BE ADDED";
                       console.log(req.session.warning);
                       res.redirect('/deck');
                       return;
                   }
               } */

            /* console.log(deck); */
            res.redirect('/deck')

        } catch (err) {
            errorController._500(err, req, res);
        }
    },
    //^delete card
    async deleteCard(req, res) {
        const cards = req.session.deck || [];

        const targetId = parseInt(req.params.id, 10)
        try {
            const deleteCard = cards.filter((elem) => {
                return elem.id !== targetId;
            });
            //new array created
            req.session.deck = deleteCard;
            res.redirect('/deck');

        } catch (err) {
            errorController._500(err, req, res);
        }
    }
}

module.exports = deckController;