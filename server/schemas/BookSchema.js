var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    title: {type:String, required:true},
    authorId: {type:Schema.ObjectId, ref:'User', required:true},
    rating: Number,
    createDate: {type:Date, default:Date.now},
},{collection: 'Book'});

module.exports = mongoose.model('Book',BookSchema);