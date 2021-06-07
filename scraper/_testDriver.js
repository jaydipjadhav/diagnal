/*
 * This is a utility file to help invoke and debug the lambda function. It is not included as part of the
 * bundle upload to Lambda.
 * 
 */


var app = require('./app');

// Load the sample event to be passed to Lambda. The _sampleEvent.json file can be modified to match
// what you want Lambda to process on.
//var sampleEvent = require('./_sampleEvent.json');

var event= {};
event = require('./_sampleEvent.json');
 
var context = {};
context.done = function () {
    console.log("Lambda Function Complete");
}

var callback = function (err, result) {
    if (err) {
        console.log("Lambda Function Failed : " + err);
    }
    else {
        console.log("Lambda Function Complete : " + JSON.stringify(result));
    }
}

app.handler(event, context, callback);