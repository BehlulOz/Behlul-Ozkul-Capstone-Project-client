import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import sudokuImage from "../../assets/images/sudoku-cover.PNG";
import "./Cards.scss";

const Cards = () => {
  const navigate = useNavigate();
  const mainPageHandler = () => {
    navigate("/");
  }
  return (
    <>
      <article className='presentation__sudoku'>
          <img onClick={mainPageHandler} src={sudokuImage} className='presentation__sudoku__image'/>  
        <button className='presentation__sudoku__button'>
          <Link className='presentation__sudoku__button--link' to="/"> 
            SUDOKU GAME
          </Link>
          </button>
      </article>
    
  </>
  );
};

export default Cards;