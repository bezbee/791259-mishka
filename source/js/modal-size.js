'use strict';

(function () {

  var sizeButtons = document.querySelectorAll('.modal__button-size');
  var SPACEBAR = 32;

  for (var i = 0; i < sizeButtons.length; i++) {
  sizeButtons[i].addEventListener('keydown', function (evt) {
    if (evt.keyCode === SPACEBAR) {
      sizeButtons.forEach(function (item) { item.classList.remove('modal__button-size--active');
      });
      this.classList.add('modal__button-size--active');
      }
    });
  }
})();
