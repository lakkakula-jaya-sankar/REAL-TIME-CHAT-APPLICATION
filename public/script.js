const socket = io();

// Variables
const usernameInput = document.getElementById('username');
const registerBtn = document.getElementById('register');
const recipientInput = document.getElementById('reciever');
const inputMessage = document.getElementById('inputMessage');
const sendMessageBtn = document.getElementById('sendMessage');
const messagesList = document.getElementById('messages');
const registerContainer = document.getElementById('register-box');
const chatContainer = document.getElementById('chat-box');

// Display Chat-box when user is registered.
registerBtn.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  if (username) {
    socket.emit('register', username);
    registerContainer.style.display = 'none';
    chatContainer.style.display = 'block';
  }
});

// Send private message
sendMessageBtn.addEventListener('click', () => {
  const recipient = recipientInput.value.trim();
  const message = inputMessage.value.trim();
  if (recipient && message) {
    socket.emit('private message', { to: recipient, message });
    displayMessage(`You : ${message}`);
    inputMessage.value = '';
  }
});

// Receive private message
socket.on('private message', ({ from, message }) => {
  displayMessage(`${from}: ${message}`);
});

// Display messages
function displayMessage(msg) {
  const li = document.createElement('li');
  li.textContent = msg;
  messagesList.appendChild(li);
}

// Handle errors
socket.on('error', (errorMessage) => {
  alert(errorMessage);
});
