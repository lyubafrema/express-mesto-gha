// константы для кодов и сообщений об ошибках
const errorMessageIncorrect = { message: 'Переданы некорректные данные' };
const errorMessageUnauthorized = { message: 'Неправильные почта или пароль' };
const errorMessageNotFound = { message: 'Информация не найдена' };
const errorMessageNotFoundId = { message: 'Id не найден' };
const errorMessageConflict = { message: 'Такой email уже используется' };
const errorForbidden = { message: 'Ошибка доступа' };

// регулярное выражение для проверки URL
const urlRegEx = /^(http|https):\/\/(www.)?[^ "]+$/;

module.exports = {
  errorMessageIncorrect,
  errorMessageUnauthorized,
  errorMessageNotFound,
  errorMessageNotFoundId,
  errorMessageConflict,
  errorForbidden,
  urlRegEx,
};
