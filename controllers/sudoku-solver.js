class SudokuSolver {

  validate(puzzleString) {
  }

  rowIndexToNumber(rowIndex) {
    if (rowIndex.toUpperCase() == 'A') {
      return 1;
    } else if (rowIndex.toUpperCase() == 'B') {
      return 2;
    } else if (rowIndex.toUpperCase() == 'C') {
      return 3;
    } else if (rowIndex.toUpperCase() == 'D') {
      return 4;
    } else if (rowIndex.toUpperCase() == 'E') {
      return 5;
    } else if (rowIndex.toUpperCase() == 'F') {
      return 6;
    } else if (rowIndex.toUpperCase() == 'G') {
      return 7;
    } else if (rowIndex.toUpperCase() == 'H') {
      return 8;
    } else if (rowIndex.toUpperCase() == 'I') {
      return 9;
    } else {
      return 'none';
    }
  }

  checkRowPlacement(puzzleString, row, column, value) {
    let grid = this.transformToGrid(puzzleString);
    row = this.rowIndexToNumber(row);

    if (grid[row - 1][column - 1] !== 0 && grid[row - 1][column - 1] !== value) {
      return false;
    }

    if (grid[row - 1][column - 1] == value) {
      return true; 
    }

    for (let i = 0; i < 9; i++) {
      if (grid[row - 1][i] == value) {
        return false;
      }
    }

    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    let grid = this.transformToGrid(puzzleString);
    row = this.rowIndexToNumber(row);

    if (grid[row - 1][column - 1] !== 0 && grid[row - 1][column - 1] !== value) {
      return false;
    }

    if (grid[row - 1][column - 1] == value) {
      return true; 
    }

    for (let j = 0; j < 9; j++) {
      if (grid[j][column - 1] == value) {
        return false;
      }
    }

    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    let grid = this.transformToGrid(puzzleString);
    row = this.rowIndexToNumber(row);

    if (grid[row - 1][column - 1] !== 0 && grid[row - 1][column - 1] !== value) {
      return false;
    }

    if (grid[row - 1][column - 1] == value) {
      return true; 
    }

    let startPointRow = row - (row % 3);
    let startPointColumn = column - (column % 3);

    for (let m = 0; m < 3; m++) {
      for (let k = 0; k < 3; k++) {
        if (grid[m + startPointRow][k + startPointColumn] == value) {
          return false;
        }
      }
    }
  return true;
  }


  solveSudoku(grid, row, col) {

    if (row == 9 - 1 && col == 9) {
      return grid;
    }

    if (col == 9) {
      row++;
      col = 0;
    }

    if (grid[row][col] != 0) {
      return this.solveSudoku(grid, row, col + 1);
    }

    for (let num = 1; num < 10; num++) {

      if (this.isSafe(grid, row, col, num)) {
        grid[row][col] = num;

        if (this.solveSudoku(grid, row, col + 1)) {
          return grid;
        }
      }
      grid[row][col] = 0;
    }

    return false;
  }

  isSafe(grid, row, col, num) {

    for (let x = 0; x <= 8; x++) {
      if (grid[row][x] == num) {
        return false;
      }
    }

    for (let x = 0; x <= 8; x++) {
      if (grid[x][col] == num) {
        return false;
      }
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (grid[i + startRow][j + startCol] == num) {
          return false;
        }
      }
      return true;
    }

  }

  transformToGrid(puzzleString) {

    let grid = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    let row = -1;
    let col = 0;
    for (let i = 0; i < puzzleString.length; i++) {
      if (i % 9 == 0) {
        row++
      }

      if (col % 9 == 0) {
        col = 0;
      }

      if (puzzleString[i] === '.') {
        grid[row][col] = 0;
      } else {
        grid[row][col] = puzzleString[i];
      }
      col++;
    }
    return grid;
  }

  transformToString(grid) {
    return grid.flat().join('');
  }

  solve(puzzleString) {
    if (puzzleString.length != 81) {
      return false;
    }

    if (/[^0-9.]/g.test(puzzleString)) {
      return false;
    }
    
    let grid = this.transformToGrid(puzzleString);
    let trySolving = this.solveSudoku(grid, 0, 0);

    if (!trySolving) {
      return false;
    }

    let solutionString = this.transformToString(trySolving);

    return solutionString;
  }
}

module.exports = SudokuSolver;

