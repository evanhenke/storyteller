var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pageSchema = new Schema({
    bookId:{
        type:Schema.ObjectId,
        ref:"Book",
        required:true
    },
    pageNumber:{
        type:Number,
        required:true,
        min:1
    },
    text:{
        type:String,
        required:true,
        match:[
            "[a-zA-Z0-9!@#$%^&*_+=\"'-]",
            "Pages only allows letters, numbers, and the following characters: !,@,#,$,%,^,&,*,_,+,=,-,\", and '"
        ]
    },
    createDate:{
        type:Date,
        default:Date.now
    }
},{collection:"Page"});

pageSchema.statics.findById = function(id){
    return this.findOne({_id:id},
        function(error){
            console.log(error);
        });
};

pageSchema.statics.findByBookId = function(bookId){
    return this.find({bookId:bookId},
        function(error){
            console.log(error);
        });
};

module.exports = mongoose.model('Page',pageSchema)
