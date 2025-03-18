
const jwt = require('jsonwebtoken');
const secretKey = require('../routes/secret');  

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ error: 'Authorization token required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification failed:', error.message);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};


module.exports = authenticate;
