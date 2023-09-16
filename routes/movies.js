const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');
const { validationCreateMovies, validationDeleteMovies } = require('../utils/validation');

router.get('/', getMovies);

router.post('/', validationCreateMovies, createMovies);

router.delete('/:movieId', validationDeleteMovies, deleteMovies);

module.exports = router;
