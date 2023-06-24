import {React, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { SudokuBoard } from "./pages/SudokuBoard/SudokuBoard";
import Header from "./components/Header/Header";
import BackAlgoPage from "./pages/BackAlgoPage/BackAlgoPage";

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Header />
        </header>
        <Routes>
          <Route path="/" element={<SudokuBoard />} />
          <Route path="/BackAlgo" element={<BackAlgoPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
