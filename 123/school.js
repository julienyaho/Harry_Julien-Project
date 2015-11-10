// Import express to create and configure the HTTP server.
var express = require('express');
// Import body parser to work with POST data
var bodyParser = require('body-parser');

// Create a HTTP server app.
var app = express();
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // 
app.set('view engine', 'ejs');
// get data from json into array
var fs = require('fs');

var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;
var server = new Server('localhost',27017, {auto_reconnect: true});
//console.log(data);
var db = new Db('schools', server);
db.open(function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});

//var rrr=db.collection("primaryschool");
var school = function(Organisation , Name, Address1, Address2, Address3, Address4, ITMEast, ITMNorth){
   // this._id = (_id) ? _id : 0;
    this.Organisation = (Organisation) ? Organisation : "null";
    this.Name = (Name) ? Name : "null";
    this.Address1 = (Address1) ? Address1 : "null"; // for transparent
    this.Address2 = (Address2) ? Address2 : "null";
    this.Address3 = (Address3) ? Address3 : "null";
    this.Address4 = (Address4) ? Address4 : "null";
    this.ITMEast = (ITMEast) ? ITMEast : "0.000";
    this.ITMNorth = (ITMNorth) ? ITMNorth : "0.000";
}

app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.get('/primary',function(req,res){
    db.collection('primaryschool', function(err, collection) {
        collection.find().toArray(function (err,ppp) {
           res.json(ppp);
        });
    });
});

app.get('/secondary',function(req,res) {
    db.collection('secondaryschool', function (err, collection) {
        collection.find().toArray(function (err, sss) {
            res.json(sss);
        });
    });
});
app.get('/primary/Name/:Name',function(req,res){
    var w=req.params.Name;
    console.log(w);
    db.collection('primaryschool', function (err, collection) {
        collection.find({Name:w}).toArray(function (err, bar) {
            res.json(bar);
        });
    });

//    res.json(db1[req.params.ITMEast]);
});
app.get('/primary/ITMEast/:ITMEast',function(req,res){
    var w=req.params.ITMEast;
    console.log(w);
    db.collection('primaryschool', function (err, collection) {
        collection.find({ITMEast:w}).toArray(function (err, bars) {
            res.json(bars);
        });
    });

//    res.json(db1[req.params.ITMEast]);
});
app.get('/allschool',function(req,res) {
    var db1 = db.collection('primaryschool');
    var db2 = db.collection('secondaryschool');
    var db3 = db.collection('wholeschool');
	
    for (var i=0;i<db2.length;i++) {
        db.db3.insert(db2[i]);
    }
    db3.find().toArray(function (err, aa) {
        res.json(aa);
    });
});

app.post('/POST',function (req, res){
		var school1=new school(req.body.Organisation,req.body.Name,req.body.Address1,req.body.Address2,req.body.Address3,req.body.Address4,req.body.ITMEast,req.body.ITMNorth);
		console.log(school1);
			db.collection("wholeschool",function(err,collection){
				collection.save(school1);
			})
		});


app.post('/school',function (req, res){
		var schoolId =  (req.body._id) ? req.body._id : 0;
			rrr.find({ITMEast:schoolId}).toArray(function(err, row) {
					
					if (typeof(row) == "object"){						
						return res.json(school);
					}						
					else{
						return res.json("Error");
					}
		});		
	});
app.use(express.static(__dirname + '/public'));
// Start the server.
var server = app.listen(3000);