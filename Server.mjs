import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'my_db', 
  password: 'Narek2006)21'
});

console.log('Connected to database');

app.post('/api/orders', async (req, res) => {
  const { name, address, phoneNumber, totalPrice, selectedBooks } = req.body;
  try {
    const [orderResult] = await connection.execute(
      'INSERT INTO orders (name, address, phoneNumber, totalPrice) VALUES (?, ?, ?, ?)',
      [name, address, phoneNumber, totalPrice]
    );

    const orderId = orderResult.insertId;

    for (const { id, quantity } of selectedBooks) {
      await connection.execute(
        'INSERT INTO order_items (orderId, bookId, quantity) VALUES (?, ?, ?)',
        [orderId, id, quantity]
      );
    }

    res.status(201).json({ message: 'Order placed successfully', orderId });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});