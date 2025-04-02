import React, { useEffect, useState } from 'react';
import { getProducts } from '../api';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">📋 Lista de Productos</h2>

      {products.length === 0 ? (
        <p className="text-gray-500">No hay productos cargados.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border">
          <table className="w-full text-sm text-left table-auto">
            <thead className="bg-blue-100 text-blue-800">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Nombre</th>
                <th className="p-3">SKU</th>
                <th className="p-3">Stock</th>
                <th className="p-3">Precio</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod.id} className="hover:bg-gray-50">
                  <td className="p-3">{prod.id}</td>
                  <td className="p-3">{prod.name}</td>
                  <td className="p-3">{prod.sku}</td>
                  <td className="p-3">{prod.stock}</td>
                  <td className="p-3">${prod.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProductList;
