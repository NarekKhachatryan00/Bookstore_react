import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Checkout = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({ name: '', address: '', phoneNumber: ''});


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOrder = () => {
    const order = {
      name: formData.name,
      address: formData.address,
      phoneNumber: formData.phoneNumber,
      selectedBooks: JSON.parse(localStorage.getItem('selectedBooks')) || [],
    };

    console.log('Order:', order);
    localStorage.removeItem('selectedBooks');
    history.push('/');

  };

  return (
    <div className='checkout'>
      <h2>Checkout</h2>
      <form>
        <label for='name'>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
        <label to>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
        <label>Phone Number:</label>
        <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
      </form>
      <button onClick={handleOrder}>Order</button>
    </div>
  );
};

export default Checkout;