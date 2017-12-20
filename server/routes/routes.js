module.exports = function(app){
    require('./User.js')(app);
    require('./Book.js')(app);
    require('./Page.js')(app);
};
