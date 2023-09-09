const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { login } = require('../controllers/users');
const { validationLogin } = require('../utils/validation');

router.post('/', validationLogin, login);

module.exports = router;
