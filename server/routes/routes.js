var User = require('../schemas/UserSchema.js');
var Book = require('../schemas/BookSchema.js');

module.exports = function(app){
    /*
    ---------------------------------------------------------------------------
    
    User Related API
    
    ---------------------------------------------------------------------------
    */
    
    //Get all users
    app.get('/api/user',function(req,res){
        User.find(function(error,user){
            if (error){
                res.send(error);
            } else {
                var users = [];
                for(var i = 0;i<user.length;i++){
                    users.push(user[i]);
                }
                res.json(users);
            }
        })
    });
    
    //Get user by username
    app.get('/api/user/:username',function(req,res){
        findUserByUsername(req.params.username).then(function(data){
            res.json(data);
        },function(error){
            handleError(error);
        });
    });
    
    //Create a new user
    app.post('/api/user',function(req,res){
        findUserByUsername(req.body.username).then(function(data){
            if(data.length<1){
                User.create({
                    username:req.body.username,
                    password:req.body.password,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname
                }, function(error,user){
                    if (error){
                        res.send(error);
                    } else {
                        findUserByUsername(user.username).then(function(u){
                            res.json(u);
                        },function(error){
                            handleError(error);
                        });
                    }
                });
            } else {
                console.log(data);
                res.send("User already exists");
            }
        });
    });
    
    /*
    ---------------------------------------------------------------------------
    
    Book Related API
    
    ---------------------------------------------------------------------------
    */
    
    //get all books... not sure why anyone would do this, it'd be a huge number
    app.get('/api/book',function(req,res){
        Book.find(function(error,books){
            if(error){
                res.send(error);
            } else {
                var getValues = [];
                for (var i = 0;i<books.length;i++){
                    getValues.push(books[i]);
                }
                res.json(getValues);
            }
        });
    });
    
    //get all books by an author's username
    app.get('/api/book/:username',function(req,res){
        User.find(function(error,books){
            if (error) {
                res.send(error);
            } else {
                var authorBooks = [];
                for (var i = 0;i<books.length;i++) {
                    if (books[i].author.username===req.params.username){
                        authorBooks.push(books[i]);
                    }
                }
                res.json(authorBooks);
            }
        });
    });
    
    app.post('/api/book/:username',function(req,res){
        console.log(User.find({username:req.params.username}).select("username"));
        Book.create({
            title:req.body.title,
            author:User.find({username:req.params.username},function(error,users){
                if(error){
                    res.send(error);
                }
            })._id,
            pages:req.body.pages,
            length:req.body.pages.length
        },function(error,book){
            if(error){
                res.send(error);
            } else {
                res.json(book);
            }
        });
    });
    /*
    ---------------------------------------------------------------------------
    
    Non API methods
    
    ---------------------------------------------------------------------------
    */
    
    var findUserByUsername = function(uname){
        var query = User.find({username:uname});  //usernames should be unique, therefore findOne should always get the desired user
        return query.exec(function(error,doc){
            if(error){
                console.log(error);
            } 
        });
    }
    
    app.post('/api/wtf',function(req,res){
        findUserByUsername(req.body.username).then(function(data){
            if(data===null){
                console.log("poop");
            } else {
                console.log(data);
            }
        },function(error){
            console.log("wtfm8 error, dis y: " + error);
        });
    });
    
    var handleError = function(error){
        console.log("Error: " + error);
    }
}