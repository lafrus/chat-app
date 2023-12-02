const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chatRoomController');

// Route for creating a new chat room
router.post('/create', chatRoomController.createChatRoom);

// Route for joining an existing chat room
router.post('/join', chatRoomController.joinChatRoom);

// Route for leaving a chat room
router.post('/leave', chatRoomController.leaveChatRoom);

// Route to fetch list of chat rooms
router.get('/list', chatRoomController.getChatRooms);

module.exports = router;