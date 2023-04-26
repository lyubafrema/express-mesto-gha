// константы для кодов и сообщений об ошибках
const errorMessageIncorrect = 'Переданы некорректные данные';
const errorMessageUnauthorized = 'Неправильные почта или пароль';
const errorMessageNotFound = 'Информация не найдена';
const errorMessageNotFoundId = 'Id не найден';
const errorMessageConflict = 'Такой email уже используется';
const errorForbidden = 'Ошибка доступа';

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
