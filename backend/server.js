// =====================================================
// KALINAJAYA TOUR TRAVEL - BACKEND SERVER
// =====================================================
// Main entry point untuk Express API

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// =====================================================
// MIDDLEWARE SETUP
// =====================================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

// Request logging
app.use(morgan('combined'));

// Body parser middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// =====================================================
// ROUTES (akan ditambahkan nanti)
// =====================================================

// Test route - untuk cek apakah server running
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Kalinajaya Tour Travel API is running ✅',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// API Routes (akan di-uncomment setelah middleware dibikin)
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/tours', require('./routes/tours'));
// app.use('/api/bookings', require('./routes/bookings'));
// app.use('/api/payments', require('./routes/payments'));
// app.use('/api/admin', require('./routes/admin'));
// app.use('/api/users', require('./routes/users'));
// app.use('/api/reviews', require('./routes/reviews'));

// =====================================================
// ERROR HANDLING
// =====================================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
        path: req.path,
        method: req.method
    });
});

// Error handler middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message: message,
        ...(process.env.NODE_ENV === 'development' && { error: err.stack })
    });
});

// =====================================================
// SERVER STARTUP
// =====================================================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   🌴 KALINAJAYA TOUR TRAVEL API SERVER 🌴     ║
║                                                ║
║   ✅ Server running on: http://localhost:${PORT}   ║
║   📝 Environment: ${NODE_ENV}              ║
║   🗄️  Database: ${process.env.DB_NAME}         ║
║                                                ║
║   💡 Tip: Test dengan:                        ║
║   curl http://localhost:${PORT}/api/health         ║
║                                                ║
╚════════════════════════════════════════════════╝
    `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('❌ Unhandled Rejection:', err);
    process.exit(1);
});

module.exports = app;
