import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pkg from 'pg';
import productsRoutes from './routes/products.js';
import stockRoutes from './routes/stock.js';

const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Nuevas rutas semánticas
app.use('/api/products', productsRoutes); // /, /new
app.use('/api/stock', stockRoutes);       // /add, /remove

app.listen(PORT, () => {
  console.log(`✅ Servidor API corriendo en http://localhost:${PORT}`);
});

export { pool };
