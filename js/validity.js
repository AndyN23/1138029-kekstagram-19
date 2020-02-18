'use strict';
(function () {
  var textHashtags = document.querySelector('.text__hashtags');

  function getCustomValidity() {
    textHashtags.setCustomValidity(''); // обнуляем при изменении

    if (textHashtags.value === '') {
      // хэш-теги необязательны;
      return;
    }
    // набор хэш-тегов из строк превращает в массив с нижним регистром
    var setHashtags = textHashtags.value.toLowerCase().split(' ');
    if (setHashtags.length >= window.const.MAX_HASHTAGS) {
      textHashtags.setCustomValidity('Нельзя указывать больше пяти хэш-тегов');
      return;
    }
    // создаем объект для проверки хеш на уникальность
    // В дальнейшем переделать  уникальность через SET
    var uniqueHash = {};
    // цикл проверяет каждый из хэш-тегов на соответствие ограничениям
    for (var i = 0; i < setHashtags.length; i++) {
      if (!setHashtags[i].match(/^#[a-zA-Z0-9а-яА-Я]+$/)) {
        textHashtags.setCustomValidity('Хэш-тег должен начинаться с символа # и должен состоять только из числе и букв');
        break;
      }
      if (setHashtags[i].length > window.const.MAX_LENGTH_HASHTAG) {
        textHashtags.setCustomValidity('Максимальная длина одного хэш-тега должна быть не больше 20 символов, включая #');
        break;
      }
      if (uniqueHash[setHashtags[i]]) {
        textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        break;
      }
      // если все в порядке, записывает тег в список уникальных
      uniqueHash[setHashtags[i]] = true;
    }
  }
  textHashtags.addEventListener('change', getCustomValidity);
})();
