const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const router = require('./routes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const defaultErr = require('./errors/default-err');
const { urlRegEx, errorMessageNotFound } = require('./utils/constants');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlRegEx),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).unknown(true),
  }),
  createUser,
);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }).unknown(true),
  }),
  login,
);

app.use(auth);
app.use(router);

app.use(errors());

app.use((req, res) => {
  res.status(404).send({ message: 'Error 404: Страница не найдена' });
});

app.use(defaultErr);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000);
