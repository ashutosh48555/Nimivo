import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    socket = io(window.location.origin, {
      path: '/socket.io',
      autoConnect: false,
      transports: ['websocket', 'polling'],
    });
  }
  return socket;
};

export const connectSocket = (token: string) => {
  const s = getSocket();
  s.auth = { token };
  s.connect();
  return s;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Event names
export const SOCKET_EVENTS = {
  // Server → Client
  BOOKING_CONFIRMED: 'booking:confirmed',
  PROVIDER_ASSIGNED: 'booking:provider_assigned',
  PROVIDER_LOCATION: 'provider:location_update',
  ETA_UPDATE: 'booking:eta_update',
  STATUS_CHANGE: 'booking:status_change',
  NOTIFICATION: 'notification',

  // Client → Server
  JOIN_BOOKING: 'booking:join',
  LEAVE_BOOKING: 'booking:leave',
  UPDATE_LOCATION: 'provider:update_location',
} as const;
