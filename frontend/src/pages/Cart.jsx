import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaMinus, FaPlus, FaArrowRight, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, remove, setQty, subtotal, shipping, total, count } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24 px-4">
        <div className="w-20 h-20 mx-auto bg-green-50 rounded-full flex items-center justify-center mb-6">
          <FaShoppingBag className="text-4xl text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h1>
        <p className="text-gray-500 mb-8">Start shopping for something worth keeping.</p>
        <Link to="/marketplace" className="btn-primary inline-flex items-center gap-2">
          Browse marketplace <FaArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-1">Your Cart</h1>
      <p className="text-gray-500 mb-8">{count} {count === 1 ? 'item' : 'items'}</p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.productId}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -40, transition: { duration: 0.2 } }}
                className="bg-white rounded-xl shadow-sm border flex gap-4 p-4"
              >
                <Link to={`/product/${item.productId}`} className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-3">
                    <div className="min-w-0">
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-semibold text-gray-800 hover:text-green-700 line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">₹ {item.price.toLocaleString()} each</p>
                    </div>
                    <button
                      onClick={() => remove(item.productId)}
                      className="text-gray-400 hover:text-red-500 p-1"
                      aria-label="Remove"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border rounded-lg">
                      <button
                        onClick={() => setQty(item.productId, item.quantity - 1)}
                        className="px-2.5 py-1.5 hover:bg-gray-100"
                        aria-label="Decrease"
                      >
                        <FaMinus className="text-xs" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => setQty(item.productId, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                        className="px-2.5 py-1.5 hover:bg-gray-100 disabled:opacity-30"
                        aria-label="Increase"
                      >
                        <FaPlus className="text-xs" />
                      </button>
                    </div>
                    <div className="font-bold text-green-700">
                      ₹ {(item.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link
            to="/marketplace"
            className="inline-block text-sm text-green-700 hover:text-green-800 font-medium mt-2"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="lg:sticky lg:top-24 h-fit">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="font-semibold text-lg mb-4">Order Summary</h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    `₹ ${shipping}`
                  )}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-500">
                  Add ₹{(999 - subtotal).toLocaleString()} more for free shipping
                </p>
              )}
            </div>

            <div className="border-t my-4 pt-4 flex justify-between items-baseline">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold text-green-700">₹ {total.toLocaleString()}</span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full btn-primary flex items-center justify-center gap-2"
            >
              Proceed to Checkout <FaArrowRight />
            </button>

            <p className="text-xs text-gray-400 text-center mt-4">
              Secure checkout · No card details stored
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}