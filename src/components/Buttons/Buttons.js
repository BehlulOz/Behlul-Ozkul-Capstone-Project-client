import React from "react";
import "./Buttons.scss";
import initialGrid from "../../data/sudoku-boards.json";

const Buttons = ({
  sudokuSolver,
  sudokuReset,
  newSudoku,
  setNewGrid
}) => {
  const handleNewSudoku = () => {
    newSudoku();
  };

  const handleReset = () => {
    sudokuReset();
  };

  const handleSolve = () => {
    sudokuSolver();
  };

  return (
    <div className="buttons">
      <button className="button button__check" onClick={handleNewSudoku}>
        New Sudoku
      </button>
      <button className="button button__reset" onClick={handleReset}>
        Reset
      </button>
      <button className="button button__solve" onClick={handleSolve}>
        Solve
      </button>
    </div>
  );
};

export default Buttons;
