Author - Nikethan Selvanathan



^^^^^^^^^^^^^^^  ABOUT AlexaRestaurentApi  ^^^^^^^^^^^^^^^^^

This is a Node Alexa application to make alexa act as a virtual restaurent waiter. 

^^^^^^^^^^^^^^^  TO START THE ALEXA NODE SERVER  ^^^^^^^^^^^^^^^^^

1) Open command prompt in windows or terminal in linux.
2) Run "npm -v" the reture should be 3.10.8 or higher. In case of lower npm run "npm install -g npm".
3) cd into project folder(AlexaRrestaurantApi).
4) Run "npm install". (To get all the node modules).
5) Run "npm start". (to start the server).(The application will be started in port 6001)

** The Swagger Json Schema will be available in URL.(localhost:6001/api/swagger) **

** For this explanation I'm using ngrok(https://ngrok.com/) to expose the sever **



^^^^^^^^^^^^^^^  TO EXPOSE THE STARTED NODE SERVER THROUGH NGROK ^^^^^^^^^^^^^^^^^

1) cd into ngrok folder.
2) Run "ngrok.exe http 6001" to expose the node sever which is running in port 6001.
3) Get the URL from the started ngrok sever.(similer to this Forwarding https://ca3846ed.ngrok.io).



^^^^^^^^^^^^^^^  TO UPDATE ALEXA SKILL KIT WITH NEW URL ^^^^^^^^^^^^^^^^^

1) Login to https://developer.amazon.com,
2) Go to Alexa in Navigation menu and in to Alexa Skills Kit.
3) Click the Project in the list you see.
4) In the Interaction Model add below to Intent Schema.

	{
	  "intents": [
	    {
	      "intent": "Welcome",
	      "slots": []
	    },
	    {
	      "intent": "AskforMenu",
	      "slots": []
	    },
	    {
	      "intent": "AskforMenuPrice",
	      "slots": []
	    },
	    {
	      "intent": "OrderFood",
	      "slots": [
		  {
		  "name": "TypeOfFood",
		  "type" : "LIST_OF_DISHES"
		}]
	    },
	    {
	      "intent": "RequestBill",
	      "slots": []
	    },
	    {
	      "intent": "Confirm",
	      "slots": [
		  {
		  "name": "ConfirmOrder",
		  "type" : "LIST_OF_CONFIRM"
		}]
	    },
	    {
	      "intent": "Amount",
	      "slots": [
		{
		  "name": "AmountOne",
		  "type" : "AMAZON.NUMBER"
		}]
	    }
	  ]
	}

5) In the same Interaction Model add two new list.

	LIST_OF_CONFIRM		yes | no
	LIST_OF_DISHES		sweet corn soup | chicken pizza | chocolate lava cake

6) In the same Interaction Model add Sample Utterances.

	Welcome wakeup
	Welcome wake up
	AskforMenu tell me the menu
	AskforMenu what's on the menu
	AskforMenu request for menu
	AskforMenuPrice request for menu with price
	OrderFood I'd like some {TypeOfFood}
	OrderFood I'd like to order some {TypeOfFood}
	OrderFood I want to order {TypeOfFood}
	RequestBill I'd like the bill
	RequestBill send me the bill
	RequestBill request for bill
	Confirm {ConfirmOrder}
	Amount {AmountOne}

7) Go to Configuration and in it change the URL in the textbox below "North America". to the URL you got from the ngrok appended with "/digital/api/dialogs/alexa".
	Eg - If the ngrok URL is https://ca3846ed.ngrok.io the new Appended URL will be https://ca3846ed.ngrok.io/digital/api/dialogs/alexa .
	
8) Now you can test it in Test navigation menu.



^^^^^^^^^^^^^^^  TO UPDATE BILL URL AND ORDER URL ^^^^^^^^^^^^^^^^^

1) To change the URL to make the order

	* Go to AlexaController.js in api/controllers folder in the AlexaRrestaurantApi project.
	* Go to line 258 and change the URL in it.
	
2) To change the URL to get the total

	* Go to getTotal.js in api/controllers folder in the AlexaRrestaurantApi project.
	* Go to line 14 and change the URL in it.
