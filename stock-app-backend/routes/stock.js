const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/:type', async (req, res) => {
  const { product_id, quantity, description } = req.body;
  const type = req.params.type.toUpperCase();

  if (type !== 'IN' && type !== 'OUT') {
    return res.status(400).json({ error: 'Tipo inválido: debe ser "in" o "out"' });
  }

  try {
    // Registrar movimiento
    await db.query(
      'INSERT INTO stock_movements (product_id, type, quantity, description) VALUES ($1, $2, $3, $4)',
      [product_id, type, quantity, description]
    );

    // Actualizar stock
    const operator = type === 'IN' ? '+' : '-';
    await db.query(
      `UPDATE products SET stock = stock ${operator} $1 WHERE id = $2`,
      [quantity, product_id]
    );

    res.status(200).json({ message: `Stock actualizado (${type})` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

