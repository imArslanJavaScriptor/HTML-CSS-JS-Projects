const socket = io();

// Elements
const chatMessages = document.getElementById("chat-messages");
const messageInput = document.getElementById("message-input");
const sendButton = document.getElementById("send-button");

// Function to display messages
const appendMessage = (message, type = "other") => {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.innerText = message;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

// Event: Send message
sendButton.addEventListener("click", () => {
  const message = messageInput.value.trim();
  if (message) {
    appendMessage(message, "me"); // Show message on sender's side
    socket.emit("chatMessage", message); // Send message to server
    messageInput.value = "";
  }
});

// Event: Receive message
socket.on("chatMessage", (message) => {
  appendMessage(message, "other"); // Show message on recipient's side
});
