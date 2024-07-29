import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BookDetails from './BookDetails.js';

const Home = () => {
  const history = useHistory();
  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1', content: 'Lorem ipsum...', price: 33.3, isSelected: false },
    { id: 2, title: 'Book 2', author: 'Author 2', content: 'Lorem ipsum...', price: 17.5, isSelected: false },
    { id: 3, title: 'Book 3', author: 'Author 3', content: 'Lorem ipsum...', price: 13, isSelected: false },
    { id: 4, title: 'Book 4', author: 'Author 4', content: 'Lorem ipsum...', price: 23, isSelected: false }
  ]);
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    const storedSelectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    setSelectedBooks(storedSelectedBooks);
  }, []);

  const handleSelectBook = (bookId) => {
    const updatedBooks = books.map(book =>
      book.id === bookId ? { ...book, isSelected: true } : book
    );
    setBooks(updatedBooks);
    
    const newSelectedBooks = [...selectedBooks];
    const bookIndex = newSelectedBooks.findIndex(item => item.id === bookId);

    if (bookIndex > -1) {
      newSelectedBooks[bookIndex].quantity += 1;
    } else {
      newSelectedBooks.push({ id: bookId, quantity: 1 });
    }

    setSelectedBooks(newSelectedBooks);
    localStorage.setItem('selectedBooks', JSON.stringify(newSelectedBooks));
  };

  const handleSubmit = () => {
    history.push({
      pathname: '/basket',
      state: { selectedBooks }
    });
  };

  return (
    <div className="home">
        <h2>-Homepage-</h2>
        <BookDetails books={books} handleSelectBook={handleSelectBook}/>
        <button onClick={handleSubmit} className='button-6'>Go to Basket</button>
    </div>
  );
};

export default Home;