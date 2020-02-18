'use strict';
(function () {
  // функции для получения случайного числа
  var getRandomValue = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  // Функция случайного числа в промежутке между мин и макс числом
  var getRandomInteger = function (min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  };

  window.util = {
    getRandomValue: getRandomValue,
    getRandomInteger: getRandomInteger
  };
})();
