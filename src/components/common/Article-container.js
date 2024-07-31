import React from 'react';
import '../components.css';

const Article = ({ title, children }) => {
  return (
    <div className="article-container">   
        <h2 className="container-title">{title}</h2>
        <div className="container-content">
            {children}
        </div>
    </div>
  );
};

export default Article;
