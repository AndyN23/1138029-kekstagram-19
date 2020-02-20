'use strict';
(function () {
  // Функция для создания массива комментариев
  var getRandomComments = function () {
    var res = [];
    var randomCount = window.util.getRandomInteger(1, 5);
    for (var i = 0; i < randomCount; i++) {
      res.push({
        avatar: 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg',
        message: window.util.getRandomValue(window.const.MESSAGES),
        name: window.util.getRandomValue(window.const.USER_NAME)
      });
    }
    return res;
  };
  // Создаем массив и заполняем массив фото
  var userPhotos = [];
  var createUserPhotos = function () {
    for (var i = 1; i <= window.const.PICTURE_COUNT; i++) {
      userPhotos.push({
        url: 'photos/' + i + '.jpg',
        description: 'Описание фотографии',
        likes: window.util.getRandomInteger(window.const.MIN_LIKES, window.const.MAX_LIKES),
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
    for (var i = 0; i < window.const.PICTURE_COUNT; i++) {
      fragment.appendChild(createNewPhoto(userPhotos[i]));
    }
    listPhotos.appendChild(fragment);
  };
  addListUserPhotos(photoConteiner);
})();
