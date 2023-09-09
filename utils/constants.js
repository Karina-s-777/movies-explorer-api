// сообщения ответов и ошибок вынесены в отдельный файл с константами

const INCORRECT_URL = 'Некорректный URL';

const INTERNAL_SERVER_ERROR = 'Внутренняя ошибка сервера';

const UNAUTHORIZED = 'Необходима вторизация';
const BAD_REQUEST = 'Bad request';
const FORBIDDEN = 'Forbidden';
const NOT_FOUND = 'Ресурс не найден';
const CONFLICT = 'Conflict';

const EMAIL_EXISTS = 'Пользователь с такой почтой уже существует';

module.exports = {
  INCORRECT_URL,
  INTERNAL_SERVER_ERROR,
  UNAUTHORIZED,
  BAD_REQUEST,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  EMAIL_EXISTS,
};
