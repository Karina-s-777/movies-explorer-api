require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { MONGO_DB } = require('./utils/config');
const rateLimit = require('./middlewares/rateLimit');

// Слушаем 3000 порт, mestodb — имя базы данных, которая будет создана.
const { PORT = 3000, DB_URL = MONGO_DB } = process.env;

const app = express();

app.use(cors());

app.use(helmet());

app.use(bodyParser.json()); // для собирания JSON-формата
app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

// поключаемся к серверу mongoose
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});

app.use(requestLogger);

// подключаем rate-limiter
app.use(rateLimit);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/', require('./routes/index'));

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(errorHandler);

app.listen(PORT);
