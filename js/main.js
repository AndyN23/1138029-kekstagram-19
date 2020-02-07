'use strict';

var MESSAGE = [
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

var getRandomNotRepeat = function (min, max, num) {
  var arr = [];
  var res = [];
  for (var i = min; i <= max; i++) {
    arr.push(i);
  }
  for (i = 0; i < num; i++) {
    res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0]);
  }
  return res;
};

// Функция для создания массива комментариев
var getRandomComments = function (commentsArray) {
  var res = [];
  var randomCount = getRandomInteger(1, 5);
  for (i = 0; i < randomCount; i++) {
    res.push(
        {
          avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
          message: getRandomValue(MESSAGE),
          name: getRandomValue(USER_NAME)
        });
  }
  return res;
};

// Создаем и заполняем массив из фото - переделать в функцию
var createUsersPhoto = function (userPhotos) {
  for (var i = 1; i <= PICTURE_COUNT; i++) {
    userPhotos.push(
        {url: 'photos/' + getRandomNotRepeat(1, PICTURE_COUNT, 1) + '.jpg',
          description: 'Описание фотографии',
          likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
          comments: getRandomComments(commentsArray)
        });
  }
  return userPhotos;
};




var picturesListElement = document.querySelector('.pictures'); // Вставляем фото в блок c этим классом
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture'); // Копируемый темплейт с данным классом

// Клонируем блок картинок
var renderPicture = function (photo){
  var userPhotosElement = pictureTemplate.cloneNode(true);

  userPhotosElement.querySelector('.picture__img').src = userPhotos.url;
  // usersPhotoElement.querySelector('.picture__comments').textContent = userPhotos.comments;
  // usersPhotoElement.querySelector('.picture__likes').textContent = userPhotos.likes;
  // usersPhotoElement.querySelector('.picture__img').alt = userPhotos.description;

  return userPhotosElement;
}

  picturesListElement.appendChild(usersPhotoElement);
