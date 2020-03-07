'use strict';

(function () {
  var openUploadForm = document.querySelector('.img-upload__overlay');
  var openModal = document.querySelector('#upload-file');
  var modalClose = document.querySelector('#upload-cancel');
  // Открытие инпута загрузки => последующее открытие картинки с фильтрами
  openModal.addEventListener('click', function () {
    openModal.classList.remove('visually-hidden');
    openModal.addEventListener('change', function () {
      openUploadForm.classList.remove('hidden');
      document.querySelector('body').classList.add('modal-open');
    });
  });
  // Закрытие окна при нажатии ESC
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      openUploadForm.classList.add('hidden');
      openModal.classList.add('visually-hidden');
      openModal.value = '';
      document.querySelector('body').classList.remove('modal-open');
      document.querySelector('.big-picture').classList.add('hidden');;
    }
  });
  // Закрытие окна при клике
  modalClose.addEventListener('click', function () {
    openUploadForm.classList.add('hidden');
    openModal.classList.add('visually-hidden');
    document.querySelector('body').classList.remove('modal-open');
  });


  // Закрытие полноразмерного окна
  var closeBigPicture = document.querySelector('.big-picture__cancel');
  closeBigPicture.addEventListener('click', function() {
    document.querySelector('.big-picture').classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

  // // Открытие каждой картинки
  //  var overlayPictures = document.querySelectorAll('.picture__img');
  //  overlayPictures.addEventListener('click', function(){
  //   document.querySelector('.big-picture').classList.remove('hidden');
  //   overlayPictures.classList.add('big-picture__img');

  });
})();
