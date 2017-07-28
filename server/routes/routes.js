/*var userController = require('../controllers/user.server.controller.js');
var mongoose = require('mongoose');

module.exports = function(app){
    app.get('/something',function(req,res){
        res.send('buttholes!');
    });
    
    app.post('/posting',function(req,res){
        return userController.create(req,res);
    });
    
   /* app.get('/getting',function(req,res){
        
    });
};*/

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
        User.find(function(error,user){
            if(error){
                console.log('Error of ', error);
                res.send(error);
            } else {
                console.log('successful get');
                var users = [];
                for (var i = 0;i<user.length;i++){
                    if(user[i].username === req.params.username){
                        users.push(user[i]);
                    }
                }
                res.json(users);
            }
        });
    });
    
    //Create a new user
    app.post('/api/user',function(req,res){
        var usernameAlreadyExists = false;
        User.find(function(error,users){
            if(error){
                console.log(error);
                res.send(error);
            } else {
                for(var i = 0;i<users.length;i++){
                    if(users[i].username===req.body.username){
                        usernameAlreadyExists = true;
                    }
                }
            }
        }).then(function(){
            if(!usernameAlreadyExists){
                User.create({
                    username:req.body.username,
                    password:req.body.password,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname
                }, function(error,user){
                    if (error){
                        res.send(error);
                    } else {
                        User.find(function(error,users){
                            if(error) {
                                res.send(error)
                            } else {
                                var returnUsers = [];
                                for(var i=0;i<users.length;i++){
                                    if (users[i].username === req.body.username){
                                        returnUsers.push(users[i]);
                                    }
                                }
                                res.json(returnUsers);
                            }
                        })
                    }
                });
            } else {
                res.send("Username is not unique!");
        }});
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
}