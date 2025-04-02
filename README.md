# 📦 Stock App

Aplicación web para gestión de productos y movimientos de stock, desarrollada con:

- ✅ [Vite](https://vitejs.dev/)
- ✅ [React](https://react.dev/)
- ✅ [Tailwind CSS](https://tailwindcss.com/)
- ✅ Backend Node.js + PostgreSQL (API REST)

---

## 🚀 Funcionalidades

- Crear productos con nombre, SKU, descripción, precio y código de barras (autoasignado si no se ingresa)
- Ver productos y su stock actual
- Registrar movimientos de stock: entradas y salidas

---

## 📂 Estructura del proyecto

```bash
├── src/
│   ├── components/
│   │   ├── ProductForm.jsx
│   │   ├── StockForm.jsx
│   │   └── ProductList.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── public/
├── package.json
├── tailwind.config.js
└── postcss.config.cjs
