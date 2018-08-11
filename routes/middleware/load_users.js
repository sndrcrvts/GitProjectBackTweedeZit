const User = require('../../data/models/user');

module.exports = (req,res,next) => {
    User.find({}).select("firstName lastName").exec((err,data) => {
        if(err) next(err);
        req.users = data;
        next();
    });
}