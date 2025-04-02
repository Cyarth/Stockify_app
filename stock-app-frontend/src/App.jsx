import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import StockForm from './components/StockForm';
import ProductList from './components/ProductList';

export default function App() {
  const [section, setSection] = useState('products');
  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-xl p-6">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-8">📦 Sistema de Stock</h1>

        <div className="flex justify-center gap-4 mb-6">
          <button onClick={() => setSection('create')} className={`px-4 py-2 rounded ${section === 'create' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            ➕ Crear Producto
          </button>
          <button onClick={() => setSection('stock')} className={`px-4 py-2 rounded ${section === 'stock' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            🔁 Movimiento
          </button>
          <button onClick={() => setSection('products')} className={`px-4 py-2 rounded ${section === 'products' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            📋 Ver Productos
          </button>
        </div>

        {section === 'create' && <ProductForm onProductCreated={triggerRefresh} />}
        {section === 'stock' && <StockForm onStockUpdated={triggerRefresh} />}
        {section === 'products' && <ProductList key={refresh} />}
      </div>
    </div>
  );
}
