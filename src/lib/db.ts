import mysql, { Pool } from 'mysql2/promise';
import { Product, ProductFilterParams } from '@/types';

// Fallback products representing the exact seeded MySQL data for zero-config Vercel deployment
const FALLBACK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'The Pragmatic Programmer: 20th Anniversary Edition',
    slug: 'the-pragmatic-programmer',
    price: 1899,
    description: 'One of the most significant books in software engineering. Illustrates modern best practices for software development, personal responsibility, and career development.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    stock: 35,
    rating: 4.90,
  },
  {
    id: 2,
    name: 'Designing Data-Intensive Applications',
    slug: 'designing-data-intensive-applications',
    price: 2499,
    description: 'The definitive guide to the architecture and principles of reliable, scalable, and maintainable systems by Martin Kleppmann.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.95,
  },
  {
    id: 3,
    name: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    slug: 'clean-code',
    price: 1450,
    description: 'Robert C. Martin introduces revolutionary principles of software craftsmanship to write clean, robust, and readable code.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.70,
  },
  {
    id: 4,
    name: "You Don't Know JS Yet: Get Started",
    slug: 'you-dont-know-js-yet',
    price: 799,
    description: 'Kyle Simpson dives deep into the core mechanisms of JavaScript, scope, closures, and the modern JavaScript ecosystem.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80',
    stock: 40,
    rating: 4.80,
  },
  {
    id: 5,
    name: 'Deep Learning by Ian Goodfellow',
    slug: 'deep-learning-ian-goodfellow',
    price: 3200,
    description: 'The comprehensive MIT textbook covering mathematical background, deep feedforward networks, convolutional networks, and generative models.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.85,
  },
  {
    id: 6,
    name: "System Design Interview – An Insider's Guide",
    slug: 'system-design-interview-insider-guide',
    price: 1999,
    description: 'Alex Xu explains step-by-step methodologies to ace real-world distributed system design interviews with clear diagrams.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    rating: 4.90,
  },
  {
    id: 7,
    name: 'JavaScript: The Definitive Guide (7th Edition)',
    slug: 'javascript-definitive-guide-7th',
    price: 2199,
    description: 'David Flanagan provides the master reference for modern web development, ECMAScript 2020+, Node.js, and browser APIs.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.65,
  },
  {
    id: 8,
    name: 'Structure and Interpretation of Computer Programs',
    slug: 'sicp-computer-programs',
    price: 2850,
    description: "Harold Abelson and Gerald Jay Sussman's world-famous MIT curriculum exploring computation, abstraction, and functional programming.",
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    rating: 4.80,
  },
  {
    id: 9,
    name: 'Grokking Algorithms: An Illustrated Guide',
    slug: 'grokking-algorithms',
    price: 1299,
    description: 'Aditya Bhargava makes fundamental algorithms fun and visual with easy-to-follow illustrations and real-world examples.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=800&q=80',
    stock: 50,
    rating: 4.85,
  },
  {
    id: 10,
    name: 'Building Microservices (2nd Edition)',
    slug: 'building-microservices-2nd',
    price: 2350,
    description: 'Sam Newman discusses principles, integration patterns, deployment strategies, and evolutionary architectures.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.70,
  },
  {
    id: 11,
    name: 'The Phoenix Project: A Novel about IT & DevOps',
    slug: 'the-phoenix-project',
    price: 899,
    description: 'Gene Kim, Kevin Behr, and George Spafford describe how DevOps principles turn IT organizations around to win in the market.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80',
    stock: 28,
    rating: 4.75,
  },
  {
    id: 12,
    name: 'Refactoring: Improving the Design of Existing Code',
    slug: 'refactoring-improving-design',
    price: 2650,
    description: 'Martin Fowler offers battle-tested techniques to improve code maintainability, cleanliness, and structural integrity.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.80,
  },
  {
    id: 13,
    name: 'Domain-Driven Design: Tackling Complexity',
    slug: 'domain-driven-design-eric-evans',
    price: 2999,
    description: 'Eric Evans presents a systematic approach to connecting complex software implementation to an evolving model of the core business.',
    category: 'books',
    image_url: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    rating: 4.60,
  },
  {
    id: 14,
    name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
    slug: 'sony-wh-1000xm5-headphones',
    price: 26990,
    description: 'Industry-leading noise cancellation with two processors and 8 microphones. Exceptional Hi-Res audio with up to 30-hour battery life.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.85,
  },
  {
    id: 15,
    name: 'Apple iPad Air (M2, 11-inch, 128GB - Space Grey)',
    slug: 'apple-ipad-air-m2-11-inch',
    price: 59900,
    description: 'Powered by the astonishingly fast M2 chip. Liquid Retina display, Wi-Fi 6E, 12MP landscape front camera, and all-day battery life.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.90,
  },
  {
    id: 16,
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    slug: 'logitech-mx-master-3s-mouse',
    price: 8995,
    description: 'Quiet clicks, 8K DPI tracking on any surface including glass, MagSpeed electromagnetic scrolling, and ergonomic hand sculpt.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80',
    stock: 45,
    rating: 4.85,
  },
  {
    id: 17,
    name: 'Keychron K2 Pro Wireless Custom Mechanical Keyboard',
    slug: 'keychron-k2-pro-keyboard',
    price: 9499,
    description: 'QMK/VIA wireless custom mechanical keyboard, south-facing RGB, hot-swappable switches, sound-absorbing foam, and PBT keycaps.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.75,
  },
  {
    id: 18,
    name: 'Dell UltraSharp 27 4K USB-C Hub Monitor (U2723QE)',
    slug: 'dell-ultrasharp-27-4k-monitor',
    price: 49990,
    description: 'Brilliant 4K IPS Black technology with 2000:1 contrast ratio, 90W USB-C power delivery, RJ45 Ethernet, and wide color gamut (98% DCI-P3).',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    rating: 4.80,
  },
  {
    id: 19,
    name: 'Kindle Paperwhite (16 GB, 6.8" glare-free display)',
    slug: 'kindle-paperwhite-16gb',
    price: 14999,
    description: '6.8" display with thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    stock: 32,
    rating: 4.70,
  },
  {
    id: 20,
    name: 'Anker 737 Power Bank (PowerCore 24K, 140W)',
    slug: 'anker-737-power-bank-24k',
    price: 11999,
    description: 'Ultra-powerful two-way charging with Power Delivery 3.1 and smart digital display showing output power and remaining recharge time.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1609592426508-cc061c572c67?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.80,
  },
  {
    id: 21,
    name: 'Bose QuietComfort 45 Bluetooth Wireless Headphones',
    slug: 'bose-quietcomfort-45-headphones',
    price: 22900,
    description: 'The iconic quiet, comfort, and sound. TriPort acoustic architecture delivers deep, full sound, with Aware Mode and 24-hour battery.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
    stock: 16,
    rating: 4.65,
  },
  {
    id: 22,
    name: 'SanDisk 2TB Extreme Portable SSD (up to 1050MB/s)',
    slug: 'sandisk-2tb-extreme-portable-ssd',
    price: 15499,
    description: 'Fast NVMe solid state performance featuring up to 1050MB/s read and 1000MB/s write speeds in a ruggedized, drop-resistant drive.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    rating: 4.80,
  },
  {
    id: 23,
    name: 'Raspberry Pi 5 (8GB RAM Single Board Computer)',
    slug: 'raspberry-pi-5-8gb-ram',
    price: 7850,
    description: 'Featuring a 64-bit quad-core Arm Cortex-A76 processor running at 2.4GHz, dual 4Kp60 HDMI display outputs, and PCIe 2.0 interface.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&w=800&q=80',
    stock: 24,
    rating: 4.90,
  },
  {
    id: 24,
    name: 'Elgato Stream Deck MK.2 (15 LCD keys)',
    slug: 'elgato-stream-deck-mk2',
    price: 13490,
    description: '15 customizable LCD keys to control apps, tools, and platforms. One-touch tactile operation with visual feedback.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.70,
  },
  {
    id: 25,
    name: 'Google Pixel Buds Pro 2 (Active Noise Cancellation)',
    slug: 'google-pixel-buds-pro-2',
    price: 21900,
    description: 'Engineered with the Tensor A1 chip for premium audio, Silent Seal 2.0 active noise cancellation, and all-day ergonomic fit.',
    category: 'electronics',
    image_url: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.60,
  },
];

let pool: Pool | null = null;

function getPool(): Pool | null {
  if (pool) return pool;

  const host = process.env.MYSQL_HOST;
  const user = process.env.MYSQL_USER;
  const password = process.env.MYSQL_PASSWORD;
  const database = process.env.MYSQL_DATABASE;
  const port = Number(process.env.MYSQL_PORT) || 3306;

  if (!host || !user || !database) {
    return null;
  }

  try {
    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 4000,
    });
    return pool;
  } catch (error) {
    console.error('Failed to create MySQL pool:', error);
    return null;
  }
}

/**
 * Normalizes MySQL row data into Product interface
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapRowToProduct(row: any): Product {
  return {
    id: Number(row.id),
    name: String(row.name),
    slug: String(row.slug),
    price: Number(row.price),
    description: String(row.description),
    category: String(row.category),
    image_url: String(row.image_url),
    stock: Number(row.stock),
    rating: Number(row.rating),
    created_at: row.created_at ? new Date(row.created_at).toISOString() : undefined,
  };
}

/**
 * Filter and sort products in-memory (used as fallback or testing)
 */
function filterInMemory(products: Product[], params?: ProductFilterParams): Product[] {
  let result = [...products];

  if (params?.category && params.category !== 'all') {
    result = result.filter(
      (p) => p.category.toLowerCase() === params.category!.toLowerCase()
    );
  }

  if (params?.search) {
    const q = params.search.toLowerCase().trim();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  if (params?.minPrice !== undefined) {
    result = result.filter((p) => p.price >= params.minPrice!);
  }

  if (params?.maxPrice !== undefined) {
    result = result.filter((p) => p.price <= params.maxPrice!);
  }

  switch (params?.sort) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => b.id - a.id);
      break;
    default:
      // featured - sorted by rating then id
      result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

/**
 * Fetch products from MySQL with optional search, category, and sorting filters.
 */
export async function getProducts(params?: ProductFilterParams): Promise<Product[]> {
  const db = getPool();
  if (!db) {
    return filterInMemory(FALLBACK_PRODUCTS, params);
  }

  try {
    let query = 'SELECT * FROM products WHERE 1=1';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any[] = [];

    if (params?.category && params.category !== 'all') {
      query += ' AND LOWER(category) = LOWER(?)';
      values.push(params.category);
    }

    if (params?.search) {
      query += ' AND (LOWER(name) LIKE ? OR LOWER(description) LIKE ? OR LOWER(category) LIKE ?)';
      const searchPattern = `%${params.search.toLowerCase().trim()}%`;
      values.push(searchPattern, searchPattern, searchPattern);
    }

    if (params?.minPrice !== undefined) {
      query += ' AND price >= ?';
      values.push(params.minPrice);
    }

    if (params?.maxPrice !== undefined) {
      query += ' AND price <= ?';
      values.push(params.maxPrice);
    }

    switch (params?.sort) {
      case 'price-asc':
        query += ' ORDER BY price ASC';
        break;
      case 'price-desc':
        query += ' ORDER BY price DESC';
        break;
      case 'rating':
        query += ' ORDER BY rating DESC';
        break;
      case 'newest':
        query += ' ORDER BY id DESC';
        break;
      default:
        query += ' ORDER BY rating DESC, id ASC';
    }

    const [rows] = await db.query(query, values);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (rows as any[]).map(mapRowToProduct);
  } catch (error) {
    console.warn('MySQL query failed, using seeded catalog fallback:', error);
    return filterInMemory(FALLBACK_PRODUCTS, params);
  }
}

/**
 * Fetch a single product by unique slug
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const db = getPool();
  if (!db) {
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) || null;
  }

  try {
    const [rows] = await db.query('SELECT * FROM products WHERE slug = ? LIMIT 1', [slug]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items = rows as any[];
    if (items.length > 0) {
      return mapRowToProduct(items[0]);
    }
    return null;
  } catch (error) {
    console.warn('MySQL getProductBySlug query failed, using fallback:', error);
    return FALLBACK_PRODUCTS.find((p) => p.slug === slug) || null;
  }
}

/**
 * Fetch featured products for homepage
 */
export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getProducts({ sort: 'rating' });
  return products.slice(0, limit);
}

/**
 * Fetch related products in the same category
 */
export async function getRelatedProducts(
  category: string,
  currentSlug: string,
  limit = 4
): Promise<Product[]> {
  const products = await getProducts({ category });
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

/**
 * Get distinct categories with count
 */
export async function getCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const products = await getProducts();
  const counts: Record<string, number> = {};

  products.forEach((p) => {
    const cat = p.category.toLowerCase();
    counts[cat] = (counts[cat] || 0) + 1;
  });

  return Object.entries(counts).map(([slug, count]) => ({
    name: slug.charAt(0).toUpperCase() + slug.slice(1),
    slug,
    count,
  }));
}
