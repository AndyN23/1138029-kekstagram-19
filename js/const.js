'use strict';
(function () {

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
  var MAX_HASHTAGS = 5;
  var MAX_LENGTH_HASHTAG = 20;

  window.const = {
    MESSAGES: MESSAGES,
    USER_NAME: USER_NAME,
    PICTURE_COUNT: PICTURE_COUNT,
    MIN_LIKES: MIN_LIKES,
    MAX_LIKES: MAX_LIKES,
    MAX_HASHTAGS: MAX_HASHTAGS,
    MAX_LENGTH_HASHTAG: MAX_LENGTH_HASHTAG
  };
})();
