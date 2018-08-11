const mongoose = require("mongoose");
const CommentSchema = require("../schemas/comment");
let Comment = mongoose.model('Comment',CommentSchema, 'Comments');
module.exports = Comment;