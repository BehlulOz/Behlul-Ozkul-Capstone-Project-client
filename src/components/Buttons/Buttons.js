import React from "react";
import "./Buttons.scss";
import { Link } from "react-router-dom";

const Buttons = ({ sudokuSolver, sudokuReset, newSudoku, startPlay }) => {
  const handleNewSudoku = () => {
    newSudoku();
  };

  const handleReset = () => {
    sudokuReset();
  };

  const handleSolve = () => {
    sudokuSolver();
  };

  const handlePlay = () => {
    startPlay();
  };

  return (
    <div className="buttons">
      <button className="button button__play" onClick={handlePlay}>
        Play !
      </button>
      <button className="button button__new-sudoku" onClick={handleNewSudoku}>
        New Sudoku
      </button>
      <button className="button button__reset" onClick={handleReset}>
        Reset
      </button>
      <button className="button button__solve" onClick={handleSolve}>
        Solve
      </button>
      <button className="button button__back-algo" onClick={handleSolve}>
        <Link to="/BackAlgo"
        >Learn Backtracking Algorithm!
        </Link>
      </button>
    </div>
  );
};

export default Buttons;
