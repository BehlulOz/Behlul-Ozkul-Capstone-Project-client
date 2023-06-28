import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.scss";
import { SudokuBoard } from "./pages/SudokuBoard/SudokuBoard";
import Header from "./components/Header/Header";
import BackAlgoPage from "./pages/BackAlgoPage/BackAlgoPage";
import PresentationPage from "./pages/PresentationPage/PresentationPage";
import Footer from "./components/Footer/Footer";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

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
          <Route path="/profile" element={<ProfilePage />} />
          Footer
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
export default App;
