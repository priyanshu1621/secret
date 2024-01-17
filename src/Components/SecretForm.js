// SecretForm.js
import React, { useState } from 'react';
import axios from 'axios';

const SecretForm = ({ userId, onSecretPosted }) => {
  const [secretMessage, setSecretMessage] = useState('');

  const postSecret = async () => {
    try {
      await axios.post('/secrets/post-secret', { userId, secretMessage });
      onSecretPosted();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <textarea value={secretMessage} onChange={(e) => setSecretMessage(e.target.value)} />
      <button onClick={postSecret}>Post Secret</button>
    </div>
  );
};

export default SecretForm;
