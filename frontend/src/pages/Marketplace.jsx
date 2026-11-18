import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaSearch, FaShoppingCart, FaHeart } from 'react-icons/fa';
import api from '../services/api';
import { useCart } from '../context/CartContext';

const CATEGORIES = ['All', 'Furniture', 'Decor', 'Stationery', 'Planters', 'Bags', 'Electronics'];

export default function Marketplace() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [wishlist, setWishlist] = useState([]);
  const { add } = useCart();

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      try {
        const { data } = await api.get('/products', { params: { category, search } });
        let list = Array.isArray(data) ? data : [];
        if (sort === 'price-low') list = [...list].sort((a, b) => a.price - b.price);
        if (sort === 'price-high') list = [...list].sort((a, b) => b.price - a.price);
        if (sort === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
        if (active) setProducts(list);
      } catch {
        if (active) setProducts([]);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, [category, search, sort]);

  const toggleWishlist = (id) =>
    setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id]));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-1">Marketplace</h1>
        <p className="text-gray-600">
          Handcrafted goods from recycled materials — each with a story.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            className="input pl-9"
            placeholder="Search for a table, lamp, notebook…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="input md:w-56" value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating">Top rated</option>
        </select>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 mb-8 scrollbar-thin">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap text-sm font-medium transition ${
              category === c
                ? 'bg-green-700 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
              <div className="h-56 bg-gray-100" />
              <div className="p-4 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/3" />
                <div className="h-4 bg-gray-100 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-3">🕵️</div>
          <p className="text-gray-700 font-medium">Nothing here yet.</p>
          <p className="text-gray-500 text-sm mt-1">Try a different category or search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((p, idx) => {
            const cover = p.image || p.images?.[0] || 'https://via.placeholder.com/400';
            const soldOut = p.isSoldOut || p.stock === 0;
            const discount = p.originalPrice > p.price
              ? Math.round((1 - p.price / p.originalPrice) * 100)
              : 0;

            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden flex flex-col"
              >
                <Link to={`/product/${p._id}`} className="relative block overflow-hidden">
                  <img
                    src={cover}
                    alt={p.name}
                    className="w-full h-52 object-cover group-hover:scale-[1.04] transition duration-500"
                  />
                  <button
                    onClick={(e) => { e.preventDefault(); toggleWishlist(p._id); }}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center shadow"
                  >
                    <FaHeart className={wishlist.includes(p._id) ? 'text-red-500 text-sm' : 'text-gray-400 text-sm'} />
                  </button>
                  {discount > 0 && (
                    <span className="absolute top-2 left-2 bg-green-600 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {discount}% OFF
                    </span>
                  )}
                  {soldOut && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        SOLD OUT
                      </span>
                    </div>
                  )}
                </Link>

                <div className="p-4 flex flex-col flex-1">
                  <div className="text-[11px] text-green-700 font-semibold uppercase tracking-wide mb-1">
                    {p.category}
                  </div>
                  <Link
                    to={`/product/${p._id}`}
                    className="font-semibold text-gray-800 line-clamp-2 hover:text-green-700 leading-snug"
                  >
                    {p.name}
                  </Link>
                  <div className="flex items-center gap-1.5 text-xs mt-1.5 text-gray-500">
                    <span className="text-yellow-500">★</span>
                    <span>{p.rating}</span>
                    <span>·</span>
                    <span>{p.reviews?.length || 0} reviews</span>
                  </div>

                  <div className="mt-auto pt-3 flex items-end justify-between">
                    <div>
                      <div className="text-xl font-bold text-green-700">
                        ₹ {p.price.toLocaleString()}
                      </div>
                      {p.originalPrice > p.price && (
                        <div className="text-xs text-gray-400 line-through">
                          ₹ {p.originalPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => add(p, 1)}
                      disabled={soldOut}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition ${
                        soldOut
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-green-700 text-white hover:bg-green-800'
                      }`}
                      aria-label="Add to cart"
                    >
                      <FaShoppingCart className="text-sm" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}