'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function(app) {

  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const puzzle = req.body.puzzle; 
      const coordinate = req.body.coordinate; 
      const value = req.body.value; 

      if (!puzzle || !coordinate || !value) {
        return res.json({error: 'Required field(s) missing'});
      }

      if (coordinate.length !== 2) {
        return res.json({error: 'Invalid coordinate'});
      }
      
      if (value.length !== 1) {
        return res.json({error: 'Invalid value'});
      }

      const rowIndex = coordinate.split('')[0]; 
      const colIndex = coordinate.split('')[1];

      if (!/[a-i]/i.test(rowIndex) || !/[1-9]/.test(colIndex)) {
        return res.json({error: 'Invalid coordinate'});
      }

      if (puzzle.length != 81) {
        return res.json({error: 'Expected puzzle to be 81 characters long'});
      }

      if (/[^0-9.]/g.test(puzzle)) {
        return res.json({error: 'Invalid characters in puzzle'});
      }

      if (!/[1-9]/.test(value)) {
        return res.json({error: 'Invalid value'});
      }

      const validRow = solver.checkRowPlacement(puzzle, rowIndex, colIndex, value); 
      const validColumn = solver.checkColPlacement(puzzle, rowIndex, colIndex, value);
      const validRegion = solver.checkRegionPlacement(puzzle, rowIndex, colIndex, value); 

      const conflicts = []; 

      if (validRow && validColumn && validRegion) {
        return res.json({valid: true}); 
      } else {
        if (!validRow) {
          conflicts.push('row');
        }
        
        if (!validColumn) {
          conflicts.push('column');
        }

        if (!validRegion) {
          conflicts.push('region');
        }

        return res.json({valid: false, conflict: conflicts});
      }

    });

  app.route('/api/solve')
    .post((req, res) => {
      const puzzle = req.body.puzzle;

      if (!puzzle) {
        return res.json({ error: 'Required field missing' });
      }

      if (puzzle.length != 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' });
      }

      if (/[^0-9.]/g.test(puzzle)) {
        return res.json({ error: 'Invalid characters in puzzle' });
      }

      let solutionString = solver.solve(puzzle); 

      if (!solutionString) {
        return res.json({error: 'Puzzle cannot be solved'});
      } else {
        return res.json({solution: solutionString});
      }
    });
};
