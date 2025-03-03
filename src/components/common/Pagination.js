import React, { useState, useEffect } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange, stylePrefix = "default" }) => {
    const [startPage, setStartPage] = useState(1);
    const pageWindowSize = 5;

    useEffect(() => {
        if (currentPage < startPage || currentPage > startPage + pageWindowSize - 1) {
            const newStart = Math.max(1, Math.min(currentPage - Math.floor(pageWindowSize / 2), totalPages - pageWindowSize + 1));
            setStartPage(newStart);
        }
    }, [currentPage, totalPages]);

    if (totalPages <= 1) return null;

    const endPage = Math.min(startPage + pageWindowSize - 1, totalPages);

    const handlePrevGroup = () => {
        const newStart = Math.max(startPage - pageWindowSize, 1);
        setStartPage(newStart);
    };

    const handleNextGroup = () => {
        const newStart = Math.min(startPage + pageWindowSize, totalPages - pageWindowSize + 1);
        setStartPage(newStart);
    };

    const handleFirstPage = () => {
        setStartPage(1);
        onPageChange(1);
    };

    const handleLastPage = () => {
        const newStart = Math.max(1, totalPages - pageWindowSize + 1);
        setStartPage(newStart);
        onPageChange(totalPages);
    };

    return (
        <div className={`${stylePrefix}-pagination`}>
            <button 
                className={`${stylePrefix}-page-button`}
                onClick={handleFirstPage}
                disabled={currentPage === 1}
            >
                First
            </button>
            <button 
                className={`${stylePrefix}-page-button`}
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
                            className={`${stylePrefix}-page-number ${
                                currentPage === pageNum ? `${stylePrefix}-page-number-active` : ''
                            }`}
                            onClick={() => onPageChange(pageNum)}
                        >
                            {pageNum}
                        </button>
                    );
                }
            )}

            <button 
                className={`${stylePrefix}-page-button`}
                onClick={handleNextGroup}
                disabled={endPage === totalPages}
            >
                →
            </button>
            <button 
                className={`${stylePrefix}-page-button`}
                onClick={handleLastPage}
                disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;