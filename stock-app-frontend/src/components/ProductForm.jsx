import React, { useState } from 'react';
import { createProduct } from '../api';

const ProductForm = ({ onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    barcode: '',
    description: '',
    price: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateRandomBarcode = () => {
    return Math.floor(Math.random() * 1e12).toString().padStart(13, '0');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productToSend = {
      ...formData,
      price: parseFloat(formData.price),
      barcode: formData.barcode.trim() === '' ? generateRandomBarcode() : formData.barcode
    };

    try {
      await createProduct(productToSend);
      alert('✅ Producto creado correctamente');
      setFormData({ name: '', sku: '', barcode: '', description: '', price: '' });
      onProductCreated?.();
    } catch (err) {
      console.error(err);
      alert('❌ Error al crear el producto');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <h2 className="text-2xl font-semibold text-blue-700">➕ Crear Producto</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="name" type="text" placeholder="Nombre" value={formData.name} onChange={handleChange}
          className="w-full p-3 border rounded-md" required />

        <input name="sku" type="text" placeholder="SKU" value={formData.sku} onChange={handleChange}
          className="w-full p-3 border rounded-md" required />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="barcode" type="text" placeholder="Código de barras (opcional)" value={formData.barcode} onChange={handleChange}
          className="w-full p-3 border rounded-md" />

        <input name="price" type="number" step="0.01" placeholder="Precio" value={formData.price} onChange={handleChange}
          className="w-full p-3 border rounded-md" required />
      </div>

      <textarea name="description" placeholder="Descripción"
        value={formData.description} onChange={handleChange}
        className="w-full p-3 border rounded-md" rows="3" />

      <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
        Guardar Producto
      </button>
    </form>
  );
};

export default ProductForm;
