const usersRouter = require('express').Router();
const {
  createUser, getUsers, getUser, updateProfile, updateAvatar,
} = require('../controllers/users');

usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.patch('/me', updateProfile);
usersRouter.get('/:userId', getUser);
usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;
