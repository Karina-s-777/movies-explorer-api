const router = require('express').Router();
const signinRouter = require('./signin');
const signupRouter = require('./signup');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
// Обработка неправильного пути с ошибкой 404
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
