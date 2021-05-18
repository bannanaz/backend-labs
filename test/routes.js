//LABB 3
var expect = require("chai").expect;
var assert = require("chai").assert;
var request = require("request");
const _ = require("lodash");

//Tests for random num API
describe("Random number API", function () {
  describe("Random number endpoint", function () {
    var url = "http://localhost:3002/api/random";

    it("returns status 200", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns a JSON-object", function (done) {
      request(url, function (error, response, body) {
        expect(JSON.parse(body)).to.be.a("object");
        done();
      });
    });

    it("returns a number between 0 and 1023", function (done) {
      request(url, function (error, response, body) {
        const obj = JSON.parse(body);
        assert.isNumber(obj.number, "Error, not a number");
        assert.isAbove(
          obj.number,
          -1,
          "Error, number not greater than or equal to 0"
        );
        assert.isBelow(
          obj.number,
          1024,
          "Error, number is not smaller than 1024"
        );
        done();
      });
    });
  });

  describe("Custom random number endpoint", function () {
    var url = "http://localhost:3002/api/random/num";

    it("returns status 200", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns a JSON-object", function (done) {
      request(url, function (error, response, body) {
        expect(JSON.parse(body)).to.be.a("object");
        done();
      });
    });

    it("returns a number", function (done) {
      request(url, function (error, response, body) {
        const obj = JSON.parse(body);
        assert.isNumber(obj.number, "Error, not a number");
        done();
      });
    });
  });
});

//Tests for counter API
describe("Counter API", function () {
  describe("Counter add number", function () {
    var url = "http://localhost:3002/counter/add";

    it("returns status 200", function (done) {
      request(url, function (error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    });

    it("returns a JSON object with success message when number is added", function (done) {
      request(url, function (error, response, body) {
        expect(JSON.parse(body)).to.deep.equal({ success: true });
        done();
      });
    });

    describe("Counter show number", function () {
      var url = "http://localhost:3002/counter/show";

      it("returns status 200", function (done) {
        request(url, function (error, response, body) {
          expect(response.statusCode).to.equal(200);
          done();
        });
      });

      it("returns a number", function (done) {
        request(url, function (error, response, body) {
          const obj = JSON.parse(body);
          assert.isNumber(obj.count, "Error, not a number");
          done();
        });
      });
    });
  });
});
