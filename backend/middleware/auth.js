// JWT Authentication Middleware

const jwt = require('jsonwebtoken');

// Middleware untuk verify JWT token
const authMiddleware = (req, res, next) => {
    try {
        // Get token dari header
        const token = req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user ke request
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
            error: error.message
        });
    }
};

// Middleware untuk verify admin role
const adminMiddleware = (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access only'
            });
        }

        next();
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: 'Access denied',
            error: error.message
        });
    }
};

// Function untuk generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
};

module.exports = {
    authMiddleware,
    adminMiddleware,
    generateToken
};
