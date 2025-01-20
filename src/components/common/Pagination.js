import React, { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const [startPage, setStartPage] = useState(1);
    const pageWindowSize = 5;

    // Reset startPage when totalPages or currentPage changes significantly
    useEffect(() => {
        // If current page is outside the window, adjust the window
        if (currentPage < startPage || currentPage > startPage + pageWindowSize - 1) {
            // Calculate the new start page based on the current page
            const newStart = Math.max(1, Math.min(currentPage - Math.floor(pageWindowSize / 2), totalPages - pageWindowSize + 1));
            setStartPage(newStart);
        }
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    // Calculate the end page for the current window
    const endPage = Math.min(startPage + pageWindowSize - 1, totalPages);

    const handlePrevGroup = () => {
        const newStart = Math.max(startPage - pageWindowSize, 1);
        setStartPage(newStart);
    };

    const handleNextGroup = () => {
        const newStart = Math.min(startPage + pageWindowSize, totalPages - pageWindowSize + 1);
        setStartPage(newStart);
    };

    return (
        <div className="posts-pagination">
            <button 
                className="pagination-arrow"
                onClick={handlePrevGroup}
                disabled={startPage === 1}
            >
                ←
            </button>

            {Array.from(
                { length: Math.min(pageWindowSize, endPage - startPage + 1) },
                (_, index) => {
                    const pageNum = startPage + index;
                    return (
                        <button
                            key={pageNum}
                            className={`posts-page-number ${
                                currentPage === pageNum ? 'posts-page-number-active' : ''
                            }`}
                            onClick={() => onPageChange(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                }
            )}

            <button 
                className="pagination-arrow"
                onClick={handleNextGroup}
                disabled={endPage === totalPages}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;