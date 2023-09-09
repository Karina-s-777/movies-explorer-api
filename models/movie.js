const mongoose = require('mongoose');
const { URL_REGEX } = require('../utils/validation');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  director: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Заполните поле'],
  },
  year: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  description: {
    type: String,
    required: [true, 'Заполните поле'],
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(url) { // Регулярное выражение email
        return URL_REGEX.test(url);
      },
      message: 'Введите верные данные',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(url) { // Регулярное выражение email
        return URL_REGEX.test(url);
      },
      message: 'Введите верные данные',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(url) { // Регулярное выражение email
        return URL_REGEX.test(url);
      },
      message: 'Введите верные данные',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true],
    // Настраиваем связи через ref. Чтобы сделать это на уровне схемы,
    // полю следует установить специальный тип — mongoose.Schema.Types.ObjectId и свойство ref.
    // В это свойство записывают имя модели, на которую мы ссылаемся:
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
  // ссылка на модель автора карточки, тип ObjectId, обязательное поле

});

module.exports = mongoose.model('movie', movieSchema);
