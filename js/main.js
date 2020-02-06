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

// функции для получения случайного числа

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomNotRepeat = function (min, max, num) {
  var i, arr = [], res = [];
  for (i = min; i <= max; i++) arr.push(i);
  for (i = 0; i < num; i++) res.push(arr.splice(Math.floor(Math.random() * (arr.length)), 1)[0]);
  return res;
};

// Генерируем массив из комментариев
var userComments = [];
for (var i = 1; i <= 8; i++) {
  userComments.push(
      {avatar: 'img/avatar-' + getRandomInteger(1, 6) + '.svg',
        message: getRandomValue(MESSAGE),
        name: getRandomValue(USER_NAME)
      });
}

var picturesElement = document.querySelector('.pictures'); // Вставляем фото в блок c этим классом
var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture'); // Копируемый темплейт с данным классом

// Генерируем массив из фото
var createUsersPhotos = function (arrPhotos) {
  for (i = 1; i <= PICTURE_COUNT; i++) {
    arrPhotos.push(
        {url: 'photos/' + getRandomNotRepeat(1, PICTURE_COUNT, 1) + '.jpg',
          description: 'Описание фотографии',
          likes: getRandomInteger(15, 200),
          comments: getRandomValue(userComments)
        });
  }
  return arrPhotos;
};


// Клонируем блок картинок
var renderUsersPicture = function (photo) {
  var usersPhotoElement = pictureTemplate.cloneNode(true);

  usersPhotoElement.querySelector('.picture__comments').textContent = photo.comments;
  usersPhotoElement.querySelector('.picture__likes').textContent = photo.likes;
  usersPhotoElement.querySelector('.picture__img').src = photo.url;
  usersPhotoElement.querySelector('.picture__img').alt = photo.description;

  return usersPhotoElement;
};

var addListPictures = function (listPictures) {
  var fragment = document.createDocumentFragment();

  for (i = 0; i <= PICTURE_COUNT; i++) {
    fragment.appendChild(renderUsersPicture(photos[i]));
  }
  listPictures.appendChild(fragment);
};

