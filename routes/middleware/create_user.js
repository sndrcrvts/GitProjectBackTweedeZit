let User = require('../../data/models/user');

module.exports = (req,res,next) => {
    User.create(req.body,(err,user) =>{
        if(err) res.status(400).send(err);
        req.body = user;
        next()
    }); 
}