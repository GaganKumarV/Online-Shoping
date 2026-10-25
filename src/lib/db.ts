import mysql, { Pool } from 'mysql2/promise';
import { Product, ProductFilterParams } from '@/types';

// Fallback products representing the exact seeded MySQL data for zero-config Vercel deployment
const FALLBACK_PRODUCTS: Product[] = [
  // Ceramics
  {
    id: 1,
    name: 'Earthen Terracotta Tall Fluted Vase',
    slug: 'earthen-terracotta-tall-vase',
    price: 2450,
    description: 'Hand-thrown on traditional potter wheels in rural Rajasthan. Raw terracotta exterior with a water-sealed glazed interior, perfect for dry botanicals or fresh blooms.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.90,
  },
  {
    id: 2,
    name: 'Speckled Stoneware Minimalist Chai Set',
    slug: 'speckled-stoneware-chai-set',
    price: 1650,
    description: 'Set of four artisanal stoneware cups finished with a reactive matte speckled glaze. Retains warmth and feels organic in the hands.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    stock: 35,
    rating: 4.85,
  },
  {
    id: 3,
    name: 'Hand-Sculpted Wabi-Sabi Ceramic Bowl',
    slug: 'wabi-sabi-ceramic-bowl',
    price: 1890,
    description: 'Organically shaped stoneware serving bowl celebrating subtle asymmetries and raw earthy textures. Food-safe lead-free glaze.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.95,
  },
  {
    id: 4,
    name: 'Charcoal Glaze Ribbed Ceramic Planter',
    slug: 'charcoal-ribbed-ceramic-planter',
    price: 1450,
    description: 'Heavy studio ceramic planter with vertical tactile fluting and drainage hole. Fits indoor succulents, monsteras, and ficus.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    stock: 28,
    rating: 4.75,
  },
  {
    id: 5,
    name: 'Sandstone Ceramic Pitcher & Carafe',
    slug: 'sandstone-ceramic-carafe',
    price: 2150,
    description: 'Tactile beige ceramic pitcher featuring an ergonomic curved handle and precision pouring lip. Holds 1.2 liters.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.80,
  },
  {
    id: 6,
    name: 'Terracotta Hand-Poured Scented Candle',
    slug: 'terracotta-scented-candle',
    price: 950,
    description: 'Soy wax infused with sandalwood, cedar, and vetiver poured into a reusable unglazed terracotta vessel with cotton wick.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    stock: 45,
    rating: 4.85,
  },
  {
    id: 7,
    name: 'Raw Ochre Ceramic Incense Burner',
    slug: 'raw-ochre-ceramic-incense-burner',
    price: 750,
    description: 'Sculptural incense dish crafted from red clay. Catches falling ash effortlessly while adding quiet grounding aesthetics.',
    category: 'ceramics',
    image_url: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80',
    stock: 50,
    rating: 4.70,
  },
  // Textiles
  {
    id: 8,
    name: 'Handwoven Cotton Dhurrie Throw Blanket',
    slug: 'handwoven-cotton-dhurrie-throw',
    price: 3200,
    description: 'Crafted from 100% unbleached organic cotton by master weavers in Panipat. Features subtle textured herringbone stripes and hand-tied fringes.',
    category: 'textiles',
    image_url: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80',
    stock: 25,
    rating: 4.90,
  },
  {
    id: 9,
    name: 'Natural Indigo Block-Printed Linen Cushion',
    slug: 'indigo-block-printed-cushion',
    price: 1250,
    description: 'Pure Belgian flax linen hand-block printed using botanical indigo dyes. Features hidden brass zipper and piped edges (45x45 cm).',
    category: 'textiles',
    image_url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    stock: 30,
    rating: 4.80,
  },
  {
    id: 10,
    name: 'Waffle-Weave Raw Linen Table Runner',
    slug: 'waffle-weave-linen-table-runner',
    price: 1850,
    description: 'Pre-washed pure European linen with an airy honeycomb texture. Gives any dining setup an effortless, relaxed farmhouse warmth.',
    category: 'textiles',
    image_url: 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.75,
  },
  {
    id: 11,
    name: 'Hand-Quilted Organic Kantha Bedspread',
    slug: 'hand-quilted-kantha-bedspread',
    price: 5400,
    description: 'Layers of soft vintage cotton stitched together with thousands of delicate Kantha running stitches by women artisans in Bengal.',
    category: 'textiles',
    image_url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    stock: 12,
    rating: 4.95,
  },
  {
    id: 12,
    name: 'Oatmeal Slub Textured Cushion Cover Set',
    slug: 'oatmeal-slub-cushion-set',
    price: 1950,
    description: 'Set of two heavy textured slub cotton covers in warm oat and sand tones. Earthy, durable, and machine washable.',
    category: 'textiles',
    image_url: 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80',
    stock: 32,
    rating: 4.70,
  },
  {
    id: 13,
    name: 'Hand-Braided Jute & Chindi Floor Rug',
    slug: 'hand-braided-jute-rug',
    price: 4200,
    description: 'Natural sustainable golden jute fiber braided with recycled cotton yarns. Reversible, hard-wearing, and deeply textured (120 cm diameter).',
    category: 'textiles',
    image_url: 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.85,
  },
  // Lighting
  {
    id: 14,
    name: 'Hand-Woven Cane & Bamboo Pendant Light',
    slug: 'bamboo-cane-pendant-light',
    price: 3850,
    description: 'Artisan-woven natural cane drum shade that casts warm, patterned ambient shadows across dining tables or living room corners.',
    category: 'lighting',
    image_url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
    stock: 16,
    rating: 4.90,
  },
  {
    id: 15,
    name: 'Muted Clay Ceramic Table Lamp with Linen Shade',
    slug: 'clay-ceramic-table-lamp',
    price: 4650,
    description: 'Handmade ceramic base in warm almond clay paired with a bespoke oatmeal linen empire shade. Warm 2700K ambient illumination.',
    category: 'lighting',
    image_url: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
    stock: 14,
    rating: 4.85,
  },
  {
    id: 16,
    name: 'Fluted Brass & Matte Opal Glass Sconce',
    slug: 'brass-opal-glass-sconce',
    price: 3450,
    description: 'Hand-brushed solid brass mount with a frosted glass orb diffuser. Subtle mid-century minimalism made for reading nooks and hallways.',
    category: 'lighting',
    image_url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    stock: 20,
    rating: 4.80,
  },
  {
    id: 17,
    name: 'Hand-Turned Sheesham Wood Desk Lamp',
    slug: 'sheesham-wood-desk-lamp',
    price: 3990,
    description: 'Turned from sustainably reclaimed Indian rosewood with adjustable brass tension knobs and woven fabric cord.',
    category: 'lighting',
    image_url: 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80',
    stock: 10,
    rating: 4.75,
  },
  {
    id: 18,
    name: 'Perforated Terracotta Lantern',
    slug: 'perforated-terracotta-lantern',
    price: 1850,
    description: 'Hand-pierced constellation patterns that project intricate star-like illumination when fitted with a warm bulb or candle.',
    category: 'lighting',
    image_url: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80',
    stock: 24,
    rating: 4.65,
  },
  {
    id: 19,
    name: 'Rattan Scalloped Floor Lamp',
    slug: 'rattan-scalloped-floor-lamp',
    price: 6800,
    description: 'Tall statement floor lamp crafted with natural steamed rattan poles and a flared woven bonnet. Warm, organic visual centerpiece.',
    category: 'lighting',
    image_url: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80',
    stock: 8,
    rating: 4.90,
  },
  // Decor
  {
    id: 20,
    name: 'Hand-Carved Teakwood Decorative Serving Board',
    slug: 'carved-teakwood-serving-board',
    price: 2250,
    description: 'Carved from single-block reclaimed teakwood, finished with organic coconut oil and beeswax. Perfect for cheeses, mezze, or display.',
    category: 'decor',
    image_url: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    stock: 28,
    rating: 4.85,
  },
  {
    id: 21,
    name: 'Hand-Beaten Solid Brass Footed Planter',
    slug: 'hand-beaten-brass-planter',
    price: 3600,
    description: 'Hammered by traditional metalsmiths in Moradabad. Warm unlacquered brass that matures with a beautiful, natural living patina.',
    category: 'decor',
    image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    stock: 18,
    rating: 4.90,
  },
  {
    id: 22,
    name: 'Sculptural Steatite Soapstone Bookends',
    slug: 'steatite-soapstone-bookends',
    price: 2850,
    description: 'Set of two heavy geometric bookends hand-chiseled from natural Agra soapstone. Features unique natural marble-like veining.',
    category: 'decor',
    image_url: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    stock: 15,
    rating: 4.75,
  },
  {
    id: 23,
    name: 'Hand-Woven Sabai Grass Storage Baskets',
    slug: 'sabai-grass-storage-baskets',
    price: 2400,
    description: 'Nesting trio of versatile storage hampers hand-coiled from wild Sabai grass and cotton cord by rural artisan collectives in Odisha.',
    category: 'decor',
    image_url: 'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&w=800&q=80',
    stock: 22,
    rating: 4.80,
  },
  {
    id: 24,
    name: 'Turned Mango Wood Pillar Candle Holders (Trio)',
    slug: 'mango-wood-pillar-candle-holders',
    price: 2650,
    description: 'Set of three graduating height candle stands turned from sustainably felled mango wood with matte walnut stain.',
    category: 'decor',
    image_url: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80',
    stock: 19,
    rating: 4.85,
  },
  {
    id: 25,
    name: 'Hand-Cast Bell Metal Minimalist Wind Bell',
    slug: 'bell-metal-wind-bell',
    price: 1750,
    description: 'Cast using lost-wax brass and bronze techniques. Produces a resonant, meditative acoustic chime in the slightest evening breeze.',
    category: 'decor',
    image_url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    stock: 26,
    rating: 4.90,
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
      result.sort((a, b) => b.rating - a.rating);
  }

  return result;
}

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

export async function getFeaturedProducts(limit = 8): Promise<Product[]> {
  const products = await getProducts({ sort: 'rating' });
  return products.slice(0, limit);
}

export async function getRelatedProducts(
  category: string,
  currentSlug: string,
  limit = 4
): Promise<Product[]> {
  const products = await getProducts({ category });
  return products.filter((p) => p.slug !== currentSlug).slice(0, limit);
}

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
