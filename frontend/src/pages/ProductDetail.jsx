import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaStar, FaStarHalfAlt, FaRegStar,
  FaChevronLeft, FaChevronRight, FaMinus, FaPlus,
  FaShoppingCart, FaBolt, FaTruck, FaShieldAlt, FaUndo,
} from 'react-icons/fa';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Stars = ({ value, size = 'text-sm' }) => {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <span className={`flex gap-0.5 text-yellow-500 ${size}`}>
      {[...Array(full)].map((_, i) => <FaStar key={i} />)}
      {half && <FaStarHalfAlt />}
      {[...Array(5 - full - (half ? 1 : 0))].map((_, i) => (
        <FaRegStar key={`e${i}`} className="text-gray-300" />
      ))}
    </span>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');

  useEffect(() => {
    let alive = true;
    setLoading(true);
    api
      .get(`/products/${id}`)
      .then((r) => {
        if (!alive) return;
        setProduct(r.data);
        setActiveImg(0);
      })
      .catch(() => alive && setProduct(null))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
        <div className="animate-spin h-12 w-12 rounded-full border-b-2 border-green-600" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-3xl mx-auto text-center py-24 px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-semibold mb-2">Product not found</h2>
        <p className="text-gray-500 mb-6">It may have been removed or the link is broken.</p>
        <Link to="/marketplace" className="btn-primary inline-block">Back to Marketplace</Link>
      </div>
    );
  }

  const gallery = product.images?.length ? product.images : [product.image];
  const soldOut = product.isSoldOut || product.stock === 0;
  const discount =
    product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;
  const reviews = product.reviews || [];
  const specs = product.specs instanceof Map
    ? Object.fromEntries(product.specs)
    : product.specs || {};

  const buyNow = () => {
    if (!user) {
      add(product, qty);
      navigate('/signin');
      return;
    }
    add(product, qty);
    navigate('/checkout');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-green-700">Home</Link>
        <span>/</span>
        <Link to="/marketplace" className="hover:text-green-700">Marketplace</Link>
        <span>/</span>
        <Link to={`/marketplace?cat=${product.category}`} className="hover:text-green-700">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-[180px]">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="relative bg-gray-100 rounded-2xl overflow-hidden aspect-square">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImg}
                src={gallery[activeImg]}
                alt={product.name}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={() => setActiveImg((i) => (i - 1 + gallery.length) % gallery.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-gray-700 text-sm" />
                </button>
                <button
                  onClick={() => setActiveImg((i) => (i + 1) % gallery.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2.5 rounded-full shadow-md"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-gray-700 text-sm" />
                </button>
              </>
            )}

            {discount > 0 && (
              <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {discount}% OFF
              </span>
            )}
            {soldOut && (
              <div className="absolute inset-0 bg-black/55 flex items-center justify-center">
                <span className="bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold tracking-wide">
                  SOLD OUT
                </span>
              </div>
            )}
          </div>

          {gallery.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
              {gallery.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    activeImg === i ? 'border-green-600' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-2 text-xs text-green-700 font-semibold uppercase tracking-wider mb-2">
            <span>{product.category}</span>
            <span>·</span>
            <span className="text-gray-500 normal-case font-normal">{product.material}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
            {product.name}
          </h1>

          <div className="flex items-center gap-3 mb-4">
            <Stars value={product.rating} />
            <span className="text-sm text-gray-600">
              {product.rating} · {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold text-green-700">₹ {product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-gray-400 line-through">₹ {product.originalPrice.toLocaleString()}</span>
                <span className="text-sm font-semibold text-green-600">
                  Save ₹ {(product.originalPrice - product.price).toLocaleString()}
                </span>
              </>
            )}
          </div>

          <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

          {/* Qty + CTA */}
          <div className="border-t border-b py-5 mb-5">
            {!soldOut && (
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-gray-700">Quantity</span>
                <div className="flex items-center border rounded-lg">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                    aria-label="Decrease"
                  >
                    <FaMinus className="text-xs" />
                  </button>
                  <span className="w-10 text-center font-semibold">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                    aria-label="Increase"
                  >
                    <FaPlus className="text-xs" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  {product.stock <= 5 ? `Only ${product.stock} left` : `${product.stock} in stock`}
                </span>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => add(product, qty)}
                disabled={soldOut}
                className="flex-1 border-2 border-green-700 text-green-700 font-semibold py-3 rounded-lg hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaShoppingCart /> Add to Cart
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={buyNow}
                disabled={soldOut}
                className="flex-1 bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <FaBolt /> Buy Now
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <FaTruck className="text-green-700 text-lg mx-auto mb-1" />
              <div className="font-medium">Free shipping</div>
              <div className="text-gray-500">on orders ₹999+</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <FaUndo className="text-green-700 text-lg mx-auto mb-1" />
              <div className="font-medium">7-day returns</div>
              <div className="text-gray-500">no questions</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <FaShieldAlt className="text-green-700 text-lg mx-auto mb-1" />
              <div className="font-medium">Verified</div>
              <div className="text-gray-500">seller</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14 border-b">
        <div className="flex gap-1">
          {[
            ['description', 'Description'],
            ['specs', 'Specifications'],
            ['reviews', `Reviews (${reviews.length})`],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`px-5 py-3 text-sm font-medium border-b-2 -mb-px transition ${
                tab === key
                  ? 'border-green-700 text-green-700'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {tab === 'description' && (
              <div className="max-w-3xl text-gray-700 leading-relaxed space-y-4">
                <p>{product.description}</p>
                <p className="text-sm text-gray-500 italic">
                  Note: as a recycled product, small variations in colour, grain and finish are expected —
                  they're part of the material's history, not a defect.
                </p>
              </div>
            )}

            {tab === 'specs' && (
              <div className="max-w-2xl">
                {Object.keys(specs).length === 0 ? (
                  <p className="text-gray-500">No specifications listed for this product.</p>
                ) : (
                  <dl className="divide-y border rounded-lg overflow-hidden bg-white">
                    {Object.entries(specs).map(([k, v]) => (
                      <div key={k} className="grid grid-cols-3 gap-2 px-4 py-3 text-sm">
                        <dt className="text-gray-500">{k}</dt>
                        <dd className="col-span-2 text-gray-800 font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            )}

            {tab === 'reviews' && (
              <div className="max-w-3xl space-y-6">
                {reviews.length === 0 ? (
                  <p className="text-gray-500">No reviews yet. Be the first to share your experience.</p>
                ) : (
                  <>
                    <div className="flex items-center gap-6 p-5 bg-gray-50 rounded-xl">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-gray-900">{product.rating}</div>
                        <Stars value={product.rating} />
                        <div className="text-xs text-gray-500 mt-1">{reviews.length} reviews</div>
                      </div>
                      <div className="flex-1 space-y-1">
                        {[5, 4, 3, 2, 1].map((r) => {
                          const n = reviews.filter((rev) => Math.round(rev.rating) === r).length;
                          const pct = (n / reviews.length) * 100;
                          return (
                            <div key={r} className="flex items-center gap-2 text-xs">
                              <span className="w-3 text-gray-500">{r}</span>
                              <FaStar className="text-yellow-500" />
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="w-6 text-right text-gray-500">{n}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {reviews.map((rev, i) => (
                      <div key={i} className="border-b last:border-0 pb-5 last:pb-0">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-green-100 text-green-800 font-semibold flex items-center justify-center text-sm">
                              {rev.name?.[0]?.toUpperCase()}
                            </div>
                            <span className="font-medium text-gray-800">{rev.name}</span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(rev.createdAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        </div>
                        <Stars value={rev.rating} />
                        <p className="mt-2 text-gray-700 text-sm leading-relaxed">{rev.comment}</p>
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}