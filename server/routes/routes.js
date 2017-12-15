var User = require('../schemas/UserSchema.js');
var Book = require('../schemas/BookSchema.js');
var Page = require('../schemas/PageSchema.js');

module.exports = function(app){
    /*
    ---------------------------------------------------------------------------

    User Related API

    ---------------------------------------------------------------------------
    */

    //Get all users. Why ever use this?
    app.get('/api/user',function(req,res){
        User.find(function(error,users){
            if (error){
                res.send(error);
            } else {
                res.json(users);
            }
        })
    });

    //Get user by username
    app.get('/api/user/:username',function(req,res){
        User.findByUsername(req.params.username).then(function(user){
            res.json(user);
        },function(error){
            handleError(error);
        });
    });

    //Create a new user
    app.post('/api/user',function(req,res){
                User.create({
                    username:req.body.username,
                    password:req.body.password,
                    firstname:req.body.firstname,
                    lastname:req.body.lastname
                }, function(error,user){
                    if (error){
                        res.send(error);
                    } else {
                        User.findByUsername(user.username).then(function(u){
                            res.json(u);
                        },function(error){
                            handleError(error);
                        });
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
                res.json(books);
            }
        });
    });

    //get all books by an author's username
    app.get('/api/book/:username',function(req,res){
        User.findByUsername(req.params.username)
            .then(function(user){
                Book.findByAuthorId(user._id).then(function(books){
                    res.json(books);
                },function(error){
                    handleError(error,res);
                });
            },function(error){
                handleError(error,res);
            });
    });

    app.post('/api/book',function(req,res){
        User.findByUsername(req.body.username).then(function(author){
            Book.create({
                title:req.body.title,
                authorId:author._id,
                rating:req.body.rating,
            },function(error,book){
                if(error){
                    handleError(error);
                } else {
                    res.json(book);
                }
            });
        },function(error){
            handleError(error);
        });
    });

    /*
    ---------------------------------------------------------------------------

    Page Related API

    ---------------------------------------------------------------------------
    */
    app.get('/api/book/:id/pages',function(req,res){
        Page.findByBookId(id)
            .then(function(book){
                res.json(book);
            },function(error){
                handleError(error,res);
            });
    });

    app.post('/api/book/pages',function(req,res){
        Book.findById(req.body.id)
            .then(function(book){
                Page.findByBookId(book._id)
                    .then(function(pages){
                        Page.create({
                            bookId:book._id,
                            pageNumber:pages.length+1,
                            text:req.body.pageText
                        },function(error,newPage){
                            if(error){
                                handleError(error,res);
                            } else {
                                res.json(newPage);
                            }
                        });
                    },function(error){
                        handleError(error,res);
                    });
            },function(error){
                handleError(error,res);
            });
        });

    /*
    ---------------------------------------------------------------------------

    Non API methods

    ---------------------------------------------------------------------------
    */

    var handleError = function(error){
        console.log("Error: " + error);
    };

    var handleError = function(error,responseObject){
        handleError(error);
        responseObject.send(error);
    };
}
