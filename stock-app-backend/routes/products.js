import express from 'express';
import { pool } from '../index.js';

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear nuevo producto
router.post('/new', async (req, res) => {
  const { name, sku, barcode, description, price } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO products (name, sku, barcode, description, price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, sku, barcode, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
