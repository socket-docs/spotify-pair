'use stric';
var today = new Date();
var time = today.getHours() + ":" + today.getMinutes() ;

// const moment =require('moment');

const socket = io();
let room = window.location.href.split('/')[3];
console.log(room);
socket.on('front', payload => {
  console.log(`here is your : ${payload}`);
});
socket.emit('assign-me', room);
// $('#video')[0].contentWindow.postMessage(
//   '{"event":"command","func":"' + 'playVideo' + '","args":""}',
//   '*',
//   console.log('ready to play')
// );
socket.on('hello', payload => {
  console.log(payload);
});
socket.emit('queue-check',{roomId: room });

$('#room').click(function (e) {
  e.preventDefault();
  $(`<div>share this id with your friends: ${room}</div>`).appendTo('.share');
  $('#room').unbind('click');
});

$('#play').click(function (e) {
  e.preventDefault();
  console.log('i exist');
  socket.emit('play', room);
});
$('#stop').click(function (e) {
  e.preventDefault();
  socket.emit('stop', room);
});
$('#pause').click(function (e) {
  e.preventDefault();
  socket.emit('pasue', room);
});

/*********** FORM *********/
$('#song__form').submit(function (e) {
  e.preventDefault();
  let fullLink = e.target.song.value;
  if (fullLink.includes('=')) {
    let link = fullLink.indexOf('=');
    // console.log('contains');
    let id = fullLink.slice(link + 1, link + 12);
    socket.emit('video-id', { videoId: id, roomId: room });
  }
});

/**
 * https://www.youtube.com/watch?v=8SbUC-UaAxE&ab_channel=GunsNRosesVEVO
 * https://youtu.be/8SbUC-UaAxE
 */

//********* SOCKET CONNECTIONS *****************/
socket.on('play-handled', payload => {
  $('#video')[0].contentWindow.postMessage(
    '{"event":"command","func":"' + 'playVideo' + '","args":""}',
    '*'
  );
  console.log('ready to play');
});
socket.on('stop-handled', payload => {
  $('#video')[0].contentWindow.postMessage(
    '{"event":"command","func":"' + 'stopVideo' + '","args":""}',
    '*'
  );
  console.log('stop is working 403');
});
socket.on('pause-handled', payload => {
  $('#video')[0].contentWindow.postMessage(
    '{"event":"command","func":"' + 'pauseVideo' + '","args":""}',
    '*'
  );
});
socket.on('embed-id', payload => {
  let videoLink = `https://www.youtube.com/embed/${payload}?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=0&controls=0`;
  $('#video').attr('src', videoLink);
});
// https://www.youtube.com/embed/dLnlQwwL3Wk?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1&controls=0

/******************************** chattign****************************/

const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');
const name = prompt('What is your name?');

/******** */
socket.on('old_massage', payload => {
  console.log('dd');
  console.log(payload.message);
  if(payload.message === 0){
    
appendMessage(`You joined 🕜 ${time}`);
socket.emit('new-user', { name: name, roomId: room });
  }
  payload.message.forEach(element => {
    appendMessage(`${element.name}: ${element.message} 🕜 ${element.time} `);
  });
  
  // appendMessage(`${payload.name} :${payload.message}-------- `);
});

/********* */


appendMessage(`You joined 🕜 ${time}`);
socket.emit('new-user', { name: name, roomId: room });



socket.on('user-connected', payload => {
  appendMessage(`${payload.name} is connected  🕜 ${payload.time}`);
});
socket.on('user-disconnected', payload => {
  appendMessage(`${payload.name} disconnected  🕜 ${payload.time}`);
});
socket.on('chat-message', data => {
  // console.log('----------------------------------------',data);
  appendMessage(`${data.name}: ${data.message} 🕜 ${data.time}`);
});
messageForm.addEventListener('submit', e => {
  e.preventDefault();
  console.log('form is working');
  const message = messageInput.value;
  var timeHour = time;
  appendMessage(`You: ${message} 🕜 ${timeHour}`);
  socket.emit('send-chat-message', { message: message, roomId: room });
  messageInput.value = '';
});
appendMessage;
function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageContainer.append(messageElement);
}
