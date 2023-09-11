const jwt = require('jsonwebtoken');
const config = require('../config');

function jwtMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'Access denied. Token missing.' });
  }

  // Split the Authorization header to get the token part
  const tokenParts = authHeader.split(' ');

  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Invalid token format.' });
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    
    console.log('Decoded Token:', decoded); // Add this line for debugging
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token.' });
  }
}

module.exports = jwtMiddleware;
