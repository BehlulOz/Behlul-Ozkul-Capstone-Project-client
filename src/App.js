import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.scss';
import { SudokuBoard } from './components/SudokuBoard/SudokuBoard';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <SudokuBoard />
    </div>
  );
}

export default App;
