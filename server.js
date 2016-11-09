//-------------------------Module "Importing"-----------------------------//
var express = require('express'); //used as routing framework
var app = express(); //creates an instance of express

//modules required (same idea of #includes or Imports)
var path = require('path'); //Node.js module used for getting path of file
var logger = require('morgan'); //used to log in console window all request
var cookieParser = require('cookie-parser'); //Parse Cookie header and populate req.cookies
var bodyParser = require('body-parser'); //allows the use of req.body in POST request

var server = require('http').createServer(app); //creates an HTTP server instance
var http = require('http'); //Node.js module creates an instance of HTTP to make calls to Pi
var io = require('./sockets').listen(server) //allows for sockets on the HTTP server instance
 
var fs = require('fs'); //for File saving
var multer = require('multer'); //for File uploading 

var api = require('./routes/api'); //gets api logic from path

//add for Mongo support
var mongoose = require('mongoose');                         
var mongoURI = "mongodb://localhost:27017/HuskieHack2016";
var MongoDB = mongoose.connect(mongoURI).connection;
MongoDB.on('error', function(err) { console.log(err.message); });
MongoDB.once('open', function() {
  console.log("mongodb connection open");
});


//-------------------------Express JS configs-----------------------------//
//view engine setup
app.set('views', './views'); //says where in root directory the find files (./views)
app.set('view engine', 'ejs'); //says which engine being used (ejs)

//----------------File Management-------------//
//------multer upload ------/
var filePath = "./front/files"
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, filePath);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});
//var upload = multer({ storage : storage}).single('userPhoto');
var upload = multer({storage: storage} );
app.post('/upload/file', upload.single('uploadImage'), function(req,res){
    console.log(req.body);
    filePath = "./front/files/" + req.params.roomID;
});



app.use(logger('dev')); //debugs logs in terminal
app.use(bodyParser.json()); //parses json and sets to body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'front'))); //sets all static file calls to folder


//---------------API-------------------//
app.use('/api', api);


app.get('/', function(req, res, next) {
  res.render('index');
});

app.get('/chat', function(req, res, next) {
  res.render('sockets');
});

app.get('/color/:color', function(req, res, next) {
    
    var backgroundColor = req.params.color || "white"; //defaults if no param is passed
    
    res.render('color', {
        message: "Server is up and running",
        color: backgroundColor        
    });   
});

app.get('/allUsers', function(req, res, next) {
    var players = require('./sockets').getUsers(); 
    res.json(players);
});

// catch 404 and forward to error handler
/*app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err); 
});*/

// error handlers
/*app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
});*/



// ------------ Server Setup --------------//


//-------------------------HTTP Server Config-----------------------------//
server.listen(9000); //Port to listen on
server.on('listening', onListening);

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
