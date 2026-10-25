# GDG.com – Curated Online Shopping Store

A fast, accessible, and polished online shopping application built from scratch with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and connected to a live **MySQL database** (via connection pooling and MCP server integration).

---

## ⚡ Quick Start

### 1. Prerequisites
- **Node.js**: v18+ (tested on Node v24)
- **MySQL**: 8.0+ running locally or in the cloud (optional for testing, app includes fallback for zero-config Vercel deployment)

### 2. Environment Setup
Copy the `.env.example` file to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your credentials in `.env.local`:
```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=Gagan
MYSQL_PASSWORD=your_password
MYSQL_DATABASE=gagan

NEXT_PUBLIC_STORE_NAME=GDG.com
NEXT_PUBLIC_CURRENCY=₹
NEXT_PUBLIC_CURRENCY_CODE=INR
```

### 3. Database Initialization & Seeding
The database schema and 25 realistic sample products across **Books** and **Electronics** are provided in `seed.sql`.

Execute using MySQL CLI or MySQL Workbench:
```bash
mysql -u Gagan -p gagan < seed.sql
```

The table schema created is:
```sql
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  price DECIMAL(10, 2) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  rating DECIMAL(3, 2) NOT NULL DEFAULT 5.0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 4. Install & Run
```bash
# Install dependencies
npm install

# Run unit tests
npm test

# Run local development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```
Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Key Features

1. **Homepage (`/`)**:
   - Modern hero section with value propositions and high-contrast call-to-actions.
   - Category navigation banners for **Software Books** and **Developer Hardware**.
   - Featured products grid loaded directly from MySQL.
   - Trust and guarantee badges (100% Genuine, Free Delivery > ₹999, 7-day replacement).

2. **Product Catalog (`/products`)**:
   - Interactive category pills (All, Books, Electronics with counts).
   - Instant search input matching name, description, and categories.
   - Comprehensive sorting: *Featured*, *Price: Low to High*, *Price: High to Low*, *Rating*, and *Newest*.
   - Responsive grid with clear empty states and filter reset.

3. **Product Detail (`/products/[slug]`)**:
   - High-resolution product images optimized with `next/image`.
   - Verified rating star breakdown and stock indicators.
   - Quantity selector bounded by inventory limits.
   - Quick Add to Cart button with real-time stock feedback.
   - Dynamic related products recommendation within the same category.
   - Dynamic SEO meta tags and Open Graph preview cards.

4. **Cart System (Slide-out Drawer + Full Page `/cart`)**:
   - React Context state persisted across sessions with `localStorage`.
   - Non-blocking slide-out drawer accessible from any page via the header.
   - Full dedicated `/cart` page with line item management, unit vs total prices, and clear cart option.
   - Automatic calculation of subtotal, 18% GST, and conditional free delivery over ₹999.

5. **Multi-Step Checkout (`/checkout`)**:
   - Form validation for contact (email, phone) and shipping destination.
   - Multiple payment options: Credit/Debit Card, UPI (VPA), NetBanking, and Cash on Delivery.
   - Real-time stock verification and order ID generation.

6. **Order Confirmation (`/order-confirmation/[orderId]`)**:
   - Confetti celebration effect on purchase completion.
   - Detailed receipt breakdown, shipping estimation, and delivery progress status.
   - Printable order invoice via native browser print dialogue.

7. **404 & Error Boundaries**:
   - Custom `not-found.tsx` and `error.tsx` with friendly recovery actions.

---

## 💳 Swapping Mock Payment for Stripe

The checkout architecture is designed for drop-in Stripe payment integration:

1. Install Stripe libraries:
   ```bash
   npm install stripe @stripe/stripe-js
   ```

2. Add Stripe API keys to `.env.local`:
   ```env
   STRIPE_SECRET_KEY=sk_test_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
   ```

3. In `src/app/api/checkout/route.ts`, initialize the Stripe Payment Intent:
   ```typescript
   import Stripe from 'stripe';
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' });

   // Inside POST handler:
   const paymentIntent = await stripe.paymentIntents.create({
     amount: Math.round(total * 100), // amount in paise
     currency: 'inr',
     automatic_payment_methods: { enabled: true },
     metadata: { orderNumber },
   });

   return NextResponse.json({
     success: true,
     clientSecret: paymentIntent.client_secret,
     order,
   });
   ```

4. In `src/app/checkout/page.tsx`, mount the `@stripe/react-stripe-js` `<PaymentElement />` using the returned `clientSecret`.

---

## ☁️ Deploying to Vercel (Zero Extra Configuration)

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Import the project into your Vercel Dashboard.
3. Framework preset: **Next.js** (auto-detected).
4. Environment variables (optional):
   - If using a cloud MySQL instance (e.g., PlanetScale, TiDB, Aiven, Railway, or AWS RDS), set `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, and `MYSQL_DATABASE`.
   - If no MySQL environment variables are configured, the application includes a seamless fallback to the exact 25-item curated dataset, ensuring **builds succeed with zero errors and zero required configuration**.
5. Click **Deploy**.

---

## ✏️ How to Edit or Add Products

To add new products to the catalog:
1. **Via SQL**:
   ```sql
   INSERT INTO products (name, slug, price, description, category, image_url, stock, rating)
   VALUES ('New Product Title', 'new-product-slug', 1999.00, 'Product description...', 'books', 'https://...', 25, 4.8);
   ```
2. **Via MySQL MCP Server**:
   Use the MySQL MCP `execute_query` tool to run queries and verify listings.

---

## 🧪 Testing

The cart state logic is verified using Node's native test runner (`node:test`):
```bash
npm test
```
The test suite in `src/tests/cart.test.mjs` verifies:
- Adding items to empty carts
- Incrementing quantities
- Stock bounds clamping
- Out-of-stock prevention
- Item removal and quantity reduction to 0
- Financial calculations (tax, shipping threshold at ₹999, subtotal)
