const User = require('../../data/models/user');

module.exports = (req,res,next) => {
    User.findOne({email: req.body.email},function(err,user){
        if(err) return next(err);
        if(!user) return res.status(404).send();
        
        user.comparePassword(req.body.password,(err,match) => {
            if(err) return next(err);
            if(match == false){
                return res.status(400).send({auth:false,message: "Password incorrect"});
                next();
            }

            req.body = user;
            next();
        })
    });
}