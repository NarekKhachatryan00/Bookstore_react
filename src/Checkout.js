import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 

const Checkout = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', address: '', phoneNumber: '' });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const selectedBooks = JSON.parse(localStorage.getItem('selectedBooks')) || [];
    const allBooks = [
      { id: 1, title: 'Book 1', author: 'Author 1', price: 33.3 },
      { id: 2, title: 'Book 2', author: 'Author 2', price: 17.5 },
      { id: 3, title: 'Book 3', author: 'Author 3', price: 13 },
      { id: 4, title: 'Book 4', author: 'Author 4', price: 23 }
    ];

    const getBookDetails = (bookId) => {
      return allBooks.find(book => book.id === bookId);
    };

    const price = selectedBooks.reduce((total, { id, quantity }) => {
      const book = getBookDetails(id);
      return total + (book.price * quantity);
    }, 0);

    setTotalPrice(price);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOrder = async () => {
    const order = {
      name: formData.name,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      totalPrice: totalPrice.toFixed(2),
      selectedBooks: JSON.parse(localStorage.getItem('selectedBooks')) || [],
    };

    console.log('Order:', order);
    localStorage.removeItem('selectedBooks');
    history.push('/');

    try {
      const response = await axios.post('http://localhost:5000/api/orders', order);
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <form>
        <label htmlFor='name'>Name:</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleInputChange} 
          required  
        />
        <label htmlFor='address'>Address:</label>
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleInputChange} 
          required   
        />
        <label htmlFor='phoneNumber'>Phone Number:</label>
        <input 
          type="text" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleInputChange} 
          required 
        />
      </form>
      <button onClick={handleOrder}>Order</button>
      <p>Total Price: {totalPrice.toFixed(2)} $</p>
    </div>
  );
};

export default Checkout;