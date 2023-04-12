const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
const { ERROR_NOT_FOUND, errorMessageNotFound } = require('./utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// добавляем id пользователя ко всем запросам
app.use((req, res, next) => {
  req.user = {
    _id: '64355344607eb68f82008f2a',
  };
  next();
});

app.use(router);

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send(errorMessageNotFound);
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000);
