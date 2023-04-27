// спасибо за ревью! я обрадовалась, когда увидела,
// что вы снова будете проверять мою работу) очень подробные комментарии
// правда помогают разобраться <3
// постаралась всё исправить!

const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');
const defaultErr = require('./errors/default-err');

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.use(errors());
app.use(defaultErr);

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.listen(3000);
