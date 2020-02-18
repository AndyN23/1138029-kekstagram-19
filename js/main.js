'use strict';

var MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

var USER_NAME = ['Дженифер Лорес', 'Юрий Бабарин', 'Брюс Чхи', 'Гай Мичи', 'Леонель Несси'];
var PICTURE_COUNT = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;

// функции для получения случайного числа
var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

// Функция случайного числа в промежутке между мин и макс числом
var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

// Функция для создания массива комментариев
var getRandomComments = function () {
  var res = [];
  var randomCount = getRandomInteger(1, 5);
  for (var i = 0; i < randomCount; i++) {
    res.push({
      avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
      message: getRandomValue(MESSAGES),
      name: getRandomValue(USER_NAME)
    });
  }
  return res;
};

// Создаем массив и заполняем массив фото
var userPhotos = [];
var createUserPhotos = function () {
  for (var i = 1; i <= PICTURE_COUNT; i++) {
    userPhotos.push({
      url: 'photos/' + i + '.jpg',
      description: 'Описание фотографии',
      likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
      comments: getRandomComments(),
    });
  }
};

var photoConteiner = document.querySelector('.pictures'); // Адрес/ блок куда копируем клонов с фото пользователей
var photoTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture'); // Блок-донор для клонирования

createUserPhotos();
// console.log('userPhotos', {
//   userPhotos: userPhotos,
//   template: photoTemplate
// });


// Функция где клонируем донор и  меняем наполнение блок-клонов
var createNewPhoto = function (photoIndex) {
  var newPhoto = photoTemplate.cloneNode(true);
  var newPhotoImg = newPhoto.querySelector('.picture__img');
  newPhotoImg.src = photoIndex.url;

  newPhoto.querySelector('.picture__img').alt = photoIndex.description;
  newPhoto.querySelector('.picture__comments').textContent = photoIndex.comments;
  newPhoto.querySelector('.picture__likes').textContent = photoIndex.likes;

  return newPhoto;
};

// Функция для объединение в фрагмент и его наполнение с выводом на экран всех изображений
var addListUserPhotos = function (listPhotos) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < PICTURE_COUNT; i++) {
    fragment.appendChild(createNewPhoto(userPhotos[i]));
  }
  listPhotos.appendChild(fragment);
};

addListUserPhotos(photoConteiner);

// _______________
// Задание доверяй, но проверяй
var openUploadForm = document.querySelector('.img-upload__overlay');
var openModal = document.querySelector('#upload-file');
var modalClose = document.querySelector('#upload-cancel');

// Открытие инпута загрузки => последующее открытие картинки с фильтрами - закрытие ESC
openModal.addEventListener('click', function (evt) {
  openModal.classList.remove('visually-hidden');
  openModal.addEventListener('change', function (evt) {
    openUploadForm.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', function (evt) {
      if (evt.key === 'Escape') {
        openUploadForm.classList.add('hidden');
        openModal.classList.add('visually-hidden');
        openModal.value = '';
        document.querySelector('body').classList.remove('modal-open');
      }
    });
  });
});


// Закрытие окна при клике
modalClose.addEventListener('click', function (evt) {
  openUploadForm.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
});

// Настройка насыщенности
var effectLevelDepth = document.querySelector('.effect-level__depth');
var effectLevelLine = document.querySelector('.effect-level__line');
var effectLevelPin = document.querySelector('.effect-level__pin');

// Передвижение джостика при отпускании кнопки мыши
effectLevelLine.addEventListener('mouseup', function (evt) {
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

for (var i = 0; i < effectsRadio.length; i++){
  (function (choiceEffect) {
  choiceEffect.addEventListener('change', function (evt) {
      var effectsName = choiceEffect.value;
      imgUploadPreview.className = '';
      imgUploadPreview.classList.add('img-upload__preview');
      imgUploadPreview.classList.add('effects__preview--' + effectsName);
    });
  })(effectsRadio[i]);
};

// Валидация хеш тегов
var MAX_HASHTAGS = 5;
var MAX_LENGTH_HASHTAG = 20;

var textHashtags = document.querySelector('.text__hashtags');

function getCustomValidity() {
  textHashtags.setCustomValidity(''); // обнуляем при изменении

  if (textHashtags.value === '') {
    // хэш-теги необязательны;
    return;
  }
  // набор хэш-тегов из строк превращает в массив с нижним регистром
    var setHashtags = textHashtags.value.toLowerCase().split(' ');
    if (setHashtags.length >= MAX_HASHTAGS) {
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
    if (setHashtags[i].length > MAX_LENGTH_HASHTAG) {
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
};

textHashtags.addEventListener('change', getCustomValidity);
