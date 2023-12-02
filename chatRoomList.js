import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://yourbackendserver.com';
const socket = socketIOClient(ENDPOINT);

function ChatRoomList() {
  const [chatRooms, setChatRooms] = useState([]);

  useEffect(() => {
    fetch(`${ENDPOINT}/chatRooms/list`)
      .then((response) => response.json())
      .then((data) => {
        setChatRooms(data);
      });

    socket.on('updateRoomList', (updatedList) => {
      setChatRooms(updatedList);
    });

    // Clean up the effect
    return () => socket.disconnect();
  }, []);

  const handleJoin = (roomId) => {
    // Logic to join a chat room...
  };

  const handleLeave = (roomId) => {
    // Logic to leave a chat room...
  };

  return (
    <div>
      {chatRooms.map((room) => (
        <div key={room.id}>
          {room.name}
          <button onClick={() => handleJoin(room.id)}>Join</button>
          <button onClick={() => handleLeave(room.id)}>Leave</button>
        </div>
      ))}
    </div>
  );
}

export default ChatRoomList;