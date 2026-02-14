import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

function SocketTest() {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to Socket.io server
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    // Listen for connection
    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.io server');
      setConnected(true);
      setMessages(prev => [...prev, '✅ Connected to server']);
    });

    // Listen for test responses
    newSocket.on('test-response', (data) => {
      console.log('📨 Received from server:', data);
      setMessages(prev => [...prev, `📨 Server: ${data.message}`]);
    });

    // Listen for disconnection
    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.io server');
      setConnected(false);
      setMessages(prev => [...prev, '❌ Disconnected from server']);
    });

    // Cleanup on unmount
    return () => {
      newSocket.close();
    };
  }, []);

  const sendTestMessage = () => {
    if (socket) {
      const message = `Test message at ${new Date().toLocaleTimeString()}`;
      socket.emit('test-message', message);
      setMessages(prev => [...prev, `📤 Sent: ${message}`]);
    }
  };

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#1a1f36',
      borderRadius: '8px',
      margin: '20px',
      color: '#fff'
    }}>
      <h3>Socket.io Connection Test</h3>
      <p>Status: {connected ? '🟢 Connected' : '🔴 Disconnected'}</p>
      
      <button 
        onClick={sendTestMessage}
        disabled={!connected}
        style={{
          padding: '10px 20px',
          backgroundColor: connected ? '#6c9eff' : '#666',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: connected ? 'pointer' : 'not-allowed',
          fontSize: '14px',
          marginTop: '10px'
        }}
      >
        Send Test Message
      </button>

      <div style={{
        marginTop: '15px',
        padding: '15px',
        backgroundColor: '#0d1117',
        borderRadius: '5px',
        maxHeight: '200px',
        overflowY: 'auto'
      }}>
        <p style={{ color: '#8b949e', fontSize: '12px', marginBottom: '10px' }}>Messages:</p>
        {messages.map((msg, index) => (
          <p key={index} style={{ fontSize: '12px', color: '#c9d1d9', margin: '5px 0' }}>
            {msg}
          </p>
        ))}
      </div>
    </div>
  );
}

export default SocketTest;
