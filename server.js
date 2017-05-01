var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/models/user'); // get the mongoose model
var tab        = require('./app/models/tab');
var drink     = require('./app/models/drink');
var port        = process.env.PORT || 8080;
var jwt         = require('jwt-simple');
 
// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());
 
// demo Route (GET http://localhost:8080)
app.get('/', function(req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

mongoose.connect(config.database);
 
// pass passport for configuration
require('./config/passport')(passport);
 
// bundle our routes
var apiRoutes = express.Router();
 
// create a new user account (POST http://localhost:8080/api/addTabab)
apiRoutes.post('/addTab', function(req, res) {
  if (!req.body.seatId || !req.body.userId) {
    res.json({success: false, msg: 'Please pass seatID and UserID.'});
  } else {
    var newTab = new tab({
      seatId: req.body.seatId,
      userId: req.body.userId
    });
    // save the user
    newTab.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Seat already Active.', tab: ''+req.body.seatId+req.body.userID });
      }
      res.json({success: true, msg: 'Successfully created new Tab.', tab: ''+req.body.seatId+req.body.userID});
    });
  }
});

apiRoutes.post('/drinks', function(req, res) {
  if (!req.body.name || !req.body.price || !req.body.quantity) {
    res.json({success: false, msg: 'Please pass drink name, price and quantity.'});
  } else {
    var newDrink = new drink({
      tabId: req.body.tabId,
      name: req.body.name,
      price: req.body.price,
      quantity: req.body.quantity
    });
    // save the user

    newDrink.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Drink already added.'});
      }
      res.json({success: true, msg: 'Successfully added new drink.'});
    });
  }
});

apiRoutes.get('/drinks', function(req, res) {
        drink.find(function(err, drinks) {
            if (err)
                res.send(err);

            res.json(drinks);
        });
    });

// connect the api routes under /api/*
app.use('/api', apiRoutes);
 
// Start the server
app.listen(port);
console.log('server started!!!');

