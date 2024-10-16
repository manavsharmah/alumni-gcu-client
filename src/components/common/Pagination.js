import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="posts-pagination">
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index + 1} 
                    className={`posts-page-number ${currentPage === index + 1 ? 'posts-page-number-active' : ''}`} 
                    onClick={() => onPageChange(index + 1)}
                >
                    {index + 1}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
