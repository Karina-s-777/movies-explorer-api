const { HTTP_STATUS_CREATED, HTTP_STATUS_OK } = require('http2').constants;
const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/NotFoundError');
const BadRequestError = require('../utils/errors/BadRequestError');
const ForbiddenError = require('../utils/errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  // используем методы mongo find и т.д.
  // Пустой объект метода ({}) вернет все объекты, которые мы писали в базе
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => {
      res.status(HTTP_STATUS_OK).send(movies);
    })
    .catch(next);
};

// создаем карточку кино
module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  // создаем  карточку и внутрь кладем id
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    // когда карточка создалась, берем её
    .then((movie) => {
      // по созданной карточке берем её id и делаем поиск
      Movie.findById(movie._id)
        // ссылаемся на документ в других коллекциях. Работает с уже созданными документами
        // положили тут объект пользователя
        .populate('owner')
        // берем данные и возвращаем в ответе
        .then((data) => res.status(HTTP_STATUS_CREATED).send(data))
        .catch(() => {
          // если id не найден в базе, то ошибка 404
          next(new NotFoundError('Карточка не найдена'));
        });
    })
    .catch((error) => {
      // если id не найден в базе, то ошибка 404
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(error.message));
      } else {
        next(error);
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) return next(new ForbiddenError('Вы не можете удалить карточку другого пользователя'));
      return Movie.deleteOne(movie).then(() => res.send({ data: movie }));
    })
    .catch(next);
};
