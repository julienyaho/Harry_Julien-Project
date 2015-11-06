var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/primary',routes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
/*
var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('localhost',27017, {auto_reconnect: true});
var db = new Db('schools', server);

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

app.use('/show',routes);

var data;

db.open(function(err, db) {
  if(!err) {
    console.log("We are connected");
    db.collection('primaryschool', function(err, collection){

            collection.find().toArray(function(error, bars){
             console.log(bars);

          }
      );
    //  collection.find({id:1}).toArray(function(error, bars){console.log(bars);});
      //collection.findOne({Address4:null}, function(error, bar){console.log(bar)});
    });
  }
});
/*

app.post('/primaryschool',
    function (req, res){
      var primaryschoolId =  (req.body.id) ? req.body.id : 0;
      db.serialize(function(){
        db.each(
            "db.primaryschool.find({id="+ primaryschoolId+"}) " ,
            function(err, row) {
              var primaryschool  = new primaryschool(
                  row._id , row.Organisation, row.Name, row.Address1, row.Address2, row.Address3, row.Address4, row.ITMEast, row.ITMNorth );


              if (typeof(row) == "object"){
                return res.json(primaryschool);
              }
              else{
                return res.json("Error");
              }

            });

      });
    }
);

app.get('/GET/:primaryschoolID',
    function (req, res){
      var primaryschoolId = (req.params.primaryschoolID) ? req.params.primaryschoolID :  req.body.id;

      db.serialize(function(){
        db.each(
            "db.primaryschool.find({id="+ primaryschoolId+"}) ",
            function(err, row) {
              var primaryschool  = new primaryschool(
                  row._id , row.Organisation, row.Name, row.Address1, row.Address2, row.Address3, row.Address4, row.ITMEast, row.ITMNorth );
              db.collection('primaryschool', function(err, collection) {
                console.log(primaryschool);
                res.json(primaryschool);
                collection.find();
              });
            });

      });
    }
);

*/
app.listen(3000);
module.exports = app;
