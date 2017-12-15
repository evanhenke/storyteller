var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
    username: {
        type:String,
        maxlength:30,
        required:true,
        unique:true,
        uniqueCaseInsensitive:true,
        match:[
            "[a-zA-Z0-9]",
            "Username only allows letters and numbers!"
        ]
    },
    password: {
        type:String,
        required:true,
        maxlength:30,
        minlength:8,
        match:[
            "[a-zA-Z0-9!@#$%^&*_+=-]",
            "Password only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,- "
        ]
    },
    firstName: {
        type:String,
        required:true,
        match:[
            "[a-zA-Z]",
            "First name only allows letters!"
        ]
    },
    lastName: {
        type:String,
        required:true,
        match:[
            "[a-zA-Z]",
            "Last name only allows letters!"
        ]
    },
    createDate: {
        type: Date,
        default:Date.now
    }
},{collection:'User'});

userSchema.plugin(uniqueValidator);

userSchema.statics.findByUsername = function(username){
    return this.findOne({username:username},
        function(error){
            console.log(error);
        });
};

userSchema.statics.findById = function(id){
    return this.findOne({_id:id},
        function(error){
            console.log(error);
        });
};

module.exports = mongoose.model('User', userSchema);
