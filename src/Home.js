import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import BookDetails from './BookDetails';

const Home = () => {
  const history = useHistory();
  const [books, setBooks] = useState([
    { id: 1, title: 'Book 1', author: 'Author 1', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae saepe atque excepturi repellendus quisquam quidem animi porro dolorum hic reiciendis, similique autem, iusto impedit modi, aspernatur fugiat tempore dolorem voluptate', isSelected: false },
    { id: 2, title: 'Book 2', author: 'Author 2', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae saepe atque excepturi repellendus quisquam quidem animi porro dolorum hic reiciendis, similique autem, iusto impedit modi, aspernatur fugiat tempore dolorem voluptate', isSelected: false },
    { id: 3, title: 'Book 3', author: 'Author 3', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae saepe atque excepturi repellendus quisquam quidem animi porro dolorum hic reiciendis, similique autem, iusto impedit modi, aspernatur fugiat tempore dolorem voluptate', isSelected: false },
    { id: 4, title: 'Book 4', author: 'Author 4', content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae saepe atque excepturi repellendus quisquam quidem animi porro dolorum hic reiciendis, similique autem, iusto impedit modi, aspernatur fugiat tempore dolorem voluptate', isSelected: false }
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
    setSelectedBooks([...selectedBooks, bookId]);
    localStorage.setItem('selectedBooks', JSON.stringify([...selectedBooks, bookId]));
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