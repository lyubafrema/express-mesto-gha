const User = require('../models/user');
const { ERROR_BAD_REQUEST, errorMessageIncorrect, ERROR_DEFAULT, errorMessageDefault, ERROR_NOT_FOUND, errorMessageNotFound } = require('../utils/constants');

// создаем пользователя
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((newUser) => {
    res.send(newUser);
  })
  .catch((error) => {
    if (error.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect)
    } else {
      return res.status(ERROR_DEFAULT).send(errorMessageDefault)
    }
  })
}

// получаем пользователя по id
const getUser = (req, res) => {
  User.findById(req.params.userId)
  .then((user) => {
    res.send(user);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(ERROR_NOT_FOUND).send(errorMessageNotFound)
    } else {
      return res.status(ERROR_DEFAULT).send(errorMessageDefault)
    }
  })
}

// получаем всех пользователей
const getUsers = (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(ERROR_NOT_FOUND).send(errorMessageNotFound)
    } else {
      return res.status(ERROR_DEFAULT).send(errorMessageDefault)
    }
  })
}

// обновляем информацию профиля
const updateProfile = (req, res) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, {new: true, runValidators: true})
  .then((updatedUser) => {
    res.send(updatedUser);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(ERROR_NOT_FOUND).send(errorMessageNotFound)
    }
    if (error.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect)
    } else {
      return res.status(ERROR_DEFAULT).send(errorMessageDefault)
    }
  })
}

// обновляем аватар
const updateAvatar = (req, res) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, {new: true, runValidators: true})
  .then((updatedUser) => {
    res.send(updatedUser);
  })
  .catch((error) => {
    if (error.name === 'CastError') {
      return res.status(ERROR_NOT_FOUND).send(errorMessageNotFound)
    }
    if (error.name === 'ValidationError') {
      return res.status(ERROR_BAD_REQUEST).send(errorMessageIncorrect)
    } else {
      return res.status(ERROR_DEFAULT).send(errorMessageDefault)
    }
  })
}

module.exports = {
  createUser,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile
};