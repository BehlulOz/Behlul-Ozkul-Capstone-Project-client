import React from "react";
import { useState, useRef, useEffect } from "react";
import "./BackAlgoPage.scss";
import algoArray from "../../data/sudoku-boards.json";
import solutionArray from "../../data/sudoku-solution.json";
import AlgoButton from "../../components/AlgoButton/AlgoButton";

const BackAlgoPage = () => {
  let [s, setS] = useState(0);
  let grid = JSON.parse(JSON.stringify(algoArray[s]));
  let solutionGrid = JSON.parse(JSON.stringify(solutionArray[s]));
  const [newGrid, setNewGrid] = useState([...grid]);
  const [isGameReady, setIsGameReady] = useState(false);
  const rowCheck = useRef(true);
  const colCheck = useRef(true);
  const innerGridCheck = useRef(true);

  useEffect(() => {
    setNewGrid([...grid]);
  }, [s]);

  const solveSudoku = (colIndex, rowIndex, e) => {
    setIsGameReady(true);
    if (colIndex === 9) {
      // Move to the next rowIndex if the end of the current rowIndex is reached
      rowIndex++;
      colIndex = 0;
    }

    // Base case: If all cells have been filled, the puzzle is solved
    if (rowIndex === 9) {
      alert("Sudoku solved!");
      return true;
    }

    // Skip already filled cells
    if (newGrid[colIndex][rowIndex] > 0) {
      return solveSudoku(rowIndex, colIndex + 1);
    }

    // Try different values for the empty cell
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(rowIndex, colIndex, num)) {
        // Assign the valid value to the cell
        newGrid[colIndex][rowIndex] = num;

        // Recursive call to solve the puzzle
        if (solveSudoku(colIndex + 1, rowIndex)) {
          return true;
        }

        // If the current value doesn't lead to a solution, backtrack
        newGrid[colIndex][rowIndex] = 0;
      }
    }

    // No valid value found, backtrack to the previous cell
    return false;
  };

  // const isValidMove = (row, col, num) => {

  //   // Check if the value already exists in the same row
  //   for (let i = 0; i < 9; i++) {
  //     if (newGrid[i][row] === num) {
  //       return false;
  //     }
  //   }

  //   //Check if the value already exists in the same column
  //   for (let i = 0; i < 9; i++) {
  //     if (newGrid[col][i] === num) {
  //       return false;
  //     }
  //   }

  //   //Check if the value already exists in the 3x3 sub-grid
  //   const subGridStartRow = Math.floor(row % 3) * 3;
  //   const subGridStartCol = Math.floor(col % 3) * 3;
  //   for (let i = 0; i < 3; i++) {
  //     for (let j = 0; j < 3; j++) {
  //       if (newGrid[subGridStartCol + i][subGridStartRow + j] === num) {
  //         return false;
  //       }
  //     }
  //   }

  //   return true;
  // };

  const isValidMove = (colIndex, rowIndex, num) => {
    rowCheck.current = true;
    colCheck.current = true;
    innerGridCheck.current = true;

    for (let i = 0; i < 9; i++) {
      if (num === newGrid[i][rowIndex]) {
        rowCheck.current = false;
        console.log("Duplicate row value found:", num);
      }
      if (num === newGrid[colIndex][i]) {
        colCheck.current = false;
        console.log("Duplicate column value found:", num);
      }
    }
    checkInnerGrid(rowIndex, colIndex, num);

    if (
      0 < num &&
      num <= 9 &&
      colCheck.current &&
      rowCheck.current &&
      innerGridCheck.current
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkInnerGrid = (rowIndex, colIndex, num) => {
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
        if (num === newGrid[i][j]) {
          console.log("inner grid duplicate found:", newGrid[i][j]);
          return (innerGridCheck.current = false);
        }
      }
    }
  };

  const sudokuReset = () => {
    const inputNodes = document.querySelectorAll(".node-input");
    inputNodes.forEach((node) => {
      node.value = "";
      setNewGrid([...grid]);
    });
    if (algoArray[s] === solutionGrid) {
      algoArray[s] = grid;
    }
  };

  const newSudoku = () => {
    if (s > 3) {
      s = 0;
      setS(s);
    } else {
      setS(++s);
    }
  };

  // const checkComplete = () => {
  //   for (let i = 0; i < 9; i++) {
  //     for (let j = 0; j < 9; j++) {
  //       if (newGrid[i][j] !== solutionGrid[i][j]) {
  //         return (completeCheck.current = false);
  //       }
  //     }
  //   }
  //   return (completeCheck.current = true);
  //   };

  return (
    <div className="back-algo-page">
      <div className="back-algo-page__board" key={JSON.stringify(algoArray[s])}>
        {algoArray[s].map((col, colIndex) => (
          <div key={colIndex} className="col">
            {col.map((node, rowIndex) => (
              <div
                key={rowIndex}
                className={
                  algoArray[s][colIndex][rowIndex] > 0 ? "node" : "node-empty"
                }
                style={{
                  borderTop:
                    rowIndex % 3 === 0
                      ? "2.5px solid #205375"
                      : "1px solid #205375",
                  borderLeft:
                    colIndex % 3 === 0
                      ? "2.5px solid #205375"
                      : "1px solid #205375",
                  borderRight:
                    (colIndex + 1) % 3 === 0
                      ? "2.5px solid #205375"
                      : "1px solid #205375",
                  borderBottom:
                    (rowIndex + 1) % 3 === 0
                      ? "2.5px solid #205375"
                      : "1px solid #205375",
                }}
              >
                {node > 0 ? (
                  node
                ) : (
                  <input
                    className="node-input"
                    style={{
                      borderTop:
                        rowIndex % 3 === 0
                          ? "2.5px solid #205375"
                          : "1px solid #205375",
                      borderLeft:
                        colIndex % 3 === 0
                          ? "2.5px solid #205375"
                          : "1px solid #205375",
                      borderRight:
                        (colIndex + 1) % 3 === 0
                          ? "2.5px solid #205375"
                          : "1px solid #205375",
                      borderBottom:
                        (rowIndex + 1) % 3 === 0
                          ? "2.5px solid #205375"
                          : "1px solid #205375",
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength="1"
                    pattern="[1-9]"
                    onChange={(e) => {
                      if (isGameReady) {
                        const inputValue = e.target.value;
                        const numberValue = inputValue.replace(/[^1-9]/g, "");
                        e.target.value = numberValue;
                        solveSudoku(e, rowIndex, colIndex);
                      }
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <AlgoButton
          solveSudoku={solveSudoku}
          sudokuReset={sudokuReset}
          newSudoku={newSudoku}
        />
      </div>
    </div>
  );
};

export default BackAlgoPage;
