import React from "react";
import { useState, useRef, useEffect } from "react";
import "./BackAlgoPage.scss";
import algoArray from "../../data/sudoku-boards.json";
import algoSolutionArray from "../../data/sudoku-solution.json";
import AlgoButton from "../../components/AlgoButton/AlgoButton";

const BackAlgoPage = () => {
  let [s, setS] = useState(0);
  let algoGrid = JSON.parse(JSON.stringify(algoArray[s]));
  let AlgoSolutionGrid = JSON.parse(JSON.stringify(algoSolutionArray[s]));
  const [newGrid, setNewGrid] = useState(algoGrid);
  const rowCheck = useRef(true);
  const colCheck = useRef(true);
  const innerGridCheck = useRef(true);

  useEffect(() => {
    setNewGrid([...algoGrid]);
  }, [s]);

  const solveSudoku = async (colIndex, rowIndex) => {
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
      return solveSudoku(colIndex + 1, rowIndex);
    }

    for (let num = 1; num <= 9; num++) {
      if (isValidNumber(colIndex, rowIndex, num)) {
        const updatedGrid = [...newGrid]; // Create a copy of the newGrid state
        updatedGrid[colIndex][rowIndex] = num;
        setNewGrid(updatedGrid);
        const cell = document.querySelector(`.col-${colIndex}-row-${rowIndex}`);
        cell?.classList.add("node--correct");
        console.log("cell:",cell);
        if (solveSudoku(colIndex + 1, rowIndex)) {
          return true;
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));

        setTimeout(() => {
          cell?.classList.remove("node--correct");
        }, 200);

        updatedGrid[colIndex][rowIndex] = 0;
        setNewGrid(updatedGrid);
      }
      const cell = document.querySelector(`.col-${colIndex}-row-${rowIndex}`);
      cell?.classList.add("node--error");
      setTimeout(() => {
        cell?.classList.remove("node--error");
      }, 200);
    }
    return false;
  };

  const isValidNumber = (colIndex, rowIndex, num) => {
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

  const newSudoku = () => {
    if (s > 3) {
      s = 0;
      setS(s);
    } else {
      setS(++s);
    }
  };

  const handleChange = (e, rowIndex, colIndex) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue, 10) || 0;
    const updatedGrid = [...newGrid];
    updatedGrid[colIndex][rowIndex] = parsedValue;
    setNewGrid(updatedGrid);
  }

  return (
    <div className="back-algo-page">
      <div className="back-algo-page__board" key={JSON.stringify(newGrid)}>
        {newGrid.map((col, colIndex) => (
          <div key={colIndex} className="col">
            {col?.map((node, rowIndex) => (
              <div
                key={rowIndex}
                className={
                  newGrid[colIndex][rowIndex] > 0 ? "node" : "node--empty"
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
                {node > 0 ? node :(
                  <input
                    className="node--input"
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
                    type="number"
                    inputMode="numeric"
                    maxLength="1"
                    pattern="[1-9]"
                    value={newGrid[colIndex][rowIndex]===0?"":newGrid[colIndex][rowIndex]}
                    onChange={(e) => {
                      handleChange(e, rowIndex, colIndex);
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
        <AlgoButton solveSudoku={solveSudoku} newSudoku={newSudoku} />
      </div>
    </div>
  );
};

export default BackAlgoPage;
