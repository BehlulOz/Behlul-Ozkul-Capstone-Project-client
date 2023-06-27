import React from 'react';
import Cards from '../../components/Cards/Cards';
import "./PresentationPage.scss";
const PresentationPage = () => {
  return (
    <>
      <h1 className='presentation__title'>Capstone Project - SUDOKU & Backtracking Algorithm</h1>
      <div className='presentation'>
        <Cards />
      </div>
    </>
  );
};

export default PresentationPage;