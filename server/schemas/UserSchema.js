var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: {type:String,required:true},
    password: {type:String,required:true},
    firstName: String,
    lastName: String,
    createDate: {type: Date, default:Date.now}
},{collection:'User'});

module.exports = mongoose.model('User', userSchema);