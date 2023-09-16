const { HTTP_STATUS_FORBIDDEN } = require('http2').constants;
const { FORBIDDEN } = require('../constants');

module.exports = class ForbiddenError extends Error {
  constructor(message = FORBIDDEN) {
    super(message);
    this.statusCode = HTTP_STATUS_FORBIDDEN;
  }
};
