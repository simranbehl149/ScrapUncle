// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import { AuthProvider, CartProvider, ToastProvider } from './services/api.jsx';
// import App from './App.jsx';
// import './index.css';

// createRoot(document.getElementById('root')).render(
//   <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
//     <AuthProvider>
//       <CartProvider>
//         <ToastProvider>
//           <App />
//         </ToastProvider>
//       </CartProvider>
//     </AuthProvider>
//   </BrowserRouter>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>
);