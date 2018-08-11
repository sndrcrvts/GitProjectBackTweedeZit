// data/schemas/comment.js
const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    comment: { type: String },
    time: {type:Date, 'default':Date.now },
    ecoplan: { type: String },
    straat: { type: String },
    nummer: { type: Number }
});
