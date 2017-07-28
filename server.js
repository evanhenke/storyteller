var express = require('express');
var path = require('path');
var app = express();
var rootPath = path.normalize(__dirname);
var mongoose = require('mongoose');
var port = 3030;
var bodyParser = require('body-parser');


mongoose.connect('mongodb://localhost/app');
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('connected to mongodb!');
});

app.use(express.static(rootPath + '/public'));
app.use(bodyParser.urlencoded({
   extended: true
}));

app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));


/*
app.get('/users',function(req,res){
    mongoose.model('User').find(function(err,users){
        res.send(users);
    });
});*/

require('./server/routes/routes.js')(app);
app.listen(port);

console.log('Listening on port ' + port);