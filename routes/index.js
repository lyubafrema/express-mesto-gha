const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');

// общий роутер, рапределяет запрос на users
router.use('/users', usersRouter);
// общий роутер, рапределяет запрос на cards
router.use('/cards', cardsRouter);

module.exports = router;
