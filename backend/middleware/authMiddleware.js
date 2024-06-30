const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ message: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Bearer <token>

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    // const userId = {id: decoded.id}
    // console.log(userId);
    next();
  } catch (error) {
    res.status(400).send({ message: 'No Authorization, Please Sign in.' });
  }
};

module.exports = authMiddleware;
