'use strict';

(function () {

  var modal = document.querySelector('.modal');
  var icons = document.querySelectorAll('.modal-trigger');
  var overlay = document.querySelector('.overlay');

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
      hideElement(overlay);
    }
  };

  for (var i = 0; i < icons.length; i++) {

    icons[i].addEventListener('click', function () {
      showElement(modal);
      showElement(overlay);
    });

    icons[i].addEventListener('keydown', function (evt) {
      if (evt.keyCode === ENTER) {
        showElement(modal);
        showElement(overlay);
      }
    });
  }

  overlay.addEventListener('click', function () {
    hideElement(modal);
    hideElement(overlay);
  }, window.removeEventListener('keydown', onEscHide));

  window.addEventListener('keydown', onEscHide);

})();
