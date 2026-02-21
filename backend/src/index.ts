import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { config } from './config/env.js';

import authRoutes from './routes/auth.js';
import serviceRoutes from './routes/services.js';
import bookingRoutes from './routes/bookings.js';
import providerRoutes from './routes/provider.js';
import adminRoutes from './routes/admin.js';

const app = express();
const httpServer = createServer(app);

// Socket.IO
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/provider', providerRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on('booking:join', (bookingId: string) => {
    socket.join(`booking:${bookingId}`);
  });

  socket.on('booking:leave', (bookingId: string) => {
    socket.leave(`booking:${bookingId}`);
  });

  socket.on('provider:update_location', (data: { bookingId: string; latitude: number; longitude: number }) => {
    io.to(`booking:${data.bookingId}`).emit('provider:location_update', {
      latitude: data.latitude,
      longitude: data.longitude,
    });
  });

  socket.on('disconnect', () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

// Make io accessible to routes if needed
app.set('io', io);

// Start server
httpServer.listen(config.port, () => {
  console.log(`
  🏛️  CraftGuild Backend running
  → Port:    ${config.port}
  → Mode:    ${config.nodeEnv}
  → Health:  http://localhost:${config.port}/api/health
  `);
});

export { app, io };
