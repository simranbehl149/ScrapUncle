# ScrapUncle (MERN) – Phase 1-4 core
Run: 1) `cd server && cp .env.example .env && npm i && npm run seed && npm run dev`  2) `cd client && npm i && npm run dev` (open http://localhost:5173)
Demo logins after seed (change before any real use): admin@scrapuncle.test / Admin@12345, collector@scrapuncle.test / Collector@123, customer@scrapuncle.test / Customer@123
Done: JWT auth + roles, scrap rates (admin-editable), bookings with server-side pricing, collector pickup flow (Pending>Accepted>On the way>Collected>Weighed>Completed, verified collectors only), products + COD orders, admin panel (stats, charts, approvals, rates, assign collectors).
Not built yet: Razorpay, email/SMS, Cloudinary uploads, partner/seller dashboards, reviews, wishlist, coupons, audit logs. Nothing here has been run against a live MongoDB yet; test before use.

## v2 additions
Layered new code: `server/src/{routes/extra.js,controllers,services}`. Razorpay checkout/verify/webhook (raw body, HMAC)/admin refund; in-app + email notifications (SMTP env); SMS/WhatsApp via `registerChannel()` once a provider is configured; Cloudinary uploads (3 MB, JPG/PNG/WebP); wishlist; reviews (buyers only); coupons; audit log; PDF invoices; seller and partner dashboards; reusable `client/src/ui.jsx` components; reveal, skeleton and float animations (reduced-motion safe).
Set the Razorpay webhook URL to `/api/payments/webhook` with event `payment.captured`. Test in Razorpay test mode first. Run `npm i` again in `server` for the new packages.
API only (no screen yet): refunds, coupons, audit log, review posting, wishlist list, invoice download. Old `routes.js` is still monolithic. Abandoned online checkouts keep stock reserved until a cleanup job is added.
