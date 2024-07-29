import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Basket = ({ location }) => {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    setSelectedBooks(storedSelectedBooks);

    const allBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', content: 'Lorem ipsum...', price: 33.3 },
      { id: 2, title: 'Book 2', author: 'Author 2', content: 'Lorem ipsum...', price: 17.5 },
      { id: 3, title: 'Book 3', author: 'Author 3', content: 'Lorem ipsum...', price: 13 },
      { id: 4, title: 'Book 4', author: 'Author 4', content: 'Lorem ipsum...', price: 23 }
    ];
    setBooks(allBooks);
  }, []);

  const handleDeleteBook = (bookId) => {
    const updatedBooks = selectedBooks.map(item =>
      item.id === bookId ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0);
    
    setSelectedBooks(updatedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(updatedBooks));
  };

  const handleChange = () => {
    history.push('/checkout');
  };

  const getBookDetails = (bookId) => {
    return books.find(book => book.id === bookId);
  };

  const getTotalPrice = () => {
    return selectedBooks.reduce((total, { id, quantity }) => {
      const book = getBookDetails(id);
      return total + (book.price * quantity);
    }, 0);
  };

  return (
    <div className="basket">
      <h2>Basket</h2>
      <div className="book-selection">
        {selectedBooks.map(({ id, quantity }) => {
          const book = getBookDetails(id);
          return (
            <div key={id} className="idies">
              <h3>{book.title}</h3>
              <p>Quantity: {quantity}</p>
              <button onClick={() => handleDeleteBook(id)}>Delete</button>
            </div>
          );
        })}
      </div>
      <p>Total Price: {getTotalPrice().toFixed(2)} $</p>
      <button onClick={handleChange}>Checkout</button>
    </div>
  );
};

export default Basket;