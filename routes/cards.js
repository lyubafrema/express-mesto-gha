const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

const cardsRouter = require('express').Router();

cardsRouter.delete('/:cardId/likes', dislikeCard);
cardsRouter.put('/:cardId/likes', likeCard);
cardsRouter.delete('/:cardId', deleteCard);
cardsRouter.get('/', getCards);
cardsRouter.post('/', createCard);

module.exports = cardsRouter;