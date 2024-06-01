const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, 'mySecretKeyForJWTSigning');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
