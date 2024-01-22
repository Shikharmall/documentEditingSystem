// collaborative-doc-editor/src/components/TextEditor.js
import React, { useState, useEffect } from 'react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client';

const socket = io('http://localhost:5000'); // Replace with your server URL

const TextEditor = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    // Listen for text updates from the server
    socket.on('text-update', (data) => {
      setText(data);
    });

    return () => {
      socket.off('text-update');
    };
  }, []);

  const handleTextChange = (content, _, source) => {
    if (source === 'user') {
      // Send text updates to the server
      socket.emit('text-update', content);
    }
  };

  return <Quill value={text} onChange={handleTextChange} />;
};

export default TextEditor;
