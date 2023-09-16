const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');
const {
  getUser, editUserData,
} = require('../controllers/users');
const { validationEditUserData } = require('../utils/validation');

router.get('/me', getUser);

// обновляет профиль
router.patch('/me', validationEditUserData, editUserData);

module.exports = router;
