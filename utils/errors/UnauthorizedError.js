const { HTTP_STATUS_UNAUTHORIZED } = require('http2').constants;
const { UNAUTHORIZED } = require('../constants');

module.exports = class UnauthorizedError extends Error {
  constructor(message = UNAUTHORIZED) {
    super(message);
    this.statusCode = HTTP_STATUS_UNAUTHORIZED;
  }
};
