// ===== PARKEASE MAIN JS =====

// Navbar scroll effect
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
if (hamburger) {
  hamburger.addEventListener('click', () => {
    const navLinks = document.querySelector('.nav-links');
    const btnNav = document.querySelector('.btn-nav');
    if (navLinks) {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.cssText = isOpen ? '' : 'display:flex;flex-direction:column;position:fixed;top:64px;left:0;right:0;background:rgba(8,9,10,0.98);padding:20px 24px;gap:16px;z-index:99;border-bottom:1px solid rgba(255,255,255,0.08)';
      if (btnNav) btnNav.style.display = isOpen ? '' : 'block';
    }
  });
}

// Slot hover interactivity on homepage
document.querySelectorAll('.slot.available').forEach(slot => {
  slot.addEventListener('click', function() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
    this.classList.remove('available');
    this.classList.add('selected');
    const ctaSlot = document.querySelector('.cta-slot');
    if (ctaSlot) ctaSlot.textContent = 'Slot selected';
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.step-card, .mall-card, .feature-item, .price-card, .review-card, .service-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Show toast notification
function showToast(icon, title, sub) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span class="toast-icon">${icon}</span><div><strong>${title}</strong><span>${sub}</span></div>`;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}

// Expose globally
window.showToast = showToast;

// Live availability numbers animation
function animateNumbers() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.textContent.replace(/[^0-9]/g, ''));
    if (isNaN(target) || target === 0) return;
    let start = 0;
    const duration = 1500;
    const step = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      const suffix = el.textContent.includes('+') ? '+' : (el.textContent.includes('%') ? '%' : '');
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

// Trigger number animation when hero is visible
const heroSection = document.querySelector('.hero');
if (heroSection) {
  const heroObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateNumbers();
      heroObserver.disconnect();
    }
  }, { threshold: 0.3 });
  heroObserver.observe(heroSection);
}
