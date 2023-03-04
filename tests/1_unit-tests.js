const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

let unsolveString =  '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
let solutionString = '769235418851496372432178956174569283395842761628713549283657194516924837947381625';
let invalidCharString = 'a.9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'

let invalidLenString = '2..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';

suite('Unit Tests', () => {
  suite('Using solver to do 12 unit tests', function() {
    test('Logic handles a valid puzzle string of 81 characters', function(done) {
      assert.equal(solver.solve(unsolveString), solutionString);
      done();
    });

    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', function(done) {
      assert.equal(solver.solve(invalidCharString), false);
      done();
    });

    test('Logic handles a puzzle string that is not 81 characters in length', function(done) {
      assert.equal(solver.solve(invalidLenString), false);
      done();
    });

    test('Logic handles a valid row placement', function(done) {
      assert.equal(solver.checkRowPlacement(unsolveString, 'A', '1', '7'), true);
      done();
    });    

    test('Logic handles an invalid row placement', function(done) {
      assert.equal(solver.checkRowPlacement(unsolveString, 'A', '1', '9'), false);
      done();
    });

    test('Logic handles a valid column placement', function(done) {
      assert.equal(solver.checkColPlacement(unsolveString, 'A', '1', '7'), true);
      done();
    });

    test('Logic handles an invalid column placement', function(done) {
      assert.equal(solver.checkColPlacement(unsolveString, 'A', '1', '8'), false);
      done();
    });

    test('Logic handles a valid region (3x3 grid) placement', function(done) {
      assert.equal(solver.checkRegionPlacement(unsolveString, 'A', '1', '7'), true);
      done();
    });

    test('Logic handles an invalid region (3x3 grid) placement', function(done) {
      assert.equal(solver.checkRegionPlacement(unsolveString, 'A', '1', '8'), false);
      done();
    });

    test('Valid puzzle strings pass the solver', function(done) {
      assert.equal(solver.solve(unsolveString), solutionString);
      done();
    });

    test('Invalid puzzle strings fail the solver', function(done) {
      assert.equal(solver.solve(invalidCharString), false);
      done();
    });

    test('Solver returns the expected solution for an incomplete puzzle', function(done) {
      assert.equal(solver.solve(unsolveString), solutionString);
      done();
    });    
    
  });
});
