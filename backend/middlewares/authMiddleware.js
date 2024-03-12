var jwt = require('jsonwebtoken');
var authMiddleware = function(req, res, next) {
  var authHeader = req.header('Authorization');
  var token = authHeader ? authHeader.replace('Bearer ', '') : null;

  if (!token) {
    return res.status(401).json({ success: false, message: 'Authentication failed. Token not provided.' });
  }

  try {
    var decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.id = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Authentication failed. Invalid token.' });
  }
};

module.exports = authMiddleware;