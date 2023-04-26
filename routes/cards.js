const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { urlRegEx } = require('../utils/constants');

cardsRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  dislikeCard,
);

cardsRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  likeCard,
);

cardsRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  deleteCard,
);

cardsRouter.get('/', getCards);

cardsRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(urlRegEx),
    }).unknown(true),
    params: Joi.object().keys({
      cardId: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  createCard,
);

module.exports = cardsRouter;
