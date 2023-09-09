const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { INTERNAL_SERVER_ERROR } = require('../utils/constants');

module.exports.errorHandler = ((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === HTTP_STATUS_INTERNAL_SERVER_ERROR
        ? INTERNAL_SERVER_ERROR
        : message,
    });
  next();
});
