const { HTTP_STATUS_BAD_REQUEST } = require('http2').constants;
const { BAD_REQUEST } = require('../constants');

module.exports = class BadRequestError extends Error {
  constructor(message = BAD_REQUEST) {
    super(message);
    this.statusCode = HTTP_STATUS_BAD_REQUEST;
  }
};
