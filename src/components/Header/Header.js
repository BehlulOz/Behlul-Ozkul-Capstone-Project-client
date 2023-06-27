import {React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [sActive, setSActive] = useState(false);
  const [bActive, setBActive] = useState(false);
  const [pActive, setPActive] = useState(false);

  const presentationHandler = () => {
    navigate('/presentation');
    setPActive(true);
    setSActive(false);
    setBActive(false);
  };

  const mainPageHandler = () => {
    navigate('/');
    setSActive(true);
    setPActive(false);
    setBActive(false);
  };
  
  const backtrackPageHandler = () => {
    navigate('/BackAlgo');
    setBActive(true);
    setSActive(false);
    setPActive(false);
  };



  return (
  <>  
    <div onClick={mainPageHandler} className="header__title--container">
      <h1 className="title">
        SUDOKU 
        <br />
        <span className="title--sub"> {'<'}  Pseudo-Ku  {'>'} </span>
      </h1>
    </div>
    <div className="button__presentation--container">
      <button onClick={mainPageHandler} className={sActive?"active--s":"button__sg"}>Play Sudoku</button>
      <button onClick={backtrackPageHandler} className={bActive?"active--b":"button__ba"}>Learn Backtracking</button>
      <button onClick={presentationHandler} className={pActive?"active--p":"button__ps"}>Go to Presentation</button>
    </div>
  </>
  );
};

export default Header;
