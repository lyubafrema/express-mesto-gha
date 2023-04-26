const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Card = require('../models/card');
const {
  errorMessageNotFoundId,
  errorMessageNotFound,
  errorForbidden,
} = require('../utils/constants');

// создаем карточку
const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch(next);
};

// получаем все карточки
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        throw new NotFoundError(errorMessageNotFound);
      }
      return res.send(cards);
    })
    .catch(next);
};

// удаляем карточку
const deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessageNotFoundId);
      }
      // проверяем права пользователя на удаление карточки
      if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError(errorForbidden);
      }
      return res.send(card);
    })
    .catch(next);
};

// ставим лайк
const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавим _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessageNotFoundId);
      }
      return res.send(card);
    })
    .catch(next);
};

// убираем лайк
const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // уберем _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(errorMessageNotFoundId);
      }
      return res.send(card);
    })
    .catch(next);
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
