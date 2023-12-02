import React, { useState } from 'react';

function CreateChatRoomForm({ onCreate }) {
  const [roomName, setRoomName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(roomName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Enter chat room name"
        required
      />
      <button type="submit">Create Chat Room</button>
    </form>
  );
}

export default CreateChatRoomForm;