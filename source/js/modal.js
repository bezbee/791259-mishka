'use strict';

(function () {

  var modal = document.querySelector('.modal');
  var icons = document.querySelectorAll('.modal-trigger');
  var head = document.querySelector('head');

  var ENTER = 13;
  var ESC = 27;




  var showElement = function (element) {
    element.classList.add('modal-show');
  };

  var hideElement = function (element) {
    element.classList.remove('modal-show');
  };

  var onEscHide = function (evt) {
    if (evt.keyCode === ESC) {
      hideElement(modal);
      head.classList.remove('overlay');
    }
  };

  for (var i = 0; i < icons.length; i++) {

    icons[i].addEventListener('click', function () {
      showElement(modal);
      head.classList.add('overlay');
    });

    icons[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        showElement(modal);
        head.classList.add('overlay');
      }
    });
  }

  head.addEventListener('click', function () {
    hideElement(modal);
    head.classList.remove('overlay');
  }, window.removeEventListener('keydown', onEscHide));

  window.addEventListener('keydown', onEscHide);

})();
