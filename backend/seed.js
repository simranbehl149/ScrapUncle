const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');
const Admin = require('./models/Admin');
const Product = require('./models/Product');
const Pickup = require('./models/Pickup');
const Order = require('./models/Order');

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('🌱 Connected');

    await Promise.all([
      User.deleteMany(),
      Admin.deleteMany(),
      Product.deleteMany(),
      Pickup.deleteMany(),
      Order.deleteMany(),
    ]);

    await Admin.create({
      fullName: 'Super Admin',
      email: 'admin@scrapuncle.com',
      password: 'admin123',
    });

    const users = await User.create([
      {
        fullName: 'Aarti Rao',
        email: 'aarti@example.com',
        password: 'password123',
        phone: '+91 9876543210',
        address: { houseNo: '123', street: 'MG Road', city: 'Bengaluru', pincode: '560001' },
      },
      {
        fullName: 'Karan Malhotra',
        email: 'karan@example.com',
        password: 'password123',
        phone: '+91 9876543211',
        address: { houseNo: '456', street: 'Bandra West', city: 'Mumbai', pincode: '400050' },
      },
      {
        fullName: 'Simran Kaur',
        email: 'simran@example.com',
        password: 'password123',
        phone: '+91 9876543212',
        address: { houseNo: '789', street: 'Connaught Place', city: 'Delhi', pincode: '110001' },
      },
    ]);

    // const products = await Product.create([
    //   {
    //     name: 'Reclaimed Wood Coffee Table',
    //     description: 'Handcrafted coffee table made from reclaimed wood',
    //     price: 4499,
    //     originalPrice: 5999,
    //     category: 'Furniture',
    //     stock: 5,
    //     image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=600',
    //     material: 'Reclaimed wood',
    //     rating: 4.8,
    //   },
    //   {
    //     name: 'Recycled Glass Pendant Lamp',
    //     description: 'Elegant pendant lamp made from recycled glass bottles',
    //     price: 1899,
    //     originalPrice: 2499,
    //     category: 'Decor',
    //     stock: 8,
    //     image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600',
    //     material: 'Recycled glass',
    //     rating: 4.7,
    //   },
    //   {
    //     name: 'Upcycled Paper Notebook (Pack of 3)',
    //     description: 'Eco-friendly notebooks made from recycled paper',
    //     price: 349,
    //     originalPrice: 499,
    //     category: 'Stationery',
    //     stock: 20,
    //     image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=600',
    //     material: 'Recycled paper',
    //     rating: 4.9,
    //   },
    //   {
    //     name: 'Tyre Rubber Planter',
    //     description: 'Unique planter made from upcycled tyres',
    //     price: 799,
    //     originalPrice: 1299,
    //     category: 'Planters',
    //     stock: 12,
    //     image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600',
    //     material: 'Recycled rubber',
    //     rating: 4.6,
    //   },
    //   {
    //     name: 'Cement Bag Tote',
    //     description: 'Stylish tote bag made from recycled cement bags',
    //     price: 599,
    //     originalPrice: 899,
    //     category: 'Bags',
    //     stock: 6,
    //     image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600',
    //     material: 'Recycled fabric',
    //     rating: 4.7,
    //   },
    //   {
    //     name: 'Refurbished Bluetooth Speaker',
    //     description: 'Refurbished speaker with great sound quality',
    //     price: 1299,
    //     originalPrice: 2499,
    //     category: 'Electronics',
    //     stock: 0,
    //     isSoldOut: true,
    //     image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=600',
    //     material: 'Refurbished electronics',
    //     rating: 4.5,
    //   },
    // ]);
    const products = await Product.create([
  {
    name: 'Reclaimed Wood Coffee Table',
    description:
      'Built from 30-year-old teak salvaged from a demolished bungalow in Jodhpur. Each top has visible knots, nail marks and grain variation — no two tables are the same. Sealed with a food-safe natural oil finish, so you can sand it back and re-oil in years to come instead of throwing it out.',
    price: 4499,
    originalPrice: 5999,
    category: 'Furniture',
    stock: 5,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
    images: [
      'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800',
      'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=800',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800',
    ],
    material: 'Reclaimed teak',
    rating: 4.8,
    specs: {
      Dimensions: '110 × 60 × 45 cm',
      Weight: '18 kg',
      Finish: 'Natural oil, matte',
      Assembly: 'Legs screw on, 10 min',
      Origin: 'Jodhpur, Rajasthan',
    },
    reviews: [
      {
        name: 'Vikram S.',
        rating: 5,
        comment:
          'Heavier than I expected — which is a good thing. The grain on mine had a big knot right in the middle that would have been a defect in a normal table, but here it looks intentional. Delivery guy was careful with it too.',
        createdAt: new Date('2026-04-18'),
      },
      {
        name: 'Anjali M.',
        rating: 4,
        comment:
          'Love it, but be ready — mine had a slight wobble on day one. Tightened the legs a bit more and it was fine. The wood smells amazing for the first few weeks.',
        createdAt: new Date('2026-03-22'),
      },
      {
        name: 'Rohit K.',
        rating: 5,
        comment: 'Fits perfectly under my 43-inch TV. No assembly headache. Would buy again.',
        createdAt: new Date('2026-02-10'),
      },
    ],
  },
  {
    name: 'Recycled Glass Pendant Lamp',
    description:
      'Melted from beer and wine bottles collected across Bengaluru. The green tint comes from the original glass, not a dye — so each lamp is a slightly different shade depending on which bottles were in the batch that week. Comes with a 1.5m braided cord and a standard E27 socket. Bulb not included.',
    price: 1899,
    originalPrice: 2499,
    category: 'Decor',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800',
      'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800',
    ],
    material: 'Recycled glass',
    rating: 4.7,
    specs: {
      Diameter: '22 cm',
      Cord: '1.5 m, adjustable',
      Socket: 'E27 (bulb not included)',
      Weight: '1.2 kg',
    },
    reviews: [
      {
        name: 'Priya N.',
        rating: 5,
        comment:
          'The green is deeper than the photos show. Hung it above our dining table — warm bulb makes the whole room feel like a cafe. Getting two more for the bedroom.',
        createdAt: new Date('2026-04-02'),
      },
      {
        name: 'Sahil T.',
        rating: 4,
        comment:
          'Nice weight, good finish. Wish the cord was a bit longer, ended up buying an extension. Otherwise solid.',
        createdAt: new Date('2026-03-15'),
      },
    ],
  },
  {
    name: 'Upcycled Paper Notebook (Pack of 3)',
    description:
      'Made from recycled exam papers and old office printouts. Some pages have faint ghost-printing from whatever was on the other side — we think it adds character, but if you need blank-white pages, this isn\'t for you. 80 sheets per book, dotted ruling, thread-bound so it lies flat.',
    price: 349,
    originalPrice: 499,
    category: 'Stationery',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800',
    material: 'Recycled paper',
    rating: 4.9,
    specs: {
      Pages: '80 per notebook',
      Ruling: 'Dotted',
      Binding: 'Thread-sewn, lies flat',
      Size: 'A5 (14.8 × 21 cm)',
    },
    reviews: [
      {
        name: 'Meera J.',
        rating: 5,
        comment: 'Bought for my kid. She loves that some pages have faint typing from the other side. Cheap enough to gift.',
        createdAt: new Date('2026-05-12'),
      },
      {
        name: 'Arjun B.',
        rating: 5,
        comment: 'Fountain pen friendly — no bleed-through. This is the detail that matters.',
        createdAt: new Date('2026-04-25'),
      },
      {
        name: 'Nisha R.',
        rating: 4,
        comment: 'Great quality but I wish they came in A4 too.',
        createdAt: new Date('2026-03-30'),
      },
    ],
  },
  {
    name: 'Tyre Rubber Planter',
    description:
      'Cut from the sidewall of discarded truck tyres, cleaned and coated with a weatherproof non-toxic paint on the inside (the outside keeps the original tread pattern). Suitable for outdoor use. Drainage hole drilled at the base.',
    price: 799,
    originalPrice: 1299,
    category: 'Planters',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800',
    material: 'Recycled tyre rubber',
    rating: 4.6,
    specs: {
      Diameter: '38 cm',
      Height: '24 cm',
      Drainage: 'One 2cm hole',
      'Suitable for': 'Outdoor / balcony',
    },
    reviews: [
      {
        name: 'Kavya D.',
        rating: 5,
        comment: 'Zero-rust, zero-termite, and my neighbour asked where I got it. Sending her the link.',
        createdAt: new Date('2026-04-08'),
      },
      {
        name: 'Harsh V.',
        rating: 4,
        comment: 'Looks great. Only issue: the inside paint smell lingers for about a week in direct sun. Faded after that.',
        createdAt: new Date('2026-03-01'),
      },
    ],
  },
  {
    name: 'Cement Bag Tote',
    description:
      'Woven from washed cement sacks. The red and blue industrial printing is part of the fabric, so the pattern on yours will differ from the photo — that\'s the point. Lined with a plain cotton interior and a zip closure. Handles are reinforced with stitching at the base.',
    price: 599,
    originalPrice: 899,
    category: 'Bags',
    stock: 6,
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=800',
    material: 'Recycled cement sack + cotton',
    rating: 4.7,
    specs: {
      Dimensions: '38 × 34 × 12 cm',
      Closure: 'Zip',
      Lining: 'Cotton',
      'Strap drop': '28 cm',
    },
    reviews: [
      {
        name: 'Tanvi M.',
        rating: 5,
        comment: 'Sturdier than any tote I own. Carries my laptop + gym stuff without the base sagging.',
        createdAt: new Date('2026-05-03'),
      },
      {
        name: 'Aditya P.',
        rating: 5,
        comment: 'The print on mine is orange and blue, friend\'s is red and green. Love that they\'re all different.',
        createdAt: new Date('2026-04-19'),
      },
    ],
  },
  {
    name: 'Refurbished Bluetooth Speaker',
    description:
      'Fully refurbished Sony SRS-XB13. New battery (9 hours tested), new grill mesh, housing cleaned and polished. Comes with original cable and a 6-month warranty from us — not the manufacturer. Every unit is individually sound-tested before shipping.',
    price: 1299,
    originalPrice: 2499,
    category: 'Electronics',
    stock: 0,
    isSoldOut: true,
    image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800',
    material: 'Refurbished electronics',
    rating: 4.5,
    specs: {
      Battery: '9 hours tested',
      Bluetooth: '5.0',
      Water: 'IP67 (resistant)',
      Warranty: '6 months (ours)',
    },
    reviews: [
      {
        name: 'Faizan A.',
        rating: 5,
        comment: 'Works perfectly. Sound is punchy for its size. Bought two — one for my desk, one for the bathroom.',
        createdAt: new Date('2026-02-28'),
      },
      {
        name: 'Radhika S.',
        rating: 4,
        comment: 'Battery easily does a full day. Only gripe is the refurb sticker on the bottom — cosmetic.',
        createdAt: new Date('2026-01-15'),
      },
    ],
  },
]);

    await Pickup.create([
      {
        userId: users[0]._id,
        category: 'Paper',
        weight: 12,
        address: users[0].address,
        preferredDate: new Date('2026-06-10'),
        contactNumber: users[0].phone,
        amount: 144,
        status: 'Completed',
      },
      {
        userId: users[1]._id,
        category: 'Plastic',
        weight: 8,
        address: users[1].address,
        preferredDate: new Date('2026-06-08'),
        contactNumber: users[1].phone,
        amount: 144,
        status: 'Completed',
      },
      {
        userId: users[2]._id,
        category: 'Metal',
        weight: 15,
        address: users[2].address,
        preferredDate: new Date('2026-06-09'),
        contactNumber: users[2].phone,
        amount: 675,
        status: 'Scheduled',
      },
    ]);

    await Order.create({
      userId: users[0]._id,
      products: [
        {
          productId: products[0]._id,
          name: products[0].name,
          quantity: 1,
          price: products[0].price,
          image: products[0].image,
        },
      ],
      totalAmount: 4499,
      shippingAddress: {
        fullName: users[0].fullName,
        ...users[0].address,
        phone: users[0].phone,
      },
      paymentMethod: 'UPI',
      status: 'Delivered',
    });

    console.log('✅ Seeded');
    console.log('   Admin: admin@scrapuncle.com / admin123');
    console.log('   User : aarti@example.com / password123');
  } catch (err) {
    console.error('❌', err);
  } finally {
    await mongoose.disconnect();
  }
})();