import express from 'express';
import { pool } from '../index.js';

const router = express.Router();

// Movimiento: entrada al stock
router.post('/add', async (req, res) => {
  const { product_id, quantity, description } = req.body;
  const type = 'IN';

  try {
    await pool.query(
      `INSERT INTO stock_movements (product_id, type, quantity, description)
       VALUES ($1, $2, $3, $4)`,
      [product_id, type, quantity, description]
    );

    await pool.query(
      `UPDATE products SET stock = stock + $1 WHERE id = $2`,
      [quantity, product_id]
    );

    res.status(200).json({ message: 'Stock ingresado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Movimiento: salida del stock
router.post('/remove', async (req, res) => {
  const { product_id, quantity, description } = req.body;
  const type = 'OUT';

  try {
    await pool.query(
      `INSERT INTO stock_movements (product_id, type, quantity, description)
       VALUES ($1, $2, $3, $4)`,
      [product_id, type, quantity, description]
    );

    await pool.query(
      `UPDATE products SET stock = stock - $1 WHERE id = $2`,
      [quantity, product_id]
    );

    res.status(200).json({ message: 'Stock retirado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
