const mongoose = require("mongoose");
const UserSchema = require("../schemas/user");
let User = mongoose.model('User', UserSchema, 'Users'); //model,schema,collection
module.exports = User;