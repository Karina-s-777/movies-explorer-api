// есть ресурсы — в проекте Mesto это пользователи и карточки.
// Каждый из ресурсов должен соответствовать задуманной структуре:
// например, у пользователя должно быть имя и информация о себе.
// Зададим схему для пользователя через Mongoose:
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // импортируем bcrypt
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // добовляем сообщения об ошибке валидации
    minlength: [2, 'Минимальное количество символов - 2'],
    maxlength: [30, 'Максимальное количество символов - 30'],
    required: [true, 'Поле должно быть заполнено'],
  },
  email: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    // Email должен быть уникальным, поскольку пользователь проходит аутентификацию по электронной
    // почте. Для этого мы добавляем свойство unique со значением true
    unique: true,
    validate: {
      validator(email) { // Регулярное выражение email
        return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Введите верный E-mail',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле должно быть заполнено'],
    // {select: false} - поле вообще не будет запрашиваться из базы данных.
    // Таким образом, вы не можете получить к нему доступ внутри метода,
    // если только вы специально не переопределите этот параметр.
    // Так по умолчанию хеш пароля пользователя не будет возвращаться из базы.
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Пользователь не найден');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль 333');
          }
          return user; // теперь user доступен
        });
    });
};

// создаём модель и экспортируем её.
// Мы передали методу mongoose.model два аргумента: имя модели и схему,
// которая описывает будущие документы
module.exports = mongoose.model('user', userSchema);
