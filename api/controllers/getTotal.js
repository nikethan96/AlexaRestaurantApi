'use strict';

var Client = require('node-rest-client').Client;

module.exports = {
    getTotalBill: getTotalBill
};

function getTotalBill() {

    return new Promise(function (resolve, reject) {
        var client = new Client();

        client.get("http://0fe651d8.ngrok.io/make-a-thon/getTotal.php", function (data, responseData) {
            return resolve(data);
        });
    });
};