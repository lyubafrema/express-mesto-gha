const cardsRouter = require('express').Router();
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;
