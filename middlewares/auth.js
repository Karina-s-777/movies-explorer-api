const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../utils/config');
const UnauthorizedError = require('../utils/errors/UnauthorizedError');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError();
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new UnauthorizedError();
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next(); // пропускаем запрос дальше
};
