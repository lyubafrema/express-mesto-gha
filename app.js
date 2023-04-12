const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./routes');
const { ERROR_NOT_FOUND, errorMessageNotFound } = require('./utils/constants');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  req.user = {
    _id: '64355344607eb68f82008f2a'     // добавляем id пользователя ко всем запросам
  };
  next();
});

app.use((req, res, next) => {
  res.status(ERROR_NOT_FOUND).send(errorMessageNotFound)
  next();
})

app.use(router);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
.then(() => {
  console.log('connect mongo');
})
.catch((err) => {
  console.log(`error ${err}`);
})

app.listen(3000, () => {
  console.log('start server');
})
