/////////////////////////////////////
//////////connect app.js ///////////
///////////////////////////////////
'use strict';
// const socket = io();
const socket = io('http://localhost:3000')
socket.on('front', payload => {
    console.log(`here is your : ${payload}`);
  });
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const name = prompt('What is your name?')
appendMessage('You joined')
socket.emit('new-user', name)
socket.on('chat-message', data => {
  appendMessage(`${data.name}: ${data.message}`)
})
socket.on('user-connected', name => {
  appendMessage(`${name} connected`)
})
socket.on('user-disconnected', name => {
  appendMessage(`${name} disconnected`)
})
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})
appendMessage
function appendMessage(message) {
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}