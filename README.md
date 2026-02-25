# 🏛️ Nimivo — India's Guild of Home Professionals

Nimivo is India's first **provider-first home services marketplace** where customers post jobs, verified professionals bid competitively, and the customer picks the best offer.

Built with production-grade scalability and real-time bidding in mind.

---

## 🚀 Problem Statement

Traditional service booking platforms operate on scheduled slots and lack real-time dispatching. Users often face:

- Delayed responses
- Unverified providers
- No real-time tracking
- No transparent ETA

Nimivo solves this by implementing a **Competitive Bidding System** where verified providers compete for each job, giving customers choice, fair pricing, and quality accountability.

---

## 🎯 Core Features

- 🔐 Secure Authentication (Clerk)
- 📍 Real-time provider geo-matching (PostGIS)
- ⚡ Instant booking within 5 clicks
- 🛰 Live tracking via WebSockets
- ⏱ Dynamic ETA calculation
- 💳 Secure payment integration (Stripe)
- 📜 Booking history & invoice generation
- ⭐ Rating & review system

---

## 🏗 System Architecture

User → API → Redis (availability check)  
→ PostgreSQL + PostGIS (geo-query)  
→ Provider Assignment  
→ WebSocket updates  
→ Background Queue Monitoring  

---

## 🧠 Proximity-First Matching Algorithm

1. User clicks "Book Now"
2. Backend queries providers within radius using PostGIS
3. Nearest idle provider is assigned
4. If no acknowledgment within 60 seconds → fallback to next nearest
5. ETA locked using Maps API
6. Real-time tracking begins

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend
- Node.js
- TypeScript
- Socket.io

### Database
- PostgreSQL
- PostGIS (Geo-spatial indexing)

### Payments
- Stripe / Razorpay

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge\&logo=react\&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge\&logo=typescript\&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge\&logo=nodedotjs\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge\&logo=postgresql\&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge\&logo=redis\&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge\&logo=socketdotio\&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge\&logo=stripe\&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge\&logo=razorpay\&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge\&logo=tailwind-css\&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-3A86FF?style=for-the-badge)

---

## 📊 Database Design (Core Tables)

- users
- providers
- services
- bookings
- payments
- reviews

Geo-location stored using PostGIS `GEOGRAPHY(Point)` type.

---

## 🔄 Real-Time Flow

- Provider location updates every 3–5 seconds
- WebSocket broadcast to active users
- Redis used for temporary booking locks
- Queue handles timeout reassignment


---

## 📈 Performance Goals

- Booking match time < 300ms
- 99.9% uptime
- Handles 1000+ concurrent booking requests

---

## 🔐 Security

- Clerk Auth
- Role-based access control (User / Provider / Admin)
- HTTPS enforced
- Input validation & sanitization
- Rate limiting

---

## 📌 Future Improvements

- AI-based demand prediction
- Surge pricing model
- Provider performance scoring
- Multi-city clustering architecture
- Microservices migration

---

## Connect with us on

[![Website](https://img.shields.io/badge/Website-nimivo.com-orange?style=for-the-badge\&logo=google-chrome)](https://nimivo.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-@nimivo-0A66C2?style=for-the-badge\&logo=linkedin)](www.linkedin.com/in/nimivo)
[![Twitter](https://img.shields.io/badge/X-@nimivo-black?style=for-the-badge\&logo=x)](https://x.com/nimivo_official)
[![YouTube](https://img.shields.io/badge/YouTube-@nimivo-DC382D?style=for-the-badge\&logo=YouTube)]([https://x.com/nimivo_official](https://www.youtube.com/@Nimivo_official))
[![Instagram](https://img.shields.io/badge/Instagram-@nimivo-E4405F?style=for-the-badge\&logo=instagram\&logoColor=white)](https://www.instagram.com/nimivo_official)
