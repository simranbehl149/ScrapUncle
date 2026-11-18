import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const KEY = 'scrapuncle_cart';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add = (product, qty = 1) => {
    if (!product || product.isSoldOut || product.stock === 0) {
      toast.error('This item is sold out');
      return;
    }

    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      if (existing) {
        const next = Math.min(existing.quantity + qty, product.stock);
        if (next === existing.quantity) {
          toast(`Only ${product.stock} in stock`, { icon: 'ℹ️' });
          return prev;
        }
        return prev.map((i) =>
          i.productId === product._id ? { ...i, quantity: next } : i
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image || product.images?.[0] || '',
          stock: product.stock,
          quantity: Math.min(qty, product.stock),
        },
      ];
    });

    toast.success(`${product.name} added to cart`);
  };

  const remove = (productId) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  };

  const setQty = (productId, qty) => {
    if (qty < 1) return remove(productId);
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.min(qty, i.stock) }
          : i
      )
    );
  };

  const clear = () => setItems([]);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 60;
  const total = subtotal + shipping;

  return (
    <CartContext.Provider
      value={{ items, add, remove, setQty, clear, subtotal, shipping, total, count }}
    >
      {children}
    </CartContext.Provider>
  );
};