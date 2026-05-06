import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

function Chat() {
  const { orderId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000);
    return () => clearInterval(interval);
  }, [orderId]);

  const loadMessages = async () => {
    try {
      const response = await api.get(`/tailors/messages/${orderId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await api.post('/tailors/messages', {
        order: { id: orderId },
        sender: { id: user.id },
        content: newMessage
      });
      setNewMessage('');
      loadMessages();
    } catch (error) {
      alert('Failed to send message');
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '20px' }}>
      <h2>Chat - Order #{orderId}</h2>
      
      <div style={{ border: '1px solid #ddd', height: '400px', overflowY: 'scroll', padding: '10px', marginBottom: '20px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{
            textAlign: msg.sender.id === user.id ? 'right' : 'left',
            margin: '10px 0'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '10px',
              borderRadius: '8px',
              background: msg.sender.id === user.id ? '#007bff' : '#e9ecef',
              color: msg.sender.id === user.id ? 'white' : 'black'
            }}>
              <strong>{msg.sender.name}</strong>
              <p style={{ margin: '5px 0' }}>{msg.content}</p>
              <small>{new Date(msg.sentAt).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: 'flex' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '10px', border: '1px solid #ddd' }}
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#007bff', color: 'white', border: 'none' }}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
