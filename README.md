# ScrapUncle ♻️ – MERN Stack Project

ScrapUncle is a recycling and upcycling platform designed to make waste management easier and more valuable. It connects customers who want to sell scrap with verified collectors, recycling partners, and buyers interested in eco-friendly products.

### Core Features (Phase 1–4)
- JWT-based authentication with role-based access for Admin, Collector, and Customer.
- Scrap categories and admin-managed scrap prices.
- Scrap pickup booking with automatic price calculation.
- Collector dashboard to accept and manage pickup requests.
- Pickup tracking from booking to successful collection.
- Product marketplace with Cash on Delivery orders.
- Admin dashboard with statistics, charts, approvals, collector assignments, and scrap rate management.

### Additional Features (V2)
- Razorpay payment integration with checkout, verification, webhooks, and refunds.
- In-app and email notifications.
- Cloudinary image uploads.
- Wishlist and product reviews.
- Coupon management.
- Seller and recycling partner dashboards.
- PDF invoice generation.
- Activity audit logs.
- Reusable UI components and smooth animations with reduced-motion support.

### Tech Stack
React.js, Node.js, Express.js, MongoDB, Mongoose, JWT, Razorpay, Cloudinary, and Tailwind CSS.

### Setup Instructions

1. Start the backend:
   - `cd server`
   - `cp .env.example .env`
   - `npm install`
   - `npm run seed`
   - `npm run dev`

2. Start the frontend:
   - `cd client`
   - `npm install`
   - `npm run dev`

3. Open `http://localhost:5173`.

### Important Notes
- Demo accounts are available after running the seed script. Change their passwords before any real use.
- Configure your environment variables before enabling external services.
- Razorpay should be tested in test mode first.
- Email, SMS, WhatsApp and Cloudinary require valid provider credentials and configuration.
- Some V2 features currently have API support but do not yet have dedicated frontend screens.
- The project has not yet been fully tested against a live MongoDB environment, so further testing and improvements are required.

### Our Vision
Our goal is simple: collect waste, give it a second life, and turn it into something useful. We want to make recycling convenient while creating opportunities for collectors, recyclers, and sustainable product sellers.

**ScrapUncle – Your Waste. Our Responsibility. A Greener Future.**
