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
 var db1 = db.collection('primaryschool');
    var db2 = db.collection('secondaryschool');
    var db3 = db.collection('wholeschool');
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
app.get('/wholeschool/Name/:Name',function(req,res){
    var w=req.params.Name;
    
        db3.find({Name:w}).toArray(function (err, bar) {
            res.json(bar);
        });
//    res.json(db1[req.params.ITMEast]);
});
app.get('/primary/ITMEast/:ITMEast',function(req,res){
    var i=req.params.ITMEast;
    db.collection('primaryschool', function (err, collection) {
        collection.find({ITMEast:i}).toArray(function (err, bar) {
            res.json(bar);
        });
    });

//    res.json(db1[req.params.ITMEast]);
});
app.get('/allschool',function(req,res) {
 db.collection('wholeschool', function (err, collection) {
        collection.find().toArray(function (err, bar) {
            res.json(bar);
        });
    });
});

app.post('/POST',function (req, res){
		var school1=new school(req.body.Organisation,req.body.Name,req.body.Address1,req.body.Address2,req.body.Address3,req.body.Address4,req.body.ITMEast,req.body.ITMNorth);
		console.log(school1);
			db.collection("wholeschool",function(err,collection){
				collection.save(school1);
			})
		});

app.put('/PUT',function (req, res){
		var school1=new school(req.body.Organisation,req.body.Name,req.body.Address1,req.body.Address2,req.body.Address3,req.body.Address4,req.body.ITMEast,req.body.ITMNorth);
		console.log(school1);
		
		db.collection("wholeschool",function(err,collection){
			if(req.body.Name!=collection.Name){
				collection.save(school1);
			}else{
				console.log(err);
			}
			})
		});

app.delete('/DELETE',
	function (req, res){
		var Name11 = req.body.Name;
		
			db3.remove({Name:Name11});
				
			
					
			});
			
app.post('/school',function (req, res){
	
		var schoolName =  (req.body.Name) ? req.body.Name : null;
		console.log(schoolName+"------");
		 
				db3.find({Name:schoolName}).toArray(function (err, row) {
				
				console.log(row[0].Organisation);
					console.log("-----------hereS----------");
					var school11  = new school(
									row[0].Organisation, row[0].Name, row[0].Address1, row[0].Address2, row[0].Address3, row[0].Address4, row[0].ITMEast, row[0].ITMNorth);
				
					if (typeof(row) == "object"){						
						return res.json(school11);
					}						
					else{
						return res.json("Error");
					}
				
			});

		});		
		
app.get('/GET/:schoolName',
	function (req, res){
		var sName = (req.params.schoolName) ? req.params.schoolName :  req.body.Name;
	
		
		db3.find({Name:sName}).toArray(function(err, row) {
					var school11  = new school(
									 row._id,row.Organisation, row.Name, row.Address1, row.Address2, row.Address3, row.Address4, row.ITMEast, row.ITMNorth);
					console.log(school11);									
					res.json(school11);			
			  });
			
		});		
	
app.use(express.static(__dirname + '/public'));
// Start the server.
var server = app.listen(3000);