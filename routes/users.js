const { createUser, getUsers, getUser, updateProfile, updateAvatar } = require('../controllers/users');

const usersRouter = require('express').Router();

usersRouter.patch('/me/avatar', updateAvatar);
usersRouter.patch('/me', updateProfile);
usersRouter.get('/:userId', getUser);
usersRouter.get('/', getUsers);
usersRouter.post('/', createUser);

module.exports = usersRouter;