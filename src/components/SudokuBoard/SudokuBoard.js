import { useState, useRef, useEffect } from "react";
import "./SudokuBoard.scss";
import initialGrid from "../../data/sudoku-boards.json";
import Buttons from "../Buttons/Buttons";

export const SudokuBoard = () => {
  const grid = JSON.parse(JSON.stringify(initialGrid));
  // const [originalGrid] = [...initialGrid];
  const [newGrid, setNewGrid] = useState([...initialGrid]);
  const [inputCheck, setInputCheck] = useState(true);
  const rowCheck = useRef(true);
  const colCheck = useRef(true);
  const innerGridCheck = useRef(true);
  const completeCheck = useRef(false);

  const changeHandler = (e, rowIndex, colIndex) => {
    const tempGrid = [...newGrid];
    const newInput = parseInt(e.target.value);
    rowCheck.current = true;
    colCheck.current = true;
    innerGridCheck.current = true;

    for (let i = 0; i < 9; i++) {
      if (newInput === tempGrid[i][rowIndex]) {
        rowCheck.current = false;
        console.log("Duplicate row value found:", newInput);
      }
      if (newInput === tempGrid[colIndex][i]) {
        colCheck.current = false;
        console.log("Duplicate column value found:", newInput);
      }
    }

    checkInnerGrid(rowIndex, colIndex, newInput);
    console.log(
      "colCheck.current",
      colCheck.current,
      "rowCheck.current",
      rowCheck.current
    );
    if (
      0 < newInput &&
      newInput <= 9 &&
      colCheck.current &&
      rowCheck.current &&
      innerGridCheck.current
    ) {
      tempGrid[colIndex][rowIndex] = newInput;
      e.target.classList.remove("input-error");
      console.log(tempGrid[colIndex][rowIndex]);
    } else {
      tempGrid[colIndex][rowIndex] = -1;
      e.target.classList.add("input-error");
    }
    setInputCheck(
      !rowCheck.current || !colCheck.current || !innerGridCheck.current
    );
    if (checkComplete()) {
      alert("Congratulations! You Completed the SUDOKU.");
    }
    console.log("tempGrid:", tempGrid);
    setNewGrid([...tempGrid]);
  };

  // const sudokuCheck = (rowIndex, colIndex) => {
  //   const set = new Set();
  //   for (let i = 0; i < 9; i++) {
  //     const rowArray = rowArray.push(newGrid[i][rowIndex]);
  //     console.log(rowArray);
  //   }
  //   rowArray.filter()
  //     if (duplicatecheck === newGrid[i][rowIndex]) {
  //       rowCheck.current = false;
  //       console.log("Duplicate row value found:", duplicatecheck);
  //     }
  //     if (duplicatecheck === newGrid[colIndex][i]) {
  //       colCheck.current = false;
  //       console.log("Duplicate column value found:", duplicatecheck);
  //     }
  // }
  const sudokuCheck = (rowIndex, colIndex) => {
    if (colCheck.current && rowCheck.current && innerGridCheck.current) {
      alert("Yes! You are On The Right Track");
      return true;
    } else {
      alert("Please, Check the Numbers Again!");
    }
  };

  const solveCheck = (rowIndex, colIndex) => {
    if (colCheck.current && rowCheck.current && innerGridCheck.current) {
      return true;
    } else {
      return false;
    }
  };

  const sudokuReset = () => {
    const updatedGrid = JSON.parse(JSON.stringify(initialGrid));
    setNewGrid([...updatedGrid]);
  };

  // const sudokuSolver = () => {
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       for (let k = 1; k <= 9; k++) {
  //         if (newGrid[i][j] < 0) {
  //           newGrid[i][j] = k;
  //         } else {
  //           break;
  //         }
  //       }
  //     }
  //   }
  // };

  const sudokuSolver = () => {
    solveSudoku(0, 0);
  };

  const solveSudoku = (row, col) => {
    if (col === 9) {
      // Move to the next rowIndex if the end of the current rowIndex is reached
      row++;
      col = 0;
    }

    // Base case: If all cells have been filled, the puzzle is solved
    if (row === 9) {
      alert("Sudoku solved!");
      return true;
    }

    // Skip already filled cells
    if (newGrid[col][row] > 0) {
      return solveSudoku(row, col + 1);
    }

    // Try different values for the empty cell
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(row, col, num)) {
        // Assign the valid value to the cell
        newGrid[col][row] = num;

        // Recursive call to solve the puzzle
        if (solveSudoku(row, col + 1)) {
          return true;
        }

        // If the current value doesn't lead to a solution, backtrack
        newGrid[col][row] = 0;
      }
    }

    // No valid value found, backtrack to the previous cell
    return false;
  };

  const isValidMove = (row, col, num) => {
    // Check if the value already exists in the same row
    for (let i = 0; i < 9; i++) {
      if (newGrid[i][row] === num) {
        return false;
      }
    }

    // Check if the value already exists in the same column
    for (let i = 0; i < 9; i++) {
      if (newGrid[col][i] === num) {
        return false;
      }
    }

    // Check if the value already exists in the 3x3 sub-grid
    const subGridStartRow = Math.floor(row / 3) * 3;
    const subGridStartCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (newGrid[subGridStartCol + i][subGridStartRow + j] === num) {
          return false;
        }
      }
    }

    return true;
  };

  const checkInnerGrid = (rowIndex, colIndex, newInput) => {
    for (
      let i = colIndex - (colIndex % 3);
      i < colIndex + (3 - (colIndex % 3));
      i++
    ) {
      for (
        let j = rowIndex - (rowIndex % 3);
        j < rowIndex + (3 - (rowIndex % 3));
        j++
      ) {
        if (newInput === newGrid[i][j]) {
          return (innerGridCheck.current = false);
        }
      }
    }
  };

  const checkComplete = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newGrid[i][j] < 0) {
          return (completeCheck.current = false);
        }
      }
    }
    return (completeCheck.current = true);
  };

  return (
    <>
      <div className="board" key={JSON.stringify(newGrid)}>
        {newGrid.map((col, colIndex) => (
          <div key={colIndex} className="col">
            {col.map((node, rowIndex) => (
              <div key={rowIndex} className={node > 0 ? "node" : "node-empty"}>
                {console.log(initialGrid[colIndex][rowIndex])}
                {console.log(node)}
                {initialGrid[colIndex][rowIndex] > 0 ? (
                  node
                ) : (
                  <input
                    className="node-input"
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    pattern="[1-9]"
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      const numberValue = inputValue.replace(/[^1-9]/g, "");
                      e.target.value = numberValue;
                      changeHandler(e, rowIndex, colIndex);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      <Buttons
        sudokuSolver={sudokuSolver}
        sudokuReset={sudokuReset}
        sudokuCheck={sudokuCheck}
        setNewGrid={setNewGrid}
      />
    </>
  );
};
