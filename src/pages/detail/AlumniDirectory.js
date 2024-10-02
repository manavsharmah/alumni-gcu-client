import React from 'react';
import Article from '../../components/common/Article-container';
import "../pages.css";
import AlumniList from "../../components/common/AlumniList"

const AlumniDirectory = () => {
  return (
    <>
    <div className="container">   
        <AlumniList/>
    </div>
        
    </>
  )
}

export default AlumniDirectory;