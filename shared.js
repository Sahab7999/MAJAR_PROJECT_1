// =============================================
//  MiniShop — shared.js
//  Shared product data + cart/wishlist engine
// =============================================

const PRODUCTS = [
  { id:1,  name:'Wireless Headphones',    category:'Audio',        price:2499,  original:3299,  rating:4.2, img:'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80',  badge:'sale',  desc:'Premium wireless headphones with 30-hour battery life, active noise cancellation, and deep bass for an immersive audio experience.' },
  { id:2,  name:'Pro Earbuds TWS',        category:'Audio',        price:1799,  original:2499,  rating:4.3, img:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&q=80',  badge:'new',   desc:'True wireless stereo earbuds with 6mm drivers, IPX5 water resistance, and a compact charging case with 24-hour total battery.' },
  { id:3,  name:'Running Shoes',          category:'Fashion',      price:1099,  original:1599,  rating:4.3, img:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',  badge:'sale',  desc:'Lightweight running shoes with responsive cushioning, breathable mesh upper, and durable rubber outsole for all-terrain performance.' },
  { id:4,  name:'Casual Sneakers',        category:'Fashion',      price:899,   original:1299,  rating:4.1, img:'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&q=80',  badge:null,    desc:'Stylish everyday sneakers with memory foam insoles, vegan leather upper, and minimalist design that pairs with anything.' },
  { id:5,  name:'Smart Watch',            category:'Wearables',    price:1999,  original:2799,  rating:4.0, img:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80',  badge:'hot',   desc:'Feature-packed smartwatch with heart rate monitor, SpO2 sensor, sleep tracking, 7-day battery, and 50+ workout modes.' },
  { id:6,  name:'Fitness Band Pro',       category:'Wearables',    price:1299,  original:1999,  rating:4.2, img:'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&q=80',  badge:'new',   desc:'Slim fitness band with real-time health monitoring, always-on AMOLED display, and 14-day battery life.' },
  { id:7,  name:'Travel Backpack',        category:'Travel',       price:1999,  original:2799,  rating:4.1, img:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',  badge:null,    desc:'40L travel backpack with USB charging port, anti-theft zipper, laptop compartment up to 17-inch, and airline carry-on compliant size.' },
  { id:8,  name:'Laptop Sleeve 15"',      category:'Travel',       price:599,   original:899,   rating:4.0, img:'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&q=80',  badge:'sale',  desc:'Neoprene laptop sleeve with accessory pocket, water-resistant exterior, and soft fleece lining for scratch protection.' },
  { id:9,  name:'Lightweight Laptop',     category:'Electronics',  price:49999, original:59999, rating:4.4, img:'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&q=80',  badge:'hot',   desc:'Ultra-thin 14" laptop with Intel Core i5, 16GB RAM, 512GB SSD, backlit keyboard, and 10-hour battery life at just 1.3kg.' },
  { id:10, name:'Smart Phone',            category:'Electronics',  price:19999, original:24999, rating:4.2, img:'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80',  badge:'new',   desc:'6.7" AMOLED flagship with 108MP triple camera, 5000mAh battery, 67W fast charging, and 5G connectivity.' },
  { id:11, name:'USB-C Hub 7-in-1',       category:'Electronics',  price:1499,  original:1999,  rating:4.3, img:'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&q=80',  badge:'sale',  desc:'7-in-1 USB-C hub with 4K HDMI, 100W PD charging, 3x USB-A 3.0, SD/microSD card reader — plug and play.' },
  { id:12, name:'DSLR Camera',            category:'Cameras',      price:10099, original:12999, rating:4.5, img:'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80',  badge:'hot',   desc:'24.1MP DSLR with dual pixel autofocus, 4K video recording, weather-sealed body, and 18-55mm kit lens included.' },
  { id:13, name:'Action Camera 4K',       category:'Cameras',      price:6999,  original:8999,  rating:4.4, img:'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&q=80',  badge:'sale',  desc:'Waterproof 4K action camera with HyperSmooth stabilization, touch screen, voice control, and 1720mAh removable battery.' },
  { id:14, name:'Kitchen Mixer Set',      category:'Kitchen',      price:1999,  original:2799,  rating:4.2, img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',  badge:null,    desc:'500W hand mixer with 5 speed settings, turbo boost, 6 stainless steel attachments, and ergonomic non-slip grip.' },
  { id:15, name:'Air Fryer Compact',      category:'Kitchen',      price:2999,  original:4499,  rating:4.5, img:'https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80',  badge:'hot',   desc:'3.5L digital air fryer with 8 preset cooking modes, rapid air circulation, non-stick basket, and 80% less oil usage.' },
  { id:16, name:'Portable Speaker',       category:'Accessories',  price:1299,  original:1799,  rating:4.1, img:'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&q=80',  badge:'new',   desc:'360° surround sound portable speaker with IPX7 waterproofing, 24-hour battery, and dual pairing for stereo sound.' },
  { id:17, name:'Desk Lamp LED',          category:'Electronics',  price:799,   original:999,   rating:3.9, img:'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&q=80',  badge:null,    desc:'Architect-style LED desk lamp with 5 color temperatures, 5 brightness levels, USB charging port, and touch control.' },
  { id:18, name:'Clothes - Men\'s Kurta', category:'Fashion',      price:999,   original:1499,  rating:4.2, img:'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&q=80',  badge:'sale',  desc:'Premium cotton kurta with hand embroidered details, relaxed fit, available in multiple colors, machine washable fabric.' },
];

// ── Storage helpers ─────────────────────────
function getCart() { try { return JSON.parse(localStorage.getItem('ms_cart') || '[]'); } catch(e){ return []; } }
function setCart(c) { localStorage.setItem('ms_cart', JSON.stringify(c)); updateNavCart(); }
function getWishlist() { try { return JSON.parse(localStorage.getItem('ms_wish') || '[]'); } catch(e){ return []; } }
function setWishlist(w) { localStorage.setItem('ms_wish', JSON.stringify(w)); }
function getOrders() { try { return JSON.parse(localStorage.getItem('ms_orders') || '[]'); } catch(e){ return []; } }
function setOrders(o) { localStorage.setItem('ms_orders', JSON.stringify(o)); }

function updateNavCart() {
  const el = document.getElementById('cart-count');
  if (el) { const c = getCart(); el.textContent = c.reduce((s,i)=>s+i.qty,0); }
}

function addToCart(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;
  const cart = getCart();
  const ex = cart.find(x => x.id === productId);
  if (ex) ex.qty++; else cart.push({ id: productId, qty: 1 });
  setCart(cart);
  showToast(`✓ "${p.name}" added to cart`);
}

function isInWishlist(id) { return getWishlist().includes(id); }
function toggleWishlistById(id) {
  let w = getWishlist();
  const p = PRODUCTS.find(x => x.id === id);
  if (w.includes(id)) { w = w.filter(x => x !== id); setWishlist(w); showToast('Removed from Wishlist'); return false; }
  else { w.push(id); setWishlist(w); showToast(`❤️ "${p?.name}" saved to Wishlist`); return true; }
}

function discount(p) { return Math.round((1 - p.price / p.original) * 100); }
function fmtPrice(n) { return '₹' + n.toLocaleString('en-IN'); }
function renderStars(r) {
  const full=Math.floor(r); let s='';
  for(let i=0;i<5;i++) s += i<full ? '★' : '☆';
  return s;
}

function showToast(msg) {
  let t = document.getElementById('cart-toast');
  if (!t) { t = document.createElement('div'); t.id='cart-toast'; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._tmr); t._tmr = setTimeout(()=>t.classList.remove('show'), 2600);
}

function handleContactForm(e) {
  e.preventDefault(); showToast("✉️ Message sent! We'll reply within 24 hrs."); e.target.reset();
}

// init nav cart count on every page
document.addEventListener('DOMContentLoaded', updateNavCart);