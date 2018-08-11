const Comment = require('../../data/models/comment');

module.exports = (req,res,next) => {
    Comment.create(req.body,(err,comment) =>{
        if(err) res.status(400).send(err);
        res.status(200).send("Comment added from " + req.body.firstName + " " + req.body.lastName);
        console.log("Comment added from " + req.body.firstName + " " + req.body.lastName);
    }); 
}