import React from "react";
import { Link } from "react-router-dom";
import "./AlgoButton.scss";

const AlgoButton = ({ solveSudoku, newSudoku, sudokuReset }) => {
  const handleSolve = () => {
    solveSudoku(0, 0);
  };

  const handleNewSudoku = () => {
    newSudoku();
  };

  const handleReset = () => {
    sudokuReset();
  };

  return (
    <div className="algo-button-container">
      <button className="button button__algo" onClick={handleSolve}>
        Solve with Backtracking Algorithm
      </button>
      <button className="button button__sudoku">
        <Link to="/">Play Sudoku !</Link>
      </button>
      <button className="button button__new-sudoku" onClick={handleNewSudoku}>
        New Sudoku
      </button>
      <button className="button button__reset" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default AlgoButton;
