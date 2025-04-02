import React, { useEffect, useState } from 'react';
import { getProducts, registerStock } from '../api';
import { toast } from 'react-toastify'; // ✅ nuevo import
import 'react-toastify/dist/ReactToastify.css';

const StockForm = ({ onStockUpdated }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product_id: '',
    quantity: '',
    type: 'in',
    description: ''
  });

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
      if (data.length > 0) {
        setFormData((prev) => ({ ...prev, product_id: data[0].id }));
      }
    }
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerStock(formData.type, {
        product_id: parseInt(formData.product_id),
        quantity: parseInt(formData.quantity),
        description: formData.description
      });

      toast.success('✅ Movimiento registrado correctamente'); // ✅ nuevo toast
      setFormData({ ...formData, quantity: '', description: '' });
      onStockUpdated?.();
    } catch (err) {
      console.error(err);
      toast.error('❌ Error al registrar el movimiento'); // ✅ nuevo toast
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-semibold text-blue-700">🔁 Movimiento de Stock</h2>

      <select
        name="product_id"
        value={formData.product_id}
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        required
      >
        {products.map((prod) => (
          <option key={prod.id} value={prod.id}>
            {prod.name} (stock: {prod.stock})
          </option>
        ))}
      </select>

      <div className="grid md:grid-cols-2 gap-4">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
        >
          <option value="in">Entrada</option>
          <option value="out">Salida</option>
        </select>

        <input
          name="quantity"
          type="number"
          placeholder="Cantidad"
          value={formData.quantity}
          onChange={handleChange}
          className="w-full p-3 border rounded-md"
          required
        />
      </div>

      <textarea
        name="description"
        placeholder="Descripción (opcional)"
        value={formData.description}
        onChange={handleChange}
        className="w-full p-3 border rounded-md"
        rows="2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Registrar Movimiento
      </button>
    </form>
  );
};

export default StockForm;
