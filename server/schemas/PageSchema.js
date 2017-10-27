var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    bookId:{type:Schema.ObjectId, ref:"Book", required:true},
    pageNumber:{type:Number, required:true},
    text:{type:String, required:true},
    createDate:{type:Date, default:Date.now}
},{collection:"Page"});

module.exports = mongoose.model('Page',pageSchema)