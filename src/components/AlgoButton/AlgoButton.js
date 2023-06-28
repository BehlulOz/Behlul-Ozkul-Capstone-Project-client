import React from "react";
import "./AlgoButton.scss";

const AlgoButton = ({ solveSudoku, newSudoku }) => {
  const handleSolve = () => {
    solveSudoku(0, 0);
  };

  const handleNewSudoku = () => {
    newSudoku();
  };

  const handleStop = () => {
    window.location.reload();
  };

  return (
    <div className="algo-button-container">
      <button className="button button__algo" onClick={handleSolve}>
        Solve with Backtracking Algorithm
      </button>
      <button
        className="button button__new-sudoku__algo"
        onClick={handleNewSudoku}
      >
        New Sudoku
      </button>
      <button className="button button__sudoku" onClick={handleStop}>
        Reset
      </button>
    </div>
  );
};

export default AlgoButton;
