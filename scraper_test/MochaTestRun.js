var Mocha = require('mocha');
var mocha = new Mocha();
var path = require('path');
mocha.timeout(60000);
mocha.addFile(path.join("./Test/app.js"));


mocha.run(function (failures) {

});