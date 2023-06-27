import React from "react";
import { useNavigate } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  const navigate = useNavigate();

  const navigateHandler = () => {
    navigate('/presentation');
  };

  const mainPageHandler = () => {
    navigate('/');
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
      <button onClick={navigateHandler} className="button__presentation">Presentation</button>
      <button onClick={navigateHandler} className="button__presentation">Presentation</button>
      <button onClick={navigateHandler} className="button__presentation">Presentation</button>
    </div>
  </>
  );
};

export default Header;
