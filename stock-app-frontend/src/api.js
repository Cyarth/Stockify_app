import { toast } from 'react-toastify';

const API_URL = 'https://stockify-app.onrender.com/api';

export async function getProducts() {
  try {
    const res = await fetch(`${API_URL}/products`);
    return await res.json();
  } catch (error) {
    toast.error('❌ Error al obtener productos');
    throw error;
  }
}

export async function createProduct(product) {
  try {
    const res = await fetch(`${API_URL}/products/new`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (!res.ok) throw new Error('Error al crear producto');
    toast.success('✅ Producto creado');
    return await res.json();
  } catch (error) {
    toast.error('❌ Error al crear producto');
    throw error;
  }
}

export async function registerStock(type, data) {
  const endpoint = type === 'IN' ? 'add' : 'remove';

  try {
    const res = await fetch(`${API_URL}/stock/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (!res.ok) throw new Error('Error en movimiento de stock');
    toast.success('✅ Movimiento registrado');
    return await res.json();
  } catch (error) {
    toast.error('❌ Error en movimiento de stock');
    throw error;
  }
}
