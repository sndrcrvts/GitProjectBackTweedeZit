const config = require('../../config');
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
    jwt.verify(token, config.secret, function(err, decoded) {
        if (err) next(err);
        req.decoded = decoded;
        next();
    });
}