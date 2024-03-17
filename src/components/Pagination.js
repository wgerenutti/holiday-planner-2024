import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0 }}>
            {pageNumbers.map((number) => (
                <li
                    key={number}
                    style={{
                        display: 'inline',
                        margin: '5px',
                        cursor: 'pointer',
                        fontWeight: currentPage === number ? 'bold' : 'normal',
                    }}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </li>
            ))}
        </ul>
    );
};

export default Pagination;
