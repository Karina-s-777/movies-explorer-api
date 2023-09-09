const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const { addUser } = require('../controllers/users');
const { validationAddUser } = require('../utils/validation');
// const urlRegex = require('../utils/constants');

router.post('/', validationAddUser, addUser);

module.exports = router;
