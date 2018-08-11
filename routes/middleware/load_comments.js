const Comment = require('../../data/models/comment');

module.exports = (req,res,next) => {
    Comment.find({'ecoplan':req.body.name, 'straat': req.body.street, 'nummer' : req.body.number }).sort({'time': 'desc'}).exec((err,data) => {
        if(err) next(err);
        req.comments = data;
        next();
    });
}