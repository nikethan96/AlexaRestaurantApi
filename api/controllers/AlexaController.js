'use strict';

var app = require('./../../app.js');
var getTotal = require('./getTotal.js');
var Client = require('node-rest-client').Client;

module.exports = {
    alexaSay : doAlexaSay
};

function doAlexaSay(req, res) {

    var alexa = app.app.get('alexa');
    var client = new Client();

    // Handle intents
    
    alexa.pre = function(request, response, type) {
        
        if(!(request.data.session.user.userId == app.restaurant.user_id)){
            var message = "Sorry there is no restaurant detail for this account";
            response.say(message);
            response.shouldEndSession(true, message);
            response.send();
        }
        
    };
    
    alexa.intent('Welcome',
        {
            "slots":{}
            ,"utterances":["wakeup"]
        }, function(request, response) {
        
        
            var dialogId = request.session('Dialog');

            if (!dialogId){
                var message = 'Hi, how can i help you?';
                response.session('Dialog', '0');
                response.session('Reply', 'Sorry I do not know to answer this question, can you please repeat it? I can tell you about todays menu or make an order or get the bill.');
                response.say(message);
                response.shouldEndSession(false, message);
                response.send();
            }else{
                var message = request.session('Reply');
                response.say(message);
                response.shouldEndSession(false, message);
                response.send();
            }
        
        });

    alexa.intent('AskforMenu',
        {
            "slots":{}
            ,"utterances":["request for the menu"]
        }, function(request, response) {
        
            var dialogId = request.session('Dialog');

            if (dialogId){
            
                if (dialogId === '0'){
            
                    var message = "Today's menu is " + app.stuff.item1.name + ", " + app.stuff.item2.name + " and " + app.stuff.item3.name + ". Would you like to order now?";
                    response.session('Dialog', '1');
                    response.session('Reply', 'Sorry I do not know to answer this question, Please either answer with Yes or No.');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();

                }else{

                    var message = request.session('Reply');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();
                } 
                
            }else{
                var message = "Sorry I do not know to answer this question, can you please repeat it? To start the application please tell it to wakeup";
                response.say(message);
                response.shouldEndSession(true, message);
                response.send();
            }          
        });
    
    alexa.intent('AskforMenuPrice',
        {
            "slots":{}
            ,"utterances":["request for the menu with price"]
        }, function(request, response) {
        
            var dialogId = request.session('Dialog');

            if (dialogId){
            
                if (dialogId === '0'){
            
                    var message = "Today's menu is " + app.stuff.item1.name + " for price of " + app.stuff.item1.price + ", " + app.stuff.item2.name + " for price of " + app.stuff.item2.price + " and " + app.stuff.item3.name + " for price of " + app.stuff.item3.price + ". Would you like to order now?";
                    response.session('Dialog', '1');
                    response.session('Reply', 'Sorry I do not know to answer this question, Please either answer with Yes or No.');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();

                }else{

                    var message = request.session('Reply');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();
                } 
                
            }else{
                var message = "Sorry I do not know to answer this question, can you please repeat it? To start the application please tell it to wakeup";
                response.say(message);
                response.shouldEndSession(true, message);
                response.send();
            }            
        });
    
    alexa.intent('Confirm',
        {
            "slots":{"ConfirmOrder" : "LIST_OF_CONFIRM"}
            ,"utterances":["{ConfirmOrder}"]
        }, function(request, response) {
        
            var dialogId = request.session('Dialog');

            if (dialogId){
            
                if (dialogId === '1'){
                    
                    var ConfirmOrder = request.slot('ConfirmOrder');
                    
                    if(ConfirmOrder){
                
                        if(ConfirmOrder == "yes"){
                
                            var message = "What would you like to order?";
                            response.session('Dialog', '2');
                            response.session('Reply', 'Sorry your choice is not on the menu the avilable dishes are ' + app.stuff.item1.name + ', ' + app.stuff.item2.name + ' and ' + app.stuff.item3.name + '.');
                            response.say(message);
                            response.shouldEndSession(false, message);
                            response.send();

                        }else{

                            var message = "Alright, Please feel free to order when your ready.";
                            response.say(message);
                            response.shouldEndSession(true, message);
                            response.send();

                        }

                    }else{

                        var message = request.session('Reply');
                        response.say(message);
                        response.shouldEndSession(false, message);
                        response.send();

                    }
                    

                }else{

                    var message = request.session('Reply');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();
                } 
                
            }else{
                var message = "Sorry I do not know to answer this question, can you please repeat it? To start the application please tell it to wakeup";
                response.say(message);
                response.shouldEndSession(true, message);
                response.send();
            }            
        });
    
    alexa.intent('OrderFood',
        {
            "slots":{"TypeOfFood" : "LIST_OF_DISHES"}
            ,"utterances":["I want to order {TypeOfFood}"]
        }, function(request, response) {
        
            var dialogId = request.session('Dialog');

            if (dialogId){
            
                if (dialogId === '2' || dialogId === '0'){
                    
                    var TypeOfFood = request.slot('TypeOfFood');
                    
                    if(TypeOfFood){
                        
                        var message = "How many portions would you like to have?";
                        response.session('Dialog', '3');
                        response.session("item1", TypeOfFood);
                        response.session('Reply', "Sorry I didn't hear you, can you please repeat the amount of portion you like to have?");
                        response.say(message);
                        response.shouldEndSession(false, message);
                        response.send();

                    }else{

                        var message = request.session('Reply');
                        response.say(message);
                        response.shouldEndSession(false, message);
                        response.send();

                    }
                    

                }else{

                    var message = request.session('Reply');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();
                } 
                
            }else{
                var message = "Sorry I do not know to answer this question, can you please repeat it? To start the application please tell it to wakeup";
                response.say(message);
                response.shouldEndSession(true, message);
                response.send();
            }            
        });
    
    alexa.intent('Amount',
        {
            "slots":{"AmountOne" : "AMAZON.NUMBER"}
            ,"utterances":["{AmountOne}"]
        }, function(request, response) {
        
            var dialogId = request.session('Dialog');
            var item = request.session('item1');
            
            if (dialogId){
            
                if (dialogId === '3'){
                    
                    var AmountOne = request.slot('AmountOne');
                    
                    if(AmountOne){
                
                        var message = "Alright, your food will be there shortly. Please press the button below to confirm";
                        
                        var client = new Client();
                        
                        var res = item.replace(" ", "%20");
                        console.log(res);
 
                        client.get("http://0fe651d8.ngrok.io/make-a-thon/addItem.php?item=" + res + "%2C" + AmountOne, function (data, response) {
                            // raw response
                            console.log("^^^^^^^^");
                            console.log(data);
                        });
                        
                        response.say(message);
                        response.shouldEndSession(true, message);
                        response.send();

                    }else{

                        var message = request.session('Reply');
                        response.say(message);
                        response.shouldEndSession(false, message);
                        response.send();

                    }
                    
                }else{

                    var message = request.session('Reply');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();
                } 
                
            }else{
                var message = "Sorry I do not know to answer this question, can you please repeat it? To start the application please tell it to wakeup";
                response.say(message);
                response.shouldEndSession(true, message);
                response.send();
            }            
        });
    
    alexa.intent('RequestBill',
        {
            "slots":{}
            ,"utterances":["request for bill"]
        }, function(request, response) {
        
            var dialogId = request.session('Dialog');

            if (dialogId){
            
                if (dialogId === '0'){
              
/*                    var client = new Client();
 
                    client.get("http://0fe651d8.ngrok.io/make-a-thon/getTotal.php", function (data, responseData) {
                        // raw response
                        console.log("^^^^^^^^");
                        console.log(data);
                        
                        var message = "Alright, your bill total is " + inWordsEn(data) + " rupees and it will be arriving shortly. Please press the button below to confirm";
                        response.say(message);
                        response.shouldEndSession(true, message);
                        response.send();
                    });*/
                    
                    getTotal.getTotalBill().then(function (data) {
                        
                        console.log(data);
                        var message = "Alright, your bill total is " + data + " rupees and it will be arriving shortly. Please press the button below to confirm";
                        response.say(message);
                        response.shouldEndSession(true, message);
                        response.send();
                        
                    }).catch (function (err){
                        console.log(err);
                    });

                }else{

                    var message = request.session('Reply');
                    response.say(message);
                    response.shouldEndSession(false, message);
                    response.send();
                } 
                
            }else{
                var message = "Sorry I do not know to answer this question, can you please repeat it? To start the application please tell it to wakeup";
                response.say(message);
                response.shouldEndSession(true, message);
                response.send();
            }            
        });
    
    
    alexa.intent('EasterEggIntent',
        {
            "utterances":[ "say the name" ]
        }, function(request, response) {
           var message = "Hello. I am FlamingViolet.";
            response.say(message);
            response.send();
        });

    // Binding Alexa app to Express...
    alexa.request(req.body)
        .then(function(response){
            setTimeout(function() {
                console.log(response);
                console.log("Sending response to Alexa");
                res.json(response);
            }, 2500);


        });
}
