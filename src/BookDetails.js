import React from 'react';

const BookDetails = ({ books, handleSelectBook}) => {
    return(
        <div className="book-details">
            {books.map(book => (
                <div className="book-preview">
                    <h3>{book.title}</h3>
                    <h4>By {book.author}</h4>
                    <p>{book.content}</p>
                    <button onClick={() => handleSelectBook(book.id)}>Add</button>
                </div>
            ))}
        </div>
    );
};

export default BookDetails;