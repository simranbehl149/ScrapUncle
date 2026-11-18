// import React from 'react';
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaTruck, FaRecycle, FaMoneyBillWave, FaLeaf, FaArrowRight } from 'react-icons/fa';

// const stats = [
//   { value: '50,000+', label: 'Trusted households' },
//   { value: '120+', label: 'Cities served' },
//   { value: '2.4M kg', label: 'Diverted from landfill' },
//   { value: '4.9★', label: 'Pickup rating' },
// ];

// const steps = [
//   { icon: FaTruck, title: 'Book a pickup', description: 'Tell us what scrap you have and when you\'re free.' },
//   { icon: FaRecycle, title: 'We weigh & recycle', description: 'Digital weighing, transparent rates, certified recyclers.' },
//   { icon: FaMoneyBillWave, title: 'Get paid instantly', description: 'UPI, wallet, or cash — your choice.' },
// ];

// const categories = [
//   { name: 'Paper', rate: 12, icon: '📄' },
//   { name: 'Plastic', rate: 18, icon: '🥤' },
//   { name: 'Metal', rate: 45, icon: '🔩' },
//   { name: 'Cardboard', rate: 10, icon: '📦' },
//   { name: 'Glass', rate: 6, icon: '🍾' },
//   { name: 'E-Waste', rate: 60, icon: '💻' },
// ];

// export default function Home() {
//   return (
//     <div>
//       {/* Hero */}
//       <section className="bg-gradient-to-r from-green-700 to-green-900 text-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
//           <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
//             <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
//               Turn Your Waste Into Value.
//             </h1>
//             <p className="text-lg text-green-100 mb-8">
//               ScrapUncle picks up your scrap at your doorstep — and turns it into beautifully recycled products you can shop.
//             </p>
//             <div className="flex flex-wrap gap-4">
//               <Link to="/sell-scrap" className="btn-secondary flex items-center gap-2">
//                 Sell Scrap <FaArrowRight />
//               </Link>
//               <Link to="/marketplace" className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-800 transition">
//                 Buy Recycled Products
//               </Link>
//             </div>
//           </motion.div>
//           <motion.div
//             initial={{ x: 30, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             className="bg-white/10 backdrop-blur rounded-2xl p-8 text-center"
//           >
//             <div className="text-5xl mb-2">♻️</div>
//             <div className="text-3xl font-bold">2.4M kg</div>
//             <div className="text-green-100">waste recycled so far</div>
//           </motion.div>
//         </div>
//       </section>

//       {/* Stats */}
//       <section className="py-12 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
//           {stats.map((s, i) => (
//             <div key={i} className="text-center">
//               <div className="text-3xl font-bold text-green-700">{s.value}</div>
//               <div className="text-sm text-gray-600">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* How it works */}
//       <section className="py-16 bg-gray-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">How it works</h2>
//           <div className="grid md:grid-cols-3 gap-8">
//             {steps.map((s, i) => (
//               <div key={i} className="bg-white p-6 rounded-xl shadow-md text-center">
//                 <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <s.icon className="text-2xl text-green-600" />
//                 </div>
//                 <div className="text-4xl font-bold text-green-600 mb-2">0{i + 1}</div>
//                 <h3 className="text-xl font-semibold mb-2">{s.title}</h3>
//                 <p className="text-gray-600">{s.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Categories */}
//       <section className="py-16 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h2 className="text-3xl font-bold text-center mb-12">What we collect</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
//             {categories.map((c) => (
//               <div key={c.name} className="bg-green-50 rounded-xl p-4 text-center hover:shadow-md transition">
//                 <div className="text-3xl mb-2">{c.icon}</div>
//                 <div className="font-semibold text-green-800">{c.name}</div>
//                 <div className="text-sm text-gray-600 mt-1">₹ {c.rate}/kg</div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-16 bg-green-700 text-white text-center">
//         <div className="max-w-3xl mx-auto px-4">
//           <h2 className="text-3xl font-bold mb-4">Ready to declutter & earn?</h2>
//           <p className="text-green-100 mb-8">Schedule your first pickup today. Free. No minimum.</p>
//           <Link to="/sell-scrap" className="bg-yellow-400 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300">
//             Schedule Pickup
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import {
  FaArrowRight, FaPhoneAlt, FaStar, FaCheckCircle,
  FaTruck, FaWeightHanging, FaMoneyBillWave, FaShieldAlt,
  FaLeaf, FaRecycle, FaLaptop, FaCouch, FaBoxOpen, FaTshirt,
} from 'react-icons/fa';
import './Home.css';


const STEPS = [
  {
    n: '01',
    icon: FaTruck,
    title: 'Schedule a pickup',
    body: 'Enter your pincode, pick a slot, and tell us roughly what you have. That’s it.',
    tag: 'Takes 40 seconds',
  },
  {
    n: '02',
    icon: FaWeightHanging,
    title: 'Our trained crew arrives',
    body: 'Verified staff, digital weighing, no haggling at the door. You see the numbers.',
    tag: 'Safety-checked staff',
  },
  {
    n: '03',
    icon: FaMoneyBillWave,
    title: 'Get paid before we leave',
    body: 'UPI or cash — settled on the spot. No “come back tomorrow” nonsense.',
    tag: 'Instant settlement',
  },
];

const CATEGORIES = [
  { label: 'Paper', icon: FaBoxOpen, tint: 'bg-blue-50 text-blue-700', rate: '₹12/kg' },
  { label: 'Plastic', icon: FaRecycle, tint: 'bg-emerald-50 text-emerald-700', rate: '₹18/kg' },
  { label: 'Metals', icon: FaWeightHanging, tint: 'bg-slate-100 text-slate-700', rate: '₹45/kg' },
  { label: 'E-Waste', icon: FaLaptop, tint: 'bg-red-50 text-red-700', rate: '₹60/kg' },
  { label: 'Appliances', icon: FaCouch, tint: 'bg-amber-50 text-amber-700', rate: 'On inspection' },
  { label: 'Textiles', icon: FaTshirt, tint: 'bg-purple-50 text-purple-700', rate: '₹8/kg' },
];

const TESTIMONIALS = [
  {
    name: 'Sheeba Bhatnagar',
    text: 'Quick and easy. Sometimes the pick up can be delayed by a day but they do get it done. The team is super helpful and polite. I much prefer dealing with ScrapUncle rather than the local dealers.',
    tag: 'Delhi NCR',
  },
  {
    name: 'Pooja',
    text: 'Used Scrap Uncle for a fridge pickup. The price was exactly what the app showed — no hidden charges. Smooth and convenient.',
    tag: 'Gurugram',
  },
  {
    name: 'Preeti Verma',
    text: 'Hassle-free. Home pickup is very convenient, and a great initiative to save the environment. Will surely recommend to others.',
    tag: 'Noida',
  },
  {
    name: 'Mridul Sah',
    text: 'Timely pickup and fair pricing. The staff is polite, professional, and the entire process is smooth. Highly recommended.',
    tag: 'Delhi',
  },
  {
    name: 'Parul Chadha',
    text: 'Booked a microwave pickup. Weighing was transparent and payment was prompt. A good option for disposing of old appliances responsibly.',
    tag: 'Faridabad',
  },
];

const GREEN_HEROES = [
  { name: 'Dharmendra', pickups: 412, badge: '🏆' },
  { name: 'Bikkie', pickups: 388, badge: '🥈' },
  { name: 'Vikas', pickups: 351, badge: '🥉' },
];

/* ------------------------------------------------------------------ */
/* Small reusable bits                                                 */
/* ------------------------------------------------------------------ */
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const Marquee = ({ items, direction = 'left', speed = 40 }) => {
  const doubled = [...items, ...items];
  return (
    <div className="marquee-mask overflow-hidden">
      <div
        className={`flex gap-5 w-max ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {doubled.map((t, i) => (
          <div
            key={i}
            className="w-[320px] flex-shrink-0 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm"
          >
            <div className="flex items-center gap-1 text-yellow-500 text-xs mb-2">
              {'★★★★★'}
            </div>
            <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
              “{t.text}”
            </p>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-green-100 text-green-800 text-xs font-bold flex items-center justify-center">
                {t.name[0]}
              </div>
              <div>
                <div className="text-xs font-semibold text-gray-800">{t.name}</div>
                <div className="text-[10px] text-gray-400">{t.tag}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [pincode, setPincode] = useState('');
  const [showSticky, setShowSticky] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 400], [0, -60]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);

  useEffect(() => {
    const unsub = scrollY.on('change', (v) => setShowSticky(v > 620));
    return () => unsub();
  }, [scrollY]);

  const checkPincode = (e) => {
    e.preventDefault();
    if (/^\d{6}$/.test(pincode)) {
      window.location.href = `/sell-scrap?pincode=${pincode}`;
    }
  };

  return (
    <div className="overflow-x-hidden">
    
      <section className="relative bg-[#0f2a1d] text-white overflow-hidden">
        {/* soft radial glow */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-[#14DC7C]/20 blur-[120px]" />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full bg-emerald-700/20 blur-[100px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-20 lg:pt-24 lg:pb-28"
        >
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
            {/* Left — copy + pincode form */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs font-medium text-emerald-100 mb-6"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#14DC7C] animate-pulse" />
                Live in Delhi NCR · 1.3M+ users
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="text-4xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-tight"
              >
                Sell recyclables online.{' '}
                <span className="text-[#14DC7C]">Schedule.</span> We collect.{' '}
                <span className="relative inline-block">
                  You get paid.
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="absolute left-0 -bottom-1 h-[3px] w-full bg-[#14DC7C] origin-left rounded-full"
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="mt-5 text-emerald-100/80 text-base sm:text-lg max-w-lg leading-relaxed"
              >
                Best value for your scrap in 3 simple steps. Verified crew,
                digital weighing, and payment before we leave your doorstep.
              </motion.p>

              {/* pincode box */}
              <motion.form
                onSubmit={checkPincode}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-8 bg-white rounded-xl p-2 flex flex-col sm:flex-row gap-2 max-w-md shadow-xl shadow-black/20"
              >
                <div className="flex items-center gap-2 flex-1 px-3">
                  <FaPhoneAlt className="text-gray-400 text-sm" />
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    placeholder="Enter your pincode"
                    className="w-full py-2.5 text-gray-800 placeholder:text-gray-400 outline-none text-sm"
                    inputMode="numeric"
                  />
                </div>
                <button
                  type="submit"
                  disabled={pincode.length !== 6}
                  className="bg-[#0f2a1d] hover:bg-black disabled:opacity-40 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition flex items-center justify-center gap-2"
                >
                  Check availability <FaArrowRight className="text-xs" />
                </button>
              </motion.form>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-5 flex items-center gap-5 text-xs text-emerald-100/70"
              >
                <span className="flex items-center gap-1.5">
                  <FaStar className="text-yellow-400" /> 4.7 rated
                </span>
                <span className="flex items-center gap-1.5">
                  <FaCheckCircle className="text-[#14DC7C]" /> 50k+ pickups
                </span>
                <span className="flex items-center gap-1.5">
                  <FaShieldAlt className="text-emerald-300" /> Trained staff
                </span>
              </motion.div>
            </div>

            {/* Right — tilted scrap collage */}
            <div className="relative hidden lg:block h-[460px]">
              {[
                { emoji: '📰', label: 'Newspaper', x: '5%', y: '8%', r: -6, d: 0.1 },
                { emoji: '📱', label: 'Old phone', x: '55%', y: '2%', r: 8, d: 0.22 },
                { emoji: '🪫', label: 'Battery', x: '18%', y: '55%', r: 4, d: 0.34 },
                { emoji: '🧊', label: 'Fridge', x: '62%', y: '58%', r: -5, d: 0.46 },
                { emoji: '👕', label: 'Clothes', x: '35%', y: '78%', r: 2, d: 0.58 },
              ].map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 30, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: c.r }}
                  transition={{ delay: c.d, duration: 0.6, ease: 'easeOut' }}
                  whileHover={{ y: -6, rotate: c.r + 2, scale: 1.04 }}
                  className="absolute bg-white/95 text-gray-800 rounded-2xl p-4 shadow-2xl w-32 cursor-default"
                  style={{ left: c.x, top: c.y }}
                >
                  <div className="text-3xl mb-1">{c.emoji}</div>
                  <div className="text-xs font-semibold">{c.label}</div>
                  <div className="text-[10px] text-green-600 font-medium mt-1">Ready for pickup</div>
                </motion.div>
              ))}

              {/* center badge */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 160 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#14DC7C] text-[#0f2a1d] rounded-full w-28 h-28 flex flex-col items-center justify-center font-bold shadow-2xl z-10"
              >
                <span className="text-2xl">₹</span>
                <span className="text-[10px] leading-tight text-center px-2">Paid on the spot</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-xs sm:text-sm text-gray-500">
          <span className="flex items-center gap-2"><FaCheckCircle className="text-green-600" /> Featured on Shark Tank India S2</span>
          <span className="w-px h-4 bg-gray-200 hidden sm:block" />
          <span>50,000+ pickups completed</span>
          <span className="w-px h-4 bg-gray-200 hidden sm:block" />
          <span>ISO-certified recycling partners</span>
          <span className="w-px h-4 bg-gray-200 hidden sm:block" />
          <span>Delhi NCR · 5 cities</span>
        </div>
      </section>

    
      <section className="bg-[#f7f9f7] py-20">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-[11px] font-bold tracking-[0.18em] text-green-700 uppercase">
                The whole thing
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Best value for your scrap, in 3 steps
              </h2>
              <p className="text-gray-500 mt-3 text-sm">
                No bartering, no “rate changed today”, no waiting around.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* connecting line */}
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              className="hidden md:block absolute left-1/2 top-6 bottom-6 w-px bg-gradient-to-b from-green-200 via-green-400 to-green-200 origin-top"
            />

            <div className="space-y-10 md:space-y-16">
              {STEPS.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.12}>
                  <div className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 ? 'md:[&>div:first-child]:order-2' : ''}`}>
                    {/* text side */}
                    <div className={`${i % 2 ? 'md:text-left md:pl-12' : 'md:text-right md:pr-12'}`}>
                      <div className="inline-flex items-center gap-2 text-xs font-semibold text-green-700 bg-green-100/70 px-2.5 py-1 rounded-full mb-3">
                        <s.icon /> {s.tag}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        {s.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed max-w-sm md:inline-block">
                        {s.body}
                      </p>
                    </div>

                    {/* number bubble (center on desktop) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10">
                      <div className="w-12 h-12 rounded-full bg-white border-2 border-green-500 text-green-700 font-bold flex items-center justify-center shadow-md text-sm">
                        {s.n}
                      </div>
                    </div>

                    {/* empty spacer for grid */}
                    <div className="hidden md:block" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.2}>
            <div className="text-center mt-14">
              <Link
                to="/sell-scrap"
                className="inline-flex items-center gap-2 bg-[#0f2a1d] hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg transition"
              >
                Schedule my first pickup <FaArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <span className="text-[11px] font-bold tracking-[0.18em] text-green-700 uppercase">
                  What we pick
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                  Recyclables we collect
                </h2>
              </div>
              <p className="text-sm text-gray-500 max-w-xs">
                If it’s recyclable and it’s cluttering your home, we probably take it.
              </p>
            </div>
          </Reveal>

          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((c, i) => (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -3 }}
                className={`group relative flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-full border border-gray-200 bg-white cursor-default transition-shadow hover:shadow-md`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${c.tint}`}>
                  <c.icon className="text-sm" />
                </div>
                <span className="text-sm font-medium text-gray-800">{c.label}</span>
                <span className="text-xs text-green-700 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                  {c.rate}
                </span>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ y: -3 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-dashed border-gray-300 text-sm text-gray-500"
            >
              + Appliances & more
            </motion.div>
          </div>
        </div>
      </section>

      
      <HouseholdBusinessSplit />

    
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="text-center mb-12">
              <span className="text-[11px] font-bold tracking-[0.18em] text-green-700 uppercase">
                Real people, real pickups
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">
                Also loved by millions of green heroes
              </h2>
              <p className="text-gray-500 mt-3 text-sm">
                These reviews are copied verbatim from the live ScrapUncle site.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="space-y-4">
          <Marquee items={TESTIMONIALS} direction="left" speed={45} />
          <Marquee items={TESTIMONIALS.slice().reverse()} direction="right" speed={55} />
        </div>
      </section>

      <section className="relative bg-[#0d1f15] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_20%_30%,#14DC7C_0,transparent_40%),radial-gradient(circle_at_80%_70%,#14DC7C_0,transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-8">
          <Reveal>
            <div className="max-w-xl mb-12">
              <span className="text-[11px] font-bold tracking-[0.18em] text-[#14DC7C] uppercase">
                Every month
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 leading-tight">
                Congratulations to our Green Super Hero of the Month
              </h2>
              <p className="text-emerald-100/70 mt-3 text-sm leading-relaxed">
                Our Green Super Heroes are the backbone of ScrapUncle’s recycling mission.
                Each month we celebrate the picker who’s made the biggest impact ♻️
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-4">
            {GREEN_HEROES.map((h, i) => (
              <Reveal key={h.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`relative rounded-2xl p-6 border ${
                    i === 0
                      ? 'bg-[#14DC7C] text-[#0d1f15] border-transparent'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="text-3xl mb-3">{h.badge}</div>
                  <div className="font-semibold text-lg">{h.name}</div>
                  <div className={`text-sm ${i === 0 ? 'text-[#0d1f15]/70' : 'text-emerald-100/60'}`}>
                    {h.pickups} pickups this month
                  </div>
                  {i === 0 && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-[#0d1f15]/10 px-2 py-0.5 rounded-full">
                      Winner
                    </span>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      
      <section className="py-20 bg-[#f7f9f7]">
        <Reveal>
          <div className="max-w-3xl mx-auto text-center px-5">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              That drawer of old chargers isn’t going to clear itself.
            </h2>
            <p className="text-gray-500 mt-4 text-sm sm:text-base">
              Book a pickup in under a minute. We’ll come to you, weigh it in front of you,
              and pay you before we leave.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/sell-scrap"
                className="bg-[#0f2a1d] hover:bg-black text-white text-sm font-semibold px-6 py-3 rounded-lg transition inline-flex items-center justify-center gap-2"
              >
                Sell your scrap <FaArrowRight />
              </Link>
              <Link
                to="/marketplace"
                className="border border-gray-300 hover:border-gray-500 text-gray-800 text-sm font-semibold px-6 py-3 rounded-lg transition text-center"
              >
                Browse recycled products
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

  
      <AnimatePresence>
        {showSticky && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md"
          >
            <div className="bg-[#0f2a1d] text-white rounded-xl shadow-2xl px-4 py-3 flex items-center justify-between gap-3">
              <div className="text-xs leading-snug">
                <div className="font-semibold">Got scrap sitting around?</div>
                <div className="text-emerald-100/70">Free pickup. Instant payment.</div>
              </div>
              <Link
                to="/sell-scrap"
                className="bg-[#14DC7C] text-[#0f2a1d] text-xs font-bold px-3.5 py-2 rounded-lg whitespace-nowrap hover:brightness-110 transition"
              >
                Schedule
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function HouseholdBusinessSplit() {
  const [tab, setTab] = useState('home');

  const data = {
    home: {
      title: 'For households',
      sub: 'Clear the clutter. Get paid for it.',
      points: [
        ['On-demand doorstep pickups', 'Pick a 2-hour window that actually suits you.'],
        ['Accurate digital weighing', 'The number on the scale is the number you get paid for.'],
        ['Trained & verified staff', 'ID-checked, uniformed, and polite. No haggling.'],
      ],
    },
    business: {
      title: 'For businesses',
      sub: 'Compliance-friendly recycling, minus the paperwork headache.',
      points: [
        ['Formal payments & documentation', 'GST invoices, pickup manifests, the works.'],
        ['Sustainability reports', 'Monthly diversion and CO₂ numbers for your ESG deck.'],
        ['Competitive bulk pricing', 'Locked rates for recurring office, hotel, and factory pickups.'],
      ],
    },
  };

  const active = data[tab];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
            <div>
              <span className="text-[11px] font-bold tracking-[0.18em] text-green-700 uppercase">
                One platform, two needs
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2 leading-tight">
                Households & businesses have different needs — we cater to each.
              </h2>

              <div className="mt-6 inline-flex bg-gray-100 rounded-lg p-1">
                {[
                  ['home', 'For households'],
                  ['business', 'For businesses'],
                ].map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => setTab(key)}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                      tab === key
                        ? 'bg-white shadow-sm text-gray-900'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#f7f9f7] rounded-2xl p-6 sm:p-8"
              >
                <h3 className="text-xl font-bold text-gray-900">{active.title}</h3>
                <p className="text-sm text-gray-500 mt-1 mb-6">{active.sub}</p>
                <ul className="space-y-5">
                  {active.points.map(([head, body]) => (
                    <li key={head} className="flex gap-3">
                      <span className="mt-1 w-5 h-5 rounded-full bg-green-100 text-green-700 flex items-center justify-center flex-shrink-0">
                        <FaCheckCircle className="text-[10px]" />
                      </span>
                      <div>
                        <div className="text-sm font-semibold text-gray-900">{head}</div>
                        <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{body}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}