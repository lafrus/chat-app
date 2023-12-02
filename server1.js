const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('a user connected');
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  
  // More event listeners can be defined here
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  room: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

io.on('connection', (socket) => {
    socket.on('joinRoom', (room) => {
      socket.join(room);
    });
    
    socket.on('chatMessage', (msg) => {
      const message = new Message(msg);
      message.save().then(() => {
        io.to(msg.room).emit('message', message);
      });
    });
  });

  import io from 'socket.io-client';
const socket = io(ENDPOINT); // Where ENDPOINT is your server location

socket.emit('joinRoom', YOUR_ROOM);

socket.on('message', (message) => {
  // Display the message
});