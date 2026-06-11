let cartCount = 0;

function updateCartDisplay() {
  const cartLink = document.querySelector('.user-section a[href="cart.html"]');
  if (cartLink) {
    const cart = JSON.parse(localStorage.getItem('minishop_cart') || '[]');
    const total = cart.reduce((s, i) => s + i.qty, 0);
    cartLink.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> Cart (${total})`;
  }
}

function showToast(message) {
  let toast = document.getElementById('cart-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cart-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => toast.classList.remove('show'), 2500);
}

function initCartButtons() {
  document.querySelectorAll('.add-to-cart-btn, .product-card > button').forEach(btn => {
    btn.addEventListener('click', function () {
      const card = this.closest('.product-card');
      const name = card?.querySelector('h3')?.textContent?.trim() || 'Item';
      const priceText = card?.querySelector('.price')?.textContent?.trim() || '0';
      const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 999;

      // Persist to localStorage
      const cart = JSON.parse(localStorage.getItem('minishop_cart') || '[]');
      const existing = cart.find(c => c.name === name);
      if (existing) existing.qty += 1;
      else cart.push({ id: Date.now(), name, price, emoji: '🛍️', qty: 1 });
      localStorage.setItem('minishop_cart', JSON.stringify(cart));

      updateCartDisplay();
      showToast(`✓ "${name}" added to cart`);
      this.textContent = 'Added!';
      this.style.background = 'var(--coral)';
      setTimeout(() => {
        this.textContent = 'Add to Cart';
        this.style.background = '';
      }, 1400);
    });
  });
}

function toggleWishlist(el) {
  const card = el.closest('.product-card');
  const name = card?.querySelector('h3')?.textContent?.trim();
  const priceText = card?.querySelector('.price')?.textContent?.trim() || '0';
  const price = parseInt(priceText.replace(/[^0-9]/g, '')) || 0;
  const ratingEl = card?.querySelector('.rating');
  const ratingText = ratingEl?.textContent || '0';
  const ratingMatch = ratingText.match(/\(([\d.]+)\)/);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : 4.0;

  el.classList.toggle('active');
  const icon = el.querySelector('i');
  if (!icon) return;

  const wl = JSON.parse(localStorage.getItem('minishop_wishlist') || '[]');
  if (el.classList.contains('active')) {
    icon.classList.replace('fa-regular', 'fa-solid');
    if (!wl.find(w => w.name === name)) {
      wl.push({ id: Date.now(), name, price, emoji: '🛍️', rating, addedOn: new Date().toISOString().slice(0,10), badge: null });
      localStorage.setItem('minishop_wishlist', JSON.stringify(wl));
    }
    showToast('❤️ Saved to Wishlist');
  } else {
    icon.classList.replace('fa-solid', 'fa-regular');
    const updated = wl.filter(w => w.name !== name);
    localStorage.setItem('minishop_wishlist', JSON.stringify(updated));
    showToast('Removed from Wishlist');
  }
}

function initSearch() {
  const input = document.querySelector('.search-box input');
  const btn = document.querySelector('.search-box button');
  if (!input || !btn) return;
  function doSearch() {
    const query = input.value.trim().toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    let found = 0;
    cards.forEach(card => {
      const name = card.querySelector('h3')?.textContent?.toLowerCase() || '';
      const match = !query || name.includes(query);
      card.style.display = match ? '' : 'none';
      if (match) found++;
    });
    if (query && found === 0) showToast(`No products found for "${input.value.trim()}"`);
  }
  btn.addEventListener('click', doSearch);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });
  input.addEventListener('input', () => { if (!input.value.trim()) doSearch(); });
}

function handleContactForm(e) {
  e.preventDefault();
  showToast("✉️ Message sent! We'll reply within 24 hrs.");
  e.target.reset();
}

function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form || form.onsubmit) return;
  form.addEventListener('submit', handleContactForm);
}

function initBackToTop() {
  const panel = document.querySelector('.foot-panel1');
  if (panel) {
    panel.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
}

function initHeroAnimation() {
  ['.hero-content h1', '.hero-content p', '.hero-content .btn'].forEach((selector, index) => {
    const el = document.querySelector(selector);
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    setTimeout(() => {
      el.style.opacity = '';
      el.style.transform = '';
    }, 100 + index * 130);
  });
}

function initWishlistSync() {
  // Highlight hearts for items already in wishlist on home/products page
  const wl = JSON.parse(localStorage.getItem('minishop_wishlist') || '[]');
  const wlNames = new Set(wl.map(w => w.name));
  document.querySelectorAll('.product-card').forEach(card => {
    const name = card.querySelector('h3')?.textContent?.trim();
    if (name && wlNames.has(name)) {
      const heart = card.querySelector('.wishlist-icon');
      if (heart) {
        heart.classList.add('active');
        const icon = heart.querySelector('i');
        if (icon) icon.classList.replace('fa-regular', 'fa-solid');
      }
    }
  });
}

function switchTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(el => {
    const target = el.dataset.tab || el.textContent.trim().toLowerCase();
    el.classList.toggle('active', target.includes(tab));
  });
  document.querySelectorAll('.auth-form').forEach(form => {
    form.classList.toggle('active', form.id === `${tab}Form`);
  });
}

function togglePw(inputId, icon) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPassword = input.type === 'password';
  input.type = isPassword ? 'text' : 'password';
  icon.classList.toggle('fa-eye', !isPassword);
  icon.classList.toggle('fa-eye-slash', isPassword);
}

function handleLogin(e) {
  e.preventDefault();
  showToast('Welcome back! You are signed in.');
  e.target.reset();
}

function handleRegister(e) {
  e.preventDefault();
  showToast('Account created successfully! Please sign in.');
  e.target.reset();
  switchTab('login');
}

function setFilter(status, button) {
  document.querySelectorAll('.filter-link').forEach(el => el.classList.toggle('active', el === button));
  document.querySelectorAll('.order-card').forEach(card => {
    card.style.display = status === 'all' || card.dataset.status === status ? '' : 'none';
  });
}

// ── Init ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initCartButtons();
  initSearch();
  initContactForm();
  initBackToTop();
  initHeroAnimation();
  updateCartDisplay();
  initWishlistSync();
});










