var User = require('../schemas/UserSchema.js');
var Book = require('../schemas/BookSchema.js');
var Page = require('../schemas/PageSchema.js');

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
        findUserByUsername(req.params.username)
            .then(function(data){
                Book.find({authorId:data._id}).exec(function(error,response){
                    if(error){
                        handleError(error);
                    } else {
                        console.log("req.params.username: " + req.params.username);
                        console.log("data: " + data);
                        console.log("response: " +  response);
                        res.json(response);
                    }
                });
            },function(error){
                handleError(error);
            });
    });
    
    app.post('/api/book/:username',function(req,res){
        findUserByUsername(req.params.username).then(function(data){
            console.log(data);
            Book.create({
                title:req.body.title,
                authorId:data[0]._id,
                rating:req.body.rating,
            },function(error,book){
                if(error){
                    handleError(error);
                } else {
                    res.json(book);
                }
            })
        },function(error){
            handleError(error);
        });
    });
    
    /*
    ---------------------------------------------------------------------------
    
    Page Related API
    
    ---------------------------------------------------------------------------
    */
    app.get('/api/book/pages/:id',function(req,res){
        Page.find({bookId:req.params.id},function(error,pages){
            if(error){
                handleError(error,res);
            } else {
                var array = [];
                for (var i = 0;i<pages.length;i++){
                    array.push(pages[i]);
                }
                res.send(array);
            }
        });
    });
    
    app.post('/api/book/pages',function(req,res){
        findBookById(req.body.bookid).then(function(data){
            res.send(data);
        },function(error){
            handleError(error,res);
        });
        /*
        Book.find({bookId:req.body.id},function(error,pages){
            if(error){
                handleError(error,res);
            }
            console.log(pages);
        }).then(function(data){
            Page.create({
                bookId:req.body.id,
                pageNumber:pages.length+1,
                text:req.body.text
            },function(error,page){
                if(error){
                    handleError(error,res);
                } else {
                    res.json(page);
                }
            })
        },function(error){
            handleError(error,res);
        });*/
    });
    
    /*
    ---------------------------------------------------------------------------
    
    Non API methods
    
    ---------------------------------------------------------------------------
    */
    
    var findUserByUsername = function(uname){
        var query = User.find({username:uname});
        return query.exec(function(error,doc){
            if(error){
                console.log(error);
            } 
        });
    };
    
    var findUserById = function(id){
        var query = User.find({_id:id});
        return query.exec(function(error,doc){
            if(error){
                handleError(error);
            }
        });
    };
    
    var findBookById = function(id){
        var query = Book.find({_id:id});
        return query.exec(function(error){
            if(error){
                handleError(error);
            }
        });
    };
    
    var handleError = function(error){
        console.log("Error: " + error);
    };
    
    var handleError = function(error,responseObject){
        handleError(error);
        responseObject.send(error);
    };
}