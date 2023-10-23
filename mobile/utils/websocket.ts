import WebSocket from 'react-native-websocket';

const socket = new WebSocket('ws://localhost:8080');

socket.onopen = () => {
  console.log('WebSocket connected');
};

socket.onerror = (e) => {
    console.log('WebSocket error', e);
};

// When the backend api sends a message to the frontend, we can handle it here
socket.onmessage = (e) => {
  console.log('WebSocket message', e);
};

export default function checkWebSocketConnection() {
  return socket.readyState === WebSocket.OPEN;
}