"use strict";
let should = require('should');
let request = require('supertest');
let bear = require('../models/bear');
let app = require('../server');

describe('Bear Routes', () => {
  before((done) => {
    bear.clear();
    bear.createSync('Fake 1', 'Grey', 'Koala Bear');
    bear.createSync('Fake 2', 'Black and White', 'Panda Bear');
    bear.createSync('Fake 3', 'White', 'Polar Bear');
    done();
  });
  describe('Seeded info', () => {
    it('should start with 3 items in the array', (done) => {
      should.equal(bear.getAllBears().length, 3);
      done();
    });
  });
  describe('GET /bears', () => {
    it('should return 3 bears', (done) => {
      request(app)
      .get('/bears')
      .expect(200)
      .expect((res) => {
        should.equal(res.body.length, 3);
      })
      .end(done);
    });
  });
  describe('POST /bears', () => {
    it('return 400 - no name on bear object', (done) => {
      request(app)
      .post('/bears')
      .send({color: 'red', species: 'red panda'})
      .expect(400)
      .end(done);
    });
    it('should allow us to create a bear', (done) => {
      request(app)
      .post('/bears')
      .send({name: 'Foxy', color: 'Red', species: 'Red Panda'})
      .expect(200)
      .end(done);
    });
  });
});
