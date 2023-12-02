// server.js

const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB connection
const mongoURI = 'mongodb+srv://firasmat:Chadlia@gmail.com23@cluster0.wal9zk8.mongodb.net/';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listener for successful MongoDB connection
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

// Event listener for MongoDB connection error
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import React, { useState } from 'react';
import socket from '../socket';

const MessageForm = ({ room }) => {
  const [message, setMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (message) {
      socket.emit('chatMessage', { content: message, room });
      setMessage('');
    }
  };

  return (
    <form onSubmit={sendMessage}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        required
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default MessageForm;