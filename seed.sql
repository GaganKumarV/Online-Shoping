-- GDG.com Online Shopping Database Schema & Seed Data
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

-- Seed 25 realistic products across 'books' and 'electronics'
INSERT INTO products (name, slug, price, description, category, image_url, stock, rating) VALUES
-- Books
('The Pragmatic Programmer: 20th Anniversary Edition', 'the-pragmatic-programmer', 1899.00, 'One of the most significant books in software engineering. Illustrates modern best practices for software development, personal responsibility, and career development.', 'books', 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80', 35, 4.90),
('Designing Data-Intensive Applications', 'designing-data-intensive-applications', 2499.00, 'The definitive guide to the architecture and principles of reliable, scalable, and maintainable systems by Martin Kleppmann.', 'books', 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?auto=format&fit=crop&w=800&q=80', 20, 4.95),
('Clean Code: A Handbook of Agile Software Craftsmanship', 'clean-code', 1450.00, 'Robert C. Martin introduces revolutionary principles of software craftsmanship to write clean, robust, and readable code.', 'books', 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80', 25, 4.70),
('You Don''t Know JS Yet: Get Started', 'you-dont-know-js-yet', 799.00, 'Kyle Simpson dives deep into the core mechanisms of JavaScript, scope, closures, and the modern JavaScript ecosystem.', 'books', 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80', 40, 4.80),
('Deep Learning by Ian Goodfellow', 'deep-learning-ian-goodfellow', 3200.00, 'The comprehensive MIT textbook covering mathematical background, deep feedforward networks, convolutional networks, and generative models.', 'books', 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=800&q=80', 15, 4.85),
('System Design Interview – An Insider''s Guide', 'system-design-interview-insider-guide', 1999.00, 'Alex Xu explains step-by-step methodologies to ace real-world distributed system design interviews with clear diagrams.', 'books', 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=800&q=80', 30, 4.90),
('JavaScript: The Definitive Guide (7th Edition)', 'javascript-definitive-guide-7th', 2199.00, 'David Flanagan provides the master reference for modern web development, ECMAScript 2020+, Node.js, and browser APIs.', 'books', 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=800&q=80', 18, 4.65),
('Structure and Interpretation of Computer Programs', 'sicp-computer-programs', 2850.00, 'Harold Abelson and Gerald Jay Sussman''s world-famous MIT curriculum exploring computation, abstraction, and functional programming.', 'books', 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=800&q=80', 12, 4.80),
('Grokking Algorithms: An Illustrated Guide', 'grokking-algorithms', 1299.00, 'Aditya Bhargava makes fundamental algorithms fun and visual with easy-to-follow illustrations and real-world examples.', 'books', 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?auto=format&fit=crop&w=800&q=80', 50, 4.85),
('Building Microservices (2nd Edition)', 'building-microservices-2nd', 2350.00, 'Sam Newman discusses principles, integration patterns, deployment strategies, and evolutionary architectures.', 'books', 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=800&q=80', 22, 4.70),
('The Phoenix Project: A Novel about IT & DevOps', 'the-phoenix-project', 899.00, 'Gene Kim, Kevin Behr, and George Spafford describe how DevOps principles turn IT organizations around to win in the market.', 'books', 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?auto=format&fit=crop&w=800&q=80', 28, 4.75),
('Refactoring: Improving the Design of Existing Code', 'refactoring-improving-design', 2650.00, 'Martin Fowler offers battle-tested techniques to improve code maintainability, cleanliness, and structural integrity.', 'books', 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=800&q=80', 14, 4.80),
('Domain-Driven Design: Tackling Complexity', 'domain-driven-design-eric-evans', 2999.00, 'Eric Evans presents a systematic approach to connecting complex software implementation to an evolving model of the core business.', 'books', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80', 10, 4.60),

-- Electronics
('Sony WH-1000XM5 Wireless Noise-Cancelling Headphones', 'sony-wh-1000xm5-headphones', 26990.00, 'Industry-leading noise cancellation with two processors and 8 microphones. Exceptional Hi-Res audio with up to 30-hour battery life.', 'electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', 18, 4.85),
('Apple iPad Air (M2, 11-inch, 128GB - Space Grey)', 'apple-ipad-air-m2-11-inch', 59900.00, 'Powered by the astonishingly fast M2 chip. Liquid Retina display, Wi-Fi 6E, 12MP landscape front camera, and all-day battery life.', 'electronics', 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80', 14, 4.90),
('Logitech MX Master 3S Wireless Performance Mouse', 'logitech-mx-master-3s-mouse', 8995.00, 'Quiet clicks, 8K DPI tracking on any surface including glass, MagSpeed electromagnetic scrolling, and ergonomic hand sculpt.', 'electronics', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=800&q=80', 45, 4.85),
('Keychron K2 Pro Wireless Custom Mechanical Keyboard', 'keychron-k2-pro-keyboard', 9499.00, 'QMK/VIA wireless custom mechanical keyboard, south-facing RGB, hot-swappable switches, sound-absorbing foam, and PBT keycaps.', 'electronics', 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80', 25, 4.75),
('Dell UltraSharp 27 4K USB-C Hub Monitor (U2723QE)', 'dell-ultrasharp-27-4k-monitor', 49990.00, 'Brilliant 4K IPS Black technology with 2000:1 contrast ratio, 90W USB-C power delivery, RJ45 Ethernet, and wide color gamut (98% DCI-P3).', 'electronics', 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80', 8, 4.80),
('Kindle Paperwhite (16 GB, 6.8" glare-free display)', 'kindle-paperwhite-16gb', 14999.00, '6.8" display with thinner borders, adjustable warm light, up to 10 weeks of battery life, and 20% faster page turns.', 'electronics', 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80', 32, 4.70),
('Anker 737 Power Bank (PowerCore 24K, 140W)', 'anker-737-power-bank-24k', 11999.00, 'Ultra-powerful two-way charging with Power Delivery 3.1 and smart digital display showing output power and remaining recharge time.', 'electronics', 'https://images.unsplash.com/photo-1609592426508-cc061c572c67?auto=format&fit=crop&w=800&q=80', 20, 4.80),
('Bose QuietComfort 45 Bluetooth Wireless Headphones', 'bose-quietcomfort-45-headphones', 22900.00, 'The iconic quiet, comfort, and sound. TriPort acoustic architecture delivers deep, full sound, with Aware Mode and 24-hour battery.', 'electronics', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80', 16, 4.65),
('SanDisk 2TB Extreme Portable SSD (up to 1050MB/s)', 'sandisk-2tb-extreme-portable-ssd', 15499.00, 'Fast NVMe solid state performance featuring up to 1050MB/s read and 1000MB/s write speeds in a ruggedized, drop-resistant drive.', 'electronics', 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&w=800&q=80', 30, 4.80),
('Raspberry Pi 5 (8GB RAM Single Board Computer)', 'raspberry-pi-5-8gb-ram', 7850.00, 'Featuring a 64-bit quad-core Arm Cortex-A76 processor running at 2.4GHz, dual 4Kp60 HDMI display outputs, and PCIe 2.0 interface.', 'electronics', 'https://images.unsplash.com/photo-1517055729445-fa7d27394b48?auto=format&fit=crop&w=800&q=80', 24, 4.90),
('Elgato Stream Deck MK.2 (15 LCD keys)', 'elgato-stream-deck-mk2', 13490.00, '15 customizable LCD keys to control apps, tools, and platforms. One-touch tactile operation with visual feedback.', 'electronics', 'https://images.unsplash.com/photo-1616469829941-c7200edec809?auto=format&fit=crop&w=800&q=80', 15, 4.70),
('Google Pixel Buds Pro 2 (Active Noise Cancellation)', 'google-pixel-buds-pro-2', 21900.00, 'Engineered with the Tensor A1 chip for premium audio, Silent Seal 2.0 active noise cancellation, and all-day ergonomic fit.', 'electronics', 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80', 22, 4.60)
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  price = VALUES(price),
  description = VALUES(description),
  category = VALUES(category),
  image_url = VALUES(image_url),
  stock = VALUES(stock),
  rating = VALUES(rating);
