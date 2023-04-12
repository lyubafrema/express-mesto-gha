// константы для кодов и сообщений об ошибках
const ERROR_BAD_REQUEST = 400;
const ERROR_NOT_FOUND = 404;
const ERROR_DEFAULT = 500;
const errorMessageIncorrect = { message: 'Переданы некорректные данные' };
const errorMessageNotFound = { message: 'Информация не найдена' };
const errorMessageNotFoundId = { message: 'Id не найден' };
const errorMessageDefault = { message: 'Ошибка сервера' };

module.exports = {
  ERROR_BAD_REQUEST,
  ERROR_NOT_FOUND,
  ERROR_DEFAULT,
  errorMessageIncorrect,
  errorMessageNotFound,
  errorMessageDefault,
  errorMessageNotFoundId,
};
