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
