const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  errorMessageNotFound,
  errorMessageUnauthorized,
  errorMessageConflict,
  errorForbidden,
} = require('../utils/constants');
const NotFoundError = require('../errors/not-found-err');
const UnauthorizedError = require('../errors/unauthorized-err');
const ConflictError = require('../errors/conflict-err');
const ForbiddenError = require('../errors/forbidden-err');

// создаем пользователя
const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    })
      .then((newUser) => {
        res.status(201).send({
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
        });
      })
      .catch((error) => {
        if (error.code === 11000) {
          next(new ConflictError(errorMessageConflict));
        }
      });
  });
};

// аутентификация
const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(errorMessageUnauthorized);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            next(new UnauthorizedError(errorMessageUnauthorized));
          }
          const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
          return res.send({ token });
        });
    })
    .catch(next);
};

// получаем текущего пользователя
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessageNotFound);
      }
      return res.send(user);
    })
    .catch(next);
};

// получаем пользователя по id
const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessageNotFound);
      }
      return res.send(user);
    })
    .catch(next);
};

// получаем всех пользователей
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (!users) {
        throw new NotFoundError(errorMessageNotFound);
      }
      return res.send(users);
    })
    .catch(next);
};

// обновляем информацию профиля
const updateProfile = (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;

  User.findByIdAndUpdate(_id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessageNotFound);
      }
      // проверяем права пользователя на изменение профиля
      if (req.params.userId !== req.user._id) {
        throw new ForbiddenError(errorForbidden);
      }
      return res.send(user);
    })
    .catch(next);
};

// обновляем аватар
const updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;

  User.findByIdAndUpdate(_id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError(errorMessageNotFound);
      }
      // проверяем права пользователя на изменение аватара
      if (req.params.userId !== req.user._id) {
        throw new ForbiddenError(errorForbidden);
      }
      return res.send(user);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getCurrentUser,
  getUser,
  getUsers,
  updateAvatar,
  updateProfile,
};
