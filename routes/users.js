const usersRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');
const { urlRegEx } = require('../utils/constants');

usersRouter.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(urlRegEx),
    }).unknown(true),
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  updateAvatar,
);

usersRouter.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(30),
    }).unknown(true),
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  updateProfile,
);

usersRouter.get(
  '/me',
  celebrate({
    user: Joi.object().keys({
      _id: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  getCurrentUser,
);

usersRouter.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().alphanum().length(24),
    }).unknown(true),
  }),
  getUser,
);

usersRouter.get('/', getUsers);

module.exports = usersRouter;
