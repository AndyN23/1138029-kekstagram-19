'use strict';
(function () {
  // Функция для создания массива комментариев
  var getRandomComments = function () {
    // создаем массив
    var res = [];
    // рандомное количество комментариев
    var randomCount = window.util.getRandomInteger(1, 5);
    // создаем цикл с последующим заполнением созданного выше массива рандомным количеством комментариев
    for (var i = 0; i < randomCount; i++) {
      res.push({
        avatar: 'img/avatar-' + window.util.getRandomInteger(1, 6) + '.svg',
        message: window.util.getRandomValue(window.const.MESSAGES),
        name: window.util.getRandomValue(window.const.USER_NAME)
      });
    }
    return res;
  };
  // Создаем массив
  var userPhotos = [];
  // создаем функцию для заполнения массива картинками, описанием, лайками и коментами
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
  var photoTemplate = document.querySelector('#picture').content.querySelector('.picture'); // Блок-донор для клонирования

  createUserPhotos();
  // console.log('userPhotos', {
  //   userPhotos: userPhotos,
  //   template: photoTemplate
  // });

  // Функция где клонируем донор и  меняем наполнение блок-клонов
  var createNewPhoto = function (photoIndex) {
    // клонируем со всем наполнением
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
    // создаем фрагмент
    var fragment = document.createDocumentFragment();
    // заполняем фрагмент фотками - 25 шт
    for (var i = 0; i < listPhotos.length; i++) {
      fragment.appendChild(createNewPhoto(listPhotos[i]));
    };
    // console.log("addListUserPhotos",
    //   {
    //     listPhotos
    //   });
    photoConteiner.appendChild(fragment);
  };


  var errorHandler = function (errorMessage) {
    // создаем блок ошибки
    var node = document.createElement('div');
    // оформляем как будет отображаться ошибка на экране
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'fixed';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '24px';
    node.style.color = 'black';
    // текст ошибки
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  // запускаем функцию с сервера
  window.backend.load(addListUserPhotos, errorHandler);
  // addListUserPhotos(photoConteiner);





  // Работаем с большой картинкой
  // Блок коментариев
  // находим и берем блок коммента за основу - клонируем
  var socialComment = document.querySelector('.social__comment');
  var getSocialComment = function (data) {
    var socialCommentCopy = socialComment.cloneNode(true);
    // заполняемые элементы блока - аватар, имя
    var socialCommentImg = socialCommentCopy.querySelector('.social__picture');
    socialCommentImg.src = data.avatar;
    socialCommentImg.alt = data.name;
    // Заполняем текстом комментария
    var socialCommentText = socialCommentCopy.querySelector('p');
    socialCommentText.textContent = data.message;

    return socialCommentCopy;
  };

  // Находим полноразмерную картинку
  var bigPicture = document.querySelector('.big-picture');
  // Находим блок всех комментариев к изображению
  var socialCommentTemplate = document.querySelector('.social__comments');

  var showBigPicture = function (item) {
    // Показываем картинку большую
    bigPicture.classList.remove('hidden');
    // Находим элементы для заполнения
    var bigPictureImg = bigPicture.querySelector('.big-picture__img');
    // адрес картинки
    bigPictureImg.src = item.url;
    // кол-во лайков
    bigPicture.querySelector('.likes-count').textContent = item.likes;
    // комментарии
    bigPicture.querySelector('.comments-count').textContent = item.comments.length;
    // Создает фрагмент, для вставки комменатриев
    var fragment = document.createDocumentFragment();
    // Заполняет новые комментарии
    for (var i = 0; i < item.comments.length; i++) {
      fragment.appendChild(getSocialComment(item.comments[i]));
    }
    // Чистит блок комментариев в разметке
    socialCommentTemplate.innerHTML = '';
    // Добавляет новые комментарии
    socialCommentTemplate.appendChild(fragment);
    // Описание фотографии
    bigPicture.querySelector('.social__caption').textContent = item.description;

    return showBigPicture;
  };

  // открываем большую картинку
  document.querySelector('.social__comment-count').classList.add('hidden');
  // скрываем счетчик комментариев
  document.querySelector('.comments-loader').classList.add('hidden');
  // убираем прокрутку фона
  document.querySelector('body').classList.add('modal-open');
  // Запускаем функцию
  showBigPicture(userPhotos[0]);
})();
