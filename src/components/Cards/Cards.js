import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import sudokuImage from "../../assets/images/sudoku-cover.PNG";
import algoImage from "../../assets/images/algo-cover.PNG";
import sassIcon from "../../assets/images/sass.png";
import reactIcon from "../../assets/images/react.png";
import nodeIcon from "../../assets/images/node.png";
import npmIcon from "../../assets/images/npm.png";
import htmlIcon from "../../assets/images/html-5.png";
import cssIcon from "../../assets/images/css-3.png";
import jsIcon from "../../assets/images/js.png";
import mysqlIcon from "../../assets/images/mysql-icon-9.jpg";
import rapidIcon from "../../assets/images/rapidapi-icon.svg";
import "./Cards.scss";

const Cards = () => {

  const navigate = useNavigate();

  const mainPageHandler = () => {
    navigate("/");
  }

  const backAlgoHandler = () => {
    navigate("/BackAlgo");
  }

  const myPageHandler = () => {
    navigate("/presentation");
  }
  
  return (
    <>
       <article className='presentation__my-page'>
          <img onClick={myPageHandler} src={jsIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={cssIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={htmlIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={sassIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={reactIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={nodeIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={npmIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={mysqlIcon} className='presentation__my-page__image'/>  
          <img onClick={myPageHandler} src={rapidIcon} className='presentation__my-page__image'/> 
        <button className='presentation__sudoku__button'>
          <Link className='presentation__sudoku__button--link' to="/presentation"> 
            Feyzullah Behlul OZKUL
          </Link>
          </button>
      </article>
      <article className='presentation__sudoku'>
          <img onClick={mainPageHandler} src={sudokuImage} className='presentation__sudoku__image'/>  
        <button className='presentation__sudoku__button'>
          <Link className='presentation__sudoku__button--link' to="/"> 
            SUDOKU GAME
          </Link>
          </button>
      </article>
      <article className='presentation__back-algo'>
          <img onClick={backAlgoHandler} src={algoImage} className='presentation__back-algo__image'/>  
        <button className='presentation__sudoku__button'>
          <Link className='presentation__sudoku__button--link' to="/BackAlgo"> 
            BACKTRACKING ALGORITHM
          </Link>
          </button>
      </article>
  </>
  );
};

export default Cards;