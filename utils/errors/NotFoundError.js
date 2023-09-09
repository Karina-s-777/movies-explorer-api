const { HTTP_STATUS_NOT_FOUND } = require('http2').constants;
const { NOTFOUND } = require('dns');

module.exports = class NotFoundError extends Error {
  constructor(message = NOTFOUND) {
    super(message);
    this.statusCode = HTTP_STATUS_NOT_FOUND;
  }
};
