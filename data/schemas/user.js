const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;


let UserSchema =  new mongoose.Schema({
    firstName: { type: String, index: true },
    lastName: { type: String, unique: true },
    password: {type: String, required:true},
    email: {
        type: String,
        required: false,
        match: /.+\@.+\..+/
    }
});


UserSchema.pre('save',function(next) {
    var user = this;
    if (!user.isModified("password")) return next();
    bcrypt.genSalt(saltRounds, function(err, salt) {
        if(err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = UserSchema;