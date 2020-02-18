'use strict';

(function () {

  var openUploadForm = document.querySelector('.img-upload__overlay');
  var openModal = document.querySelector('#upload-file');
  var modalClose = document.querySelector('#upload-cancel');

  // Открытие инпута загрузки => последующее открытие картинки с фильтрами - закрытие ESC
  openModal.addEventListener('click', function () {
    openModal.classList.remove('visually-hidden');
    openModal.addEventListener('change', function () {
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
  modalClose.addEventListener('click', function () {
    openUploadForm.classList.add('hidden');
    openModal.classList.add('visually-hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
})();
