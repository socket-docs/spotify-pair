'use stric';

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
socket.on('hello-mf', payload => {
  console.log(payload);
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
  let x = e.target.song.value;
  console.log(x);
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
// https://www.youtube.com/embed/dLnlQwwL3Wk?enablejsapi=1&version=3&playerapiid=ytplayer&autoplay=1&controls=0
