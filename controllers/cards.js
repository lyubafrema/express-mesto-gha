const Card = require('../models/card');
const {
  ERROR_BAD_REQUEST,
  errorMessageIncorrect,
  ERROR_DEFAULT,
  errorMessageDefault,
  ERROR_NOT_FOUND,
  errorMessageNotFoundId,
  errorMessageNotFound,
} = require('../utils/constants');

// создаем карточку
const createCard = (req, res) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((newCard) => {
      res.send(newCard);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      return res.status(ERROR_DEFAULT).send(errorMessageDefault);
    });
};

// получаем все карточки
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      if (!cards) {
        return res.status(ERROR_NOT_FOUND).send(errorMessageNotFound);
      }
      return res.send(cards);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      return res.status(ERROR_DEFAULT).send(errorMessageDefault);
    });
};

// удаляем карточку
const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send(errorMessageNotFoundId);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      return res.status(ERROR_DEFAULT).send(errorMessageDefault);
    });
};

// ставим лайк
const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавим _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send(errorMessageNotFoundId);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      if (error.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      return res.status(ERROR_DEFAULT).send(errorMessageDefault);
    });
};

// убираем лайк
const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // уберем _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res.status(ERROR_NOT_FOUND).send(errorMessageNotFoundId);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      if (error.name === 'CastError') {
        return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect);
      }
      return res.status(ERROR_DEFAULT).send(errorMessageDefault);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
