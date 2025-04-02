const express = require('express');
const router = express.Router();
const db = require('../db');

// Obtener todos los productos
router.get('/', async (req, res) => {
try {
    const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
    res.json(result.rows);
} catch (err) {
    res.status(500).json({ error: err.message });
}
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
const { name, sku, barcode, description, price } = req.body;

try {
    const result = await db.query(
      'INSERT INTO products (name, sku, barcode, description, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [name, sku, barcode, description, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
