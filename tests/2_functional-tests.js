const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

let unsolveString =  '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solutionString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
let invalidCharString = 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let invalidLenString = '2..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let cantSolveString = '999..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

suite('Functional Tests', () => {

  after(function() {
    chai.request(server).get('/api')
  });
  
  test('Solve a puzzle with valid puzzle string: POST request to /api/solve', function (done) {
    chai.request(server).post('/api/solve').send({puzzle: unsolveString})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.solution, solutionString);
      done(); 
    });
  });

  test('Solve a puzzle with missing puzzle string: POST request to /api/solve', function (done) {
    chai.request(server).post('/api/solve').send({})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Required field missing');
      done(); 
    });
  });

  test('Solve a puzzle with invalid characters: POST request to /api/solve', function (done) {
    chai.request(server).post('/api/solve').send({puzzle: invalidCharString})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Invalid characters in puzzle');
      done(); 
    });
  });

  test('Solve a puzzle with incorrect length: POST request to /api/solve', function (done) {
    chai.request(server).post('/api/solve').send({puzzle: invalidLenString})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
      done(); 
    });
  });

  test('Solve a puzzle that cannot be solved: POST request to /api/solve', function (done) {
    chai.request(server).post('/api/solve').send({puzzle: cantSolveString})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Puzzle cannot be solved');
      done(); 
    });
  });

  test('Check a puzzle placement with all fields: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'A1', value: '7'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.valid, true);
      done(); 
    });
  });

  test('Check a puzzle placement with single placement conflict: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'A9', value: '5'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 1); 
      done(); 
    });
  });  
  
  test('Check a puzzle placement with multiple placement conflicts: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'A1', value: '8'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 2); 
      done(); 
    });
  });

  test('Check a puzzle placement with all placement conflicts: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'E5', value: '6'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.valid, false);
      assert.equal(res.body.conflict.length, 3); 
      done(); 
    });
  });
  
  test('Check a puzzle placement with missing required fields: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'A1'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Required field(s) missing');
      done(); 
    });
  });

  test('Check a puzzle placement with invalid characters: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: invalidCharString, coordinate: 'A9', value: '5'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Invalid characters in puzzle');
      done(); 
    });
  });  

  test('Check a puzzle placement with incorrect length: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: invalidLenString, coordinate: 'A9', value: '5'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long');
      done(); 
    });
  });

  test('Check a puzzle placement with invalid placement coordinate: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'S9', value: '5'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Invalid coordinate');
      done(); 
    });
  });  
  
  test('Check a puzzle placement with invalid placement value: POST request to /api/check', function (done) {
    chai.request(server).post('/api/check').send({puzzle: unsolveString, coordinate: 'A1', value: 'abc'})
    .end(function(err, res) {
      assert.equal(res.status, 200); 
      assert.equal(res.body.error, 'Invalid value');
      done(); 
    });
  });  
  
});

