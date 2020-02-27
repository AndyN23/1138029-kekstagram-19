'use strict';
(function () {

  var load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.open('GET', window.const.URL_DATA);

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case window.const.CODE_200: onSuccess(xhr.response);
          break;
        case window.const.CODE_400: onError('Неверный запрос');
          break;
        case window.const.CODE_401: onError('Пользователь не авторизован');
          break;
        case window.const.CODE_404: onError('Информация не найдена');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = window.const.TIMEOUT_IN_MS;

    xhr.open('GET', window.const.URL_DATA);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
