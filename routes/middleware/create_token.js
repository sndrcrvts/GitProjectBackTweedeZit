const config = require('../../config');
const jwt = require("jsonwebtoken");

module.exports = (req,res,next) => {
    let token = jwt.sign({ id: req.body._id}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
    });

    res.status(200).send({ auth: true, token: token, user: {firstName: req.body.firstName,lastName: req.body.lastName,email: req.body.email}});
}