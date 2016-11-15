/*eslint-env node */
'use strict';

var SwaggerExpress  = require('swagger-express-mw');
var app             = require('express')();
var bodyParser      = require('body-parser');


app.use( bodyParser.json() );       //To support JSON-encoded bodies
app.use(bodyParser.urlencoded({     //To support URL-encoded bodies
    extended: true
}));

//Access the Cloud Foundry environment
var cfenv = require('cfenv');

//CORS and header parameters
require('./middleware/CrossOriginMW')(app); 

// Alexa environment settings
require('./config/alexa')(app);

var restaurant = {
    user_id : "amzn1.ask.account.AH4MTTBEQJSP4NY54LPZAHVGNFRIXOSB6NFGZQZAUWBMBMC4TUVJDK455S7BUDLIZFMWB3ON4NMK3UKFJ7ACF57DGQSQID7DYLPCHGLW4ZIDZYPAQOOVZ7AWKHKSPTKO3LYLVW6NQCPM4WHH4TUJ4A6GEOI75MW63N7VAKZJT7YTR25FD2G4E2ZTC5YV4L3E7DURX7FEWKKS5OI",
    food_Items : {
        appetizer     : {
            name      : "sweet corn soup",
            price     : 600,
        },
        mainDish      : {
            name      : "chicken pizza",
            price     : 800,
        },
        dessert       : {
            name      : "chocalate lava cake",
            price     : 400,
        }
    }
};

var stuff = {
    item1     : {
        name  : "sweet corn soup",
        price : 600,
    },
    item2     : {
        name  : "chicken pizza",
        price : 800,
    },
    item3     : {
        name  : "chocalate lava cake",
        price : 400,
    }
};

module.exports = {
    app: app,
    stuff:stuff,
    restaurant: restaurant
}; 

//Get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var config = {
    appRoot: __dirname //Required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
    if (err) { throw err; }

    //Install middleware
    swaggerExpress.register(app);

    var port = appEnv.port || 10010;
    app.listen(port);

    //Print a message when the server starts listening
    console.log("Server started on " + appEnv.url);

    if (swaggerExpress.runner.swagger.paths['/hello']) {
        console.log('try this:\ncurl ' + appEnv.url + '/api/hello?name=moteta');
    }
    
});
