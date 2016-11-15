'use strict';
var alexaApp = require('alexa-app');

module.exports = function(app) {
    var alexa = new alexaApp.app("Ava");
    console.log("Configuring Alexa");
    alexa.launch(function(request,response) {
        response.say("Hello World");
        response.card("Hello World","This is an example card");
    });

    alexa.sessionEnded(function(request,response) {
        // Clean up the user's server-side stuff, if necessary
        console.log(response);
        // No response necessary
    });
    app.set('alexa', alexa);

};

