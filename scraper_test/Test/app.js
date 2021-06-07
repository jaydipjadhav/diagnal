var expect = require("chai").expect;
var describe = require("mocha").describe;
var lambdaTester = require("lambda-tester");
var scraper = require("../../scraper/app.js");

// Test events as json
var ValidReq = require('../TestEvents/validReq');
var InvalidReq = require('../TestEvents/invalidReq');

describe("Scraper Test", function () {

    [ValidReq].forEach(function (valid) {
        it("Valid Request", function () {
            return lambdaTester(scraper.handler)
                .event(valid)
                .expectResult(function (result) {
                  return expect(result.status).equal(true);
                });
        });
    });

    [InvalidReq].forEach(function (valid) {
        it("404 url", function () {
            return lambdaTester(scraper.handler)
                .event(valid)
                .expectResult(function (err) {
                    return expect(err.errorCode).equal(false);
                });
        });
    });
});
