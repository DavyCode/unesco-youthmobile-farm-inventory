var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');


var UserSchema = new mongoose.Schema({
    password  :  String,
    department : String,
    username: String
    // ,
    // admin : String
});


UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', UserSchema);