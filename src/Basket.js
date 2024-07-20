import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Basket = ({ location }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);
    const history = useHistory();

  useEffect(() => {
    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    setSelectedBooks(storedSelectedBooks);
  }, []);

  const handleDeleteBook = (bookId) => {
    const updatedBooks = selectedBooks.filter(id => id !== bookId);
    setSelectedBooks(updatedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(updatedBooks));
  };

  const handleChange = () => {
    history.push('/checkout')
  }

  return (
    <div className="basket">
      <h2>Basket</h2>
      <div className="book-selection">
        {selectedBooks.map(bookId => (
          <div className="idies">
            <h3>{`Book ${bookId}`}</h3>
            <button onClick={() => handleDeleteBook(bookId)}>Delete</button>
          </div>
        ))}
      </div>
      <button onClick={handleChange}>Checkout</button>
    </div>
  );
};

export default Basket;