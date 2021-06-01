'use stric';

const socket = io();

socket.on('front', payload => {
  console.log(`here is your : ${payload}`);
});
// $('#video')[0].contentWindow.postMessage(
//   '{"event":"command","func":"' + 'playVideo' + '","args":""}',
//   '*',
//   console.log('ready to play')
// );

$('#play').click(function (e) {
  e.preventDefault();
  console.log('i exist');
  socket.emit('play');
});
$('#stop').click(function (e) {
  e.preventDefault();
  socket.emit('stop');
});
$('#pause').click(function (e) {
  e.preventDefault();
  socket.emit('pasue');
});

/*********** FORM *********/
$('#song__form').submit(function (e) {
  e.preventDefault();
  let x = e.target.song.value;
  console.log(x);
});

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
