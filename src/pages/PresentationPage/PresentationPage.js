import React from 'react';
import Cards from '../../components/Cards/Cards';
import "./PresentationPage.scss";
const PresentationPage = () => {
  const nameHandler = () => {
    
    
  }
  return (
    <>
      <h1 className='presentation__title'>Capstone Project - SUDOKU Game & Backtracking Algorithm</h1>
      {/* <h1 className='presentation__title'>LinkedIn: https://www.linkedin.com/in/behlulozkul/ github: https://github.com/BehlulOz</h1> */}
      <div className='presentation'>
        <Cards nameHandler={nameHandler}/>
      </div>
    </>
  );
};

export default PresentationPage;