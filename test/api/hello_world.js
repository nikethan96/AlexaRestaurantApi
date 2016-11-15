var should = require('should');
var request = require('supertest');
var server = request.agent('http://localhost:6001/api');

describe('controllers', function() {

  describe('hello_world', function() {

    describe('GET /hello', function() {

      it("I can't say hello without a name.", function(done) {

        server
          .get('/hello')
          .set('Accept', 'application/json')
          //.expect('Content-Type', /json/)
          .expect(404)
          .end(function(err, res) {
            should.exist(err);

            done();
          });
      });

      it('Saying hello to Isuru. [Hello, Isuru!]', function(done) {

        server
          .get('/hello')
          .query({ name: 'Isuru'})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.message.should.eql('Hello, Isuru!');

            done();
          });
      });

    });

  });

});
