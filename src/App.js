import {React, useState} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { SudokuBoard } from "./pages/SudokuBoard/SudokuBoard";
import Header from "./components/Header/Header";
import BackAlgoPage from "./pages/BackAlgoPage/BackAlgoPage";
import PresentationPage from "./pages/PresentationPage/PresentationPage";

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
          <Route path="/presentation" element={<PresentationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
