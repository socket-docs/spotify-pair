'use strict';
let roomBtn = document.getElementById('scr__room');
let roomSection = document.querySelector('.room');
let joinRoomBtn = document.getElementById('join__room');
let joinRoomSection = document.querySelector('.join__room');
let isAnimated = false;

roomBtn.addEventListener('click', function (event) {
  event.preventDefault();
  roomSection.scrollIntoView({
    top: 0,
    behavior: 'smooth',
  });
});

joinRoomBtn.addEventListener('click', function (event) {
  event.preventDefault();
  joinRoomSection.scrollIntoView({
    top: 0,
    behavior: 'smooth',
  });
});

let startYOffset = window.pageYOffset;

window.onscroll = function () {
  let currentYOffset = window.pageYOffset;

  if (startYOffset > currentYOffset) {
    document.getElementById('header').style.top = 0;
  } else {
    document.getElementById('header').style.top = '-85px';
    document.getElementById('header').style.backgroundColor =
      'rgba(255, 255, 255, 1)';
    document.getElementById('header').style.boxShadow =
      '0 2px 4px 0 rgba(0,0,0,.2)';
  }
  startYOffset = currentYOffset;
  if (currentYOffset === 0) {
    document.getElementById('header').style.backgroundColor = 'transparent';
    document.getElementById('header').style.boxShadow = 'none';
  }
};
