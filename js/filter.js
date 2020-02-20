'use strict';
(function () {
  // Настройка насыщенности
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  // Передвижение джостика при отпускании кнопки мыши
  effectLevelLine.addEventListener('mouseup', function () {
    effectLevelPin.style.position = 'absolute';
    var x = event.offsetX; // Начальная точка координат относительно родителя
    effectLevelPin.style.left = x + 'px';
    // Перемещаем насыщенность за джостиком
    effectLevelDepth.style.width = effectLevelPin.style.left;

    // Добавляем значение в инпут
    var inputEffectLevel = document.querySelector('input[name=effect-level]'); // inputeffect
    // console.log(ninputEffectLevel.value);
    inputEffectLevel.value = Math.floor(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100);
    // console.log('newValue', {
    //  fullWidth : effectLevelLine.offsetWidth,
    //  activeWidth: effectLevelDepth.offsetWidth,
    //  newValue: inputEffectLevel.value });
  });

  // Включение фильтров
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var effectsRadio = document.querySelectorAll('.effects__radio');

  for (var i = 0; i < effectsRadio.length; i++) {
    (function (choiceEffect) {
      choiceEffect.addEventListener('change', function () {
        var effectsName = choiceEffect.value;
        imgUploadPreview.className = '';
        imgUploadPreview.classList.add('img-upload__preview');
        imgUploadPreview.classList.add('effects__preview--' + effectsName);
      });
    })(effectsRadio[i]);
  }
})();
