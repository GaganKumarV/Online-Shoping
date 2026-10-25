-- Mati Living: Handcrafted Home Decor Database Schema & Seed Data
USE gagan;

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

-- Replace rows with 25 authentic artisanal home decor items
TRUNCATE TABLE products;

INSERT INTO products (name, slug, price, description, category, image_url, stock, rating) VALUES
-- Ceramics & Pottery
('Earthen Terracotta Tall Fluted Vase', 'earthen-terracotta-tall-vase', 2450.00, 'Hand-thrown on traditional potter wheels in rural Rajasthan. Raw terracotta exterior with a water-sealed glazed interior, perfect for dry botanicals or fresh blooms.', 'ceramics', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80', 22, 4.90),
('Speckled Stoneware Minimalist Chai Set', 'speckled-stoneware-chai-set', 1650.00, 'Set of four artisanal stoneware cups finished with a reactive matte speckled glaze. Retains warmth and feels organic in the hands.', 'ceramics', 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80', 35, 4.85),
('Hand-Sculpted Wabi-Sabi Ceramic Bowl', 'wabi-sabi-ceramic-bowl', 1890.00, 'Organically shaped stoneware serving bowl celebrating subtle asymmetries and raw earthy textures. Food-safe lead-free glaze.', 'ceramics', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=80', 18, 4.95),
('Charcoal Glaze Ribbed Ceramic Planter', 'charcoal-ribbed-ceramic-planter', 1450.00, 'Heavy studio ceramic planter with vertical tactile fluting and drainage hole. Fits indoor succulents, monsteras, and ficus.', 'ceramics', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80', 28, 4.75),
('Sandstone Ceramic Pitcher & Carafe', 'sandstone-ceramic-carafe', 2150.00, 'Tactile beige ceramic pitcher featuring an ergonomic curved handle and precision pouring lip. Holds 1.2 liters.', 'ceramics', 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80', 14, 4.80),
('Terracotta Hand-Poured Scented Candle', 'terracotta-scented-candle', 950.00, 'Soy wax infused with sandalwood, cedar, and vetiver poured into a reusable unglazed terracotta vessel with cotton wick.', 'ceramics', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80', 45, 4.85),
('Raw Ochre Ceramic Incense Burner', 'raw-ochre-ceramic-incense-burner', 750.00, 'Sculptural incense dish crafted from red clay. Catches falling ash effortlessly while adding quiet grounding aesthetics.', 'ceramics', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80', 50, 4.70),

-- Textiles & Throws
('Handwoven Cotton Dhurrie Throw Blanket', 'handwoven-cotton-dhurrie-throw', 3200.00, 'Crafted from 100% unbleached organic cotton by master weavers in Panipat. Features subtle textured herringbone stripes and hand-tied fringes.', 'textiles', 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=800&q=80', 25, 4.90),
('Natural Indigo Block-Printed Linen Cushion', 'indigo-block-printed-cushion', 1250.00, 'Pure Belgian flax linen hand-block printed using botanical indigo dyes. Features hidden brass zipper and piped edges (45x45 cm).', 'textiles', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80', 30, 4.80),
('Waffle-Weave Raw Linen Table Runner', 'waffle-weave-linen-table-runner', 1850.00, 'Pre-washed pure European linen with an airy honeycomb texture. Gives any dining setup an effortless, relaxed farmhouse warmth.', 'textiles', 'https://images.unsplash.com/photo-1528458876861-544fd1761a91?auto=format&fit=crop&w=800&q=80', 20, 4.75),
('Hand-Quilted Organic Kantha Bedspread', 'hand-quilted-kantha-bedspread', 5400.00, 'Layers of soft vintage cotton stitched together with thousands of delicate Kantha running stitches by women artisans in Bengal.', 'textiles', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80', 12, 4.95),
('Oatmeal Slub Textured Cushion Cover Set', 'oatmeal-slub-cushion-set', 1950.00, 'Set of two heavy textured slub cotton covers in warm oat and sand tones. Earthy, durable, and machine washable.', 'textiles', 'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?auto=format&fit=crop&w=800&q=80', 32, 4.70),
('Hand-Braided Jute & Chindi Floor Rug', 'hand-braided-jute-rug', 4200.00, 'Natural sustainable golden jute fiber braided with recycled cotton yarns. Reversible, hard-wearing, and deeply textured (120 cm diameter).', 'textiles', 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=800&q=80', 15, 4.85),

-- Lighting & Lamps
('Hand-Woven Cane & Bamboo Pendant Light', 'bamboo-cane-pendant-light', 3850.00, 'Artisan-woven natural cane drum shade that casts warm, patterned ambient shadows across dining tables or living room corners.', 'lighting', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', 16, 4.90),
('Muted Clay Ceramic Table Lamp with Linen Shade', 'clay-ceramic-table-lamp', 4650.00, 'Handmade ceramic base in warm almond clay paired with a bespoke oatmeal linen empire shade. Warm 2700K ambient illumination.', 'lighting', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80', 14, 4.85),
('Fluted Brass & Matte Opal Glass Sconce', 'brass-opal-glass-sconce', 3450.00, 'Hand-brushed solid brass mount with a frosted glass orb diffuser. Subtle mid-century minimalism made for reading nooks and hallways.', 'lighting', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80', 20, 4.80),
('Hand-Turned Sheesham Wood Desk Lamp', 'sheesham-wood-desk-lamp', 3990.00, 'Turned from sustainably reclaimed Indian rosewood with adjustable brass tension knobs and woven fabric cord.', 'lighting', 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?auto=format&fit=crop&w=800&q=80', 10, 4.75),
('Perforated Terracotta Lantern', 'perforated-terracotta-lantern', 1850.00, 'Hand-pierced constellation patterns that project intricate star-like illumination when fitted with a warm bulb or candle.', 'lighting', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80', 24, 4.65),
('Rattan Scalloped Floor Lamp', 'rattan-scalloped-floor-lamp', 6800.00, 'Tall statement floor lamp crafted with natural steamed rattan poles and a flared woven bonnet. Warm, organic visual centerpiece.', 'lighting', 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=800&q=80', 8, 4.90),

-- Artisan Objects & Decor
('Hand-Carved Teakwood Decorative Serving Board', 'carved-teakwood-serving-board', 2250.00, 'Carved from single-block reclaimed teakwood, finished with organic coconut oil and beeswax. Perfect for cheeses, mezze, or display.', 'decor', 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80', 28, 4.85),
('Hand-Beaten Solid Brass Footed Planter', 'hand-beaten-brass-planter', 3600.00, 'Hammered by traditional metalsmiths in Moradabad. Warm unlacquered brass that matures with a beautiful, natural living patina.', 'decor', 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80', 18, 4.90),
('Sculptural Steatite Soapstone Bookends', 'steatite-soapstone-bookends', 2850.00, 'Set of two heavy geometric bookends hand-chiseled from natural Agra soapstone. Features unique natural marble-like veining.', 'decor', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', 15, 4.75),
('Hand-Woven Sabai Grass Storage Baskets', 'sabai-grass-storage-baskets', 2400.00, 'Nesting trio of versatile storage hampers hand-coiled from wild Sabai grass and cotton cord by rural artisan collectives in Odisha.', 'decor', 'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&w=800&q=80', 22, 4.80),
('Turned Mango Wood Pillar Candle Holders (Trio)', 'mango-wood-pillar-candle-holders', 2650.00, 'Set of three graduating height candle stands turned from sustainably felled mango wood with matte walnut stain.', 'decor', 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=80', 19, 4.85),
('Hand-Cast Bell Metal Minimalist Wind Bell', 'bell-metal-wind-bell', 1750.00, 'Cast using lost-wax brass and bronze techniques. Produces a resonant, meditative acoustic chime in the slightest evening breeze.', 'decor', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80', 26, 4.90);
