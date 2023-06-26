import { useState, useRef, useEffect } from "react";
import "./SudokuBoard.scss";
import sudokuArray from "../../data/sudoku-boards.json";
import solutionArray from "../../data/sudoku-solution.json";
import Buttons from "../../components/Buttons/Buttons";
import { Navigate } from "react-router-dom";

export const SudokuBoard = () => {
  let [s, setS] = useState(0);
  let grid = JSON.parse(JSON.stringify(sudokuArray[s]));
  let solutionGrid = JSON.parse(JSON.stringify(solutionArray[s]));
  const [newGrid, setNewGrid] = useState(grid);
  const [isGameReady, setIsGameReady] = useState(false);
  const rowCheck = useRef(true);
  const colCheck = useRef(true);
  const innerGridCheck = useRef(true);
  const completeCheck = useRef(true);

  useEffect(() => {
    setNewGrid([...grid]);
  }, [s]);

  useEffect(() => {
    checkComplete();
  }, [newGrid]);

  const changeHandler = (e, rowIndex, colIndex) => {
    const newInput = parseInt(e.target.value);
    rowCheck.current = true;
    colCheck.current = true;
    innerGridCheck.current = true;

    for (let i = 0; i < 9; i++) {
      if (newInput === newGrid[i][rowIndex]) {
        rowCheck.current = false;
        console.log("Duplicate row value found:", newInput);
      }
      if (newInput === newGrid[colIndex][i]) {
        colCheck.current = false;
        console.log("Duplicate column value found:", newInput);
      }
    }
    checkInnerGrid(rowIndex, colIndex, newInput);

    if (
      0 < newInput &&
      newInput <= 9 &&
      colCheck.current &&
      rowCheck.current &&
      innerGridCheck.current
    ) {
      newGrid[colIndex][rowIndex] = newInput;
      e.target.classList.add("input-correct");
      console.log(newGrid);
    } else {
      e.target.classList.add("input-error");
      e.target.classList.remove("input-correct");
      e.target.value = "";
      newGrid[colIndex][rowIndex] = 0;
      setTimeout(() => {
        e.target.classList.remove("input-error");
      }, 1000);
      console.log("false:", newInput);
    }
    setNewGrid([...newGrid]);
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
          console.log("inner grid duplicate found:", newGrid[i][j]);
          return (innerGridCheck.current = false);
        }
      }
    }
  };

  const sudokuReset = () => {
    if (sudokuArray[s] === solutionArray[s]) {
      window.location.reload();
    }
    const inputNodes = document.querySelectorAll(".node-input");
    inputNodes.forEach((node) => {
      node.value = "";
      setNewGrid([...grid]);
      setIsGameReady(false);
    });
    console.log("grid:", grid);
  };

  const checkComplete = () => {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (newGrid[i][j] !== solutionGrid[i][j]) {
          return (completeCheck.current = false);
        }
      }
    }
    alert ("You Completed the SUDOKU, Congratulations!");
    return (completeCheck.current = true);
  };

  const sudokuSolver = () => {
    sudokuArray[s] = solutionArray[s];
    console.log("grid:", grid);
    setNewGrid(solutionGrid);
    console.log("newGrid:", newGrid);
    setIsGameReady(false);
  };

  const newSudoku = () => {
    if (s > 3) {
      s = 0;
      setS(s);
    } else {
      setS(++s);
    }

    setIsGameReady(false);
  };

  const startPlay = () => {
    setIsGameReady(true);
  };

  return (
    <div className="sudoku-game-page">
      <div className="board" key={JSON.stringify(grid)}>
        {grid.map((col, colIndex) => (
          <div key={colIndex} className="col">
            {col.map((node, rowIndex) => (
              <div
                key={rowIndex}
                className={solutionArray[s][colIndex][rowIndex] > 0 ? "node" : "node-empty"}
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
                        changeHandler(e, rowIndex, colIndex);
                      }
                    }}
                    disabled={!isGameReady}
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
        setNewGrid={setNewGrid}
        newSudoku={newSudoku}
        startPlay={startPlay}
      />
    </div>
  );
};
