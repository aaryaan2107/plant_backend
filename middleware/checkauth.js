const jwt = require('jsonwebtoken');
const secretKey = 'userdata@12#45';


module.exports = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {

      return res.status(401).json({ success: false, message: 'Token invalid' });
    
    }
    req.userId = decoded.userId;
    req.role = decoded.role;
    
    next();
  });
};
