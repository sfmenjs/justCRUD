"use strict";
let should = require('should');
let bear = require('../models/bear');

describe('Bear Database', () => {
  before((done) => {
    bear.clear();
    bear.createSync('Fake 1', 'Grey', 'Koala Bear');
    bear.createSync('Fake 2', 'Black and White', 'Panda Bear');
    bear.createSync('Fake 3', 'White', 'Polar Bear');
    done();
  });
  describe('Initial Seed', () => {
    it('Should start with 3 bears', (done) => {
      let bears = bear.getAllBears();
      should.equal(bears.length, 3);
      done();
    });
  });
  describe('Creating a bear sync', () => {
    describe('Using Params', () => {
      it('should return false - missing bear name', (done) => {
        let result = bear.createSync(null, 'Brown', 'Grizzly');
        should.equal(result, false);
        done();
      });
      it('should return false - missing bear color', (done) => {
        let result = bear.createSync('Fake', null, 'Grizzly');
        should.equal(result, false);
        done();
      });
      it('should return false - missing bear species', (done) => {
        let result = bear.createSync('Fake ', 'Brown', null);
        should.equal(result, false);
        done();
      });
      it('should create a bear', (done) => {
        let result = bear.createSync('Fake', 'Brown', 'Grizzly');
        should.equal(result, undefined);
        done();
      });
      it('should verify bear was added', (done) => {
        let bears = bear.getAllBears();
        should.equal(bears.length, 4);
        let created_bear = bears[bears.length - 1];
        should.exist(created_bear._id);
        should.equal(created_bear.name, 'Fake');
        should.equal(created_bear.color, 'Brown');
        should.equal(created_bear.species, 'Grizzly');
        done();
      });
    }); //end of using params
    describe('Using an object', () => {
      it('should return false - missing bear name', (done) => {
        let result = bear.createSync({
          color: 'Black and White',
          species: 'Panda'
        });
        should.equal(result, false);
        done();
      });
      it('should return false - missing bear color', (done) => {
        let result = bear.createSync({
          name: 'Pan',
          species: 'Panda'
        });
        should.equal(result, false);
        done();
      });
      it('should return false - missing bear name', (done) => {
        let result = bear.createSync({
          name: 'Pan',
          color: 'Black and White'
        });
        should.equal(result, false);
        done();
      });
      it('should create a bear', (done) => {
        let result = bear.createSync({
          name: 'Pan',
          color: 'Black and White',
          species: 'Panda'
        });
        should.equal(result, undefined);
        done();
      });
      it('should verify the bear was added', (done) => {
        let bears = bear.getAllBears();
        should.equal(bears.length, 5);
        let created_bear = bears[bears.length - 1];
        should.exist(created_bear._id);
        should.equal(created_bear.name, 'Pan');
        should.equal(created_bear.color, 'Black and White');
        should.equal(created_bear.species, 'Panda');
        done();
      });
    }); // end of using object
  }); // end of creating a bear sync
  describe('creating bear async', () => {
    it('should create a new bear', (done) => {
      bear.create('Panda Express', 'Purple', 'Chinese Fast Bear', (err, result) => {
          should.equal(err, null);
          should.equal(result, 'success');
          done();
      });
    });
    it('should validate bear was created', (done) => {
      let bears = bear.getAllBears();
      should.equal(bears.length, 6);
      let created_bear = bears[bears.length - 1];
      should.exist(created_bear._id);
      should.equal(created_bear.name, 'Panda Express');
      should.equal(created_bear.color, 'Purple');
      should.equal(created_bear.species, 'Chinese Fast Bear');
      done();
    });
  }); // end of creating bear async
  describe('deleting bear', () => {

  }); // end of deleting bear sync
  describe('deleting bear async', () => {
    it('should delete the bear when an id is passed in', (done) => {
      let bears = bear.getAllBears();
      let bear2 = bears[2];
      bear.delete(bear2._id, (err, result) => {
        should.equal(err, null);
        should.equal(result, "Success");
        let bear_array = bear.getAllBears();
        should.equal(bear_array.indexOf(bear2), -1);
        done();
      });
    });
    it('should delete the bear when an object is passed in', (done) => {
      let bears = bear.getAllBears();
      let bear1 = bears[1];
      bear.delete(bear1, (err, result) => {
        should.equal(err, null);
        should.equal(result, "Success");
        let bear_array = bear.getAllBears();
        should.equal(bear_array.indexOf(bear1), -1);
        done();
      });
    });
  }); // end of deleting bear async
});
