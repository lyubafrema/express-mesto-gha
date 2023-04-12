const usersRouter = require('./users');
const cardsRouter = require('./cards');

const router = require('express').Router();

router.use('/users', usersRouter);    // общий роутер, рапределяет запрос на users
router.use('/cards', cardsRouter);   // общий роутер, рапределяет запрос на cards

module.exports = router;