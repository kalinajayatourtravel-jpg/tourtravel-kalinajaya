# 🌴 Kalinajaya Tour Travel - Setup Guide

## 📋 Daftar Isi
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Database Setup](#database-setup)
4. [Backend Setup](#backend-setup)
5. [Frontend Setup](#frontend-setup)
6. [Running the Application](#running-the-application)
7. [API Documentation](#api-documentation)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Pastikan Anda sudah menginstall:
- **Node.js** v16 atau lebih baru
- **npm** atau **yarn**
- **MySQL Server** v5.7 atau lebih baru
- **Git**

### Verifikasi Instalasi
```bash
node --version
npm --version
mysql --version
git --version
```

---

## Installation

### 1. Clone Repository
```bash
git clone https://github.com/kalinajayatourtravel-jpg/tourtravel-kalinajaya.git
cd tourtravel-kalinajaya
```

### 2. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

---

## Database Setup

### 1. Create Database
```bash
mysql -u root -p < ../database/schema.sql
```

Atau manual di MySQL:
```bash
mysql -u root -p
```

```sql
CREATE DATABASE tourtravel_kalinajaya;
USE tourtravel_kalinajaya;
SOURCE database/schema.sql;
```

### 2. Verify Database
```sql
USE tourtravel_kalinajaya;
SHOW TABLES;
```

---

## Backend Setup

### 1. Configure Environment Variables

Buka `backend/.env.example` dan copy ke `backend/.env`:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` dengan config Anda:

```env
PORT=5000
NODE_ENV=development

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=tourtravel_kalinajaya
DB_PORT=3306

JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

MIDTRANS_SERVER_KEY=your_midtrans_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_ENV=sandbox

FRONTEND_URL=http://localhost:3000
```

### 2. Test Backend Connection
```bash
npm run dev
```

Buka browser ke: `http://localhost:5000/api/health`

Output yang diharapkan:
```json
{
  "status": "OK",
  "message": "Kalinajaya Tour Travel API is running ✅",
  "timestamp": "2024-06-30T10:30:45.123Z",
  "environment": "development"
}
```

---

## Frontend Setup

### 1. Configure Environment Variables

```bash
cd frontend
cp .env.example .env
```

Edit `frontend/.env`:

```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_BASE_URL=http://localhost:3000
REACT_APP_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
REACT_APP_APP_NAME=Kalinajaya Tour Travel
```

### 2. Install Dependencies
```bash
npm install
```

---

## Running the Application

### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```

Output yang diharapkan:
```
╔════════════════════════════════════════════════╗
║   🌴 KALINAJAYA TOUR TRAVEL API SERVER 🌴     ║
║   ✅ Server running on: http://localhost:5000 ║
║   📝 Environment: development                  ║
║   🗄️  Database: tourtravel_kalinajaya         ║
╚════════════════════════════════════════════════╝
```

### Terminal 2 - Frontend Development Server
```bash
cd frontend
npm start
```

Browser akan otomatis terbuka ke `http://localhost:3000`

---

## API Documentation

### Base URL
```
http://localhost:5000/api
```

### Health Check
```bash
GET /health
```

### Authentication Routes (Soon)
```bash
POST /auth/register
POST /auth/login
POST /auth/logout
GET /auth/me
```

### Tours Routes (Soon)
```bash
GET /tours
GET /tours/:id
POST /tours (admin only)
PUT /tours/:id (admin only)
DELETE /tours/:id (admin only)
```

### Bookings Routes (Soon)
```bash
GET /bookings
GET /bookings/:id
POST /bookings
PUT /bookings/:id
DELETE /bookings/:id
```

---

## Project Structure

```
tourtravel-kalinajaya/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── auth.js
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .env.example
├── database/
│   └── schema.sql
├── docs/
│   └── SETUP.md
└── README.md
```

---

## Troubleshooting

### Problem: MySQL Connection Error
**Solution:**
1. Pastikan MySQL Server sudah running
2. Check credentials di `.env` file
3. Verify database sudah dibuat

### Problem: Port 5000 Already in Use
**Solution:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process (Linux/Mac)
kill -9 <PID>

# Or change PORT di .env ke 5001
```

### Problem: NPM Dependencies Error
**Solution:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

### Problem: CORS Error
**Solution:**
- Check `FRONTEND_URL` di backend `.env`
- Make sure URL match dengan frontend URL

---

## Development Tips

### Hot Reload (Backend)
Backend sudah menggunakan `nodemon` untuk auto-reload saat file berubah.

### Hot Reload (Frontend)
React development server otomatis hot-reload.

### Testing API
Gunakan tools seperti:
- Postman
- Insomnia
- curl

---

## Production Deployment

Untuk production, perhatikan:
1. Set `NODE_ENV=production`
2. Use strong `JWT_SECRET`
3. Enable HTTPS
4. Setup proper database backups
5. Configure proper CORS

---

## Support & Contact

- **Email:** kalinajayatourtravel@gmail.com
- **Phone:** +62-XXX-XXXX-XXXX
- **GitHub:** https://github.com/kalinajayatourtravel-jpg

---

**Happy Coding! 🚀**
