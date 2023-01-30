require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errors } = require('celebrate');
const cors = require('cors');
const { InternalServerError } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes');

const app = express();

app.use(cors());

app.use(cookieParser());

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 500, // можно совершить максимум 500 запросов с одного IP
});

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(requestLogger);
app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routes);
app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = InternalServerError, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === InternalServerError
        ? 'На сервере произошла ошибка'
        : message,
  });
  next();
});

app.listen(PORT, () => {
  console.log(`App listen ${PORT}`);
});
