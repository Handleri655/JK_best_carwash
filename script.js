/* ============================================
   JK BEST CARWASH — Interactions & Effects
   ============================================ */

const SERVICES = [
  { name: 'Ulkopesu', from: { moottoripyora: true, kuormaauto: true }, prices: { henkiloauto: '20 €', pakettiauto: '25 €', asuntoauto: '35 €', moottoripyora: '25 €', kuormaauto: '80 €' } },
  { name: 'Venepesu', from: true, prices: { venepesu: '50 €' } },
  { name: 'Konepesu', from: true, prices: { konepesu: '40 €' } },
  { name: 'Ulkopesu, mattojen pesu, imurointi', from: { henkiloauto: true, pakettiauto: true, asuntoauto: true }, prices: { henkiloauto: '35 €', pakettiauto: '40 €', asuntoauto: '50 €', kuormaauto: '120 €' } },
  { name: 'Ulkopesu + sisäpesu: lattianpesu, kattojen pesu, penkkien pesu', from: true, prices: { henkiloauto: '50 €', pakettiauto: '60 €', asuntoauto: '85 €', kuormaauto: '150 €' } },
  { name: 'Sisäpesu: lattianpesu, kattojen pesu, penkkien pesu', from: true, prices: { henkiloauto: '120 €', pakettiauto: '130 €', asuntoauto: '150 €', kuormaauto: '150 €' } },
  { name: 'Ulkopesu, kovavahaus', from: true, prices: { henkiloauto: '85 €', pakettiauto: '100 €', asuntoauto: '130 €', kuormaauto: '130 €' } },
  { name: 'Vahaus', from: true, prices: { venepesu: '150 €' } },
  { name: 'Ulkopesu, myllytys', from: true, prices: { henkiloauto: '150 €', pakettiauto: '180 €', asuntoauto: '200 €', kuormaauto: '300 €' } },
  { name: 'Myllytys', from: true, prices: { venepesu: '200 €' } },
  { name: 'Täysipesu: ulkopesu, myllytys, kovavahaus ja sisäpesu', from: true, prices: { henkiloauto: '300 €', pakettiauto: '350 €', asuntoauto: '400 €' } },
  { name: 'Moottorin pesu', from: true, prices: { henkiloauto: '20 €', pakettiauto: '30 €', asuntoauto: '30 €', kuormaauto: '50 €' } },
  { name: 'Renkaiden vaihto, vanteet ja tasapainotus', from: true, prices: { henkiloauto: '80 €', pakettiauto: '90 €', asuntoauto: '100 €' } },
  { name: 'Renkaiden vaihto', from: true, prices: { henkiloauto: '20 €', pakettiauto: '25 €', asuntoauto: '30 €' } },
  { name: 'Renkaiden säilytys', from: true, prices: { henkiloauto: '50 €', pakettiauto: '60 €', asuntoauto: '60 €' } },
  { name: 'Tasapainotus', from: true, prices: { henkiloauto: '40 €', pakettiauto: '45 €', asuntoauto: '50 €' } },
  { name: 'Öljynsuodattimen vaihto', prices: { henkiloauto: '40 €', pakettiauto: '40 €', asuntoauto: '40 €' } },
  { name: 'Pinnoitteet: NanoCeramic Protect Hard 9H', desc: 'Kovin mahdollinen keraaminen suoja autollesi', from: true, featured: true, prices: { henkiloauto: '450 €', pakettiauto: '550 €', asuntoauto: null, kuormaauto: null } }
];

/* ---- GOOGLE REVIEWS (haettu Google Mapsista) ---- */
const GOOGLE_REVIEWS = {
  rating: 5.0,
  count: 16,
  reviews: [
    { text: 'Nopea ja huolellinen autopesu. On tarjouksella 20€ koko loppuvuosi, isot suosittelut ystävälliselle pesijälle!', author: 'LB21', rating: 5 },
    { text: 'Kunnon autonpesu & kuivaus + kahvit odotellessa. Asiakaspalvelu mainiota – suosittelen!', author: 'Kari', rating: 5 },
    { text: 'Hyvää asiakaspalvelua ja todella siistiä jälkeä!', author: 'Jimi Heino', rating: 5 },
    { text: 'Erittäin hyvää asiakaspalvelua ja tosi hyvää jälki – kyllä tulee jatkossakin.', author: 'Karar Merza', rating: 5 },
    { text: 'Todella hyvä palvelu ja siisti työnjälki.', author: 'Shapol Yasi', rating: 5 },
    { text: 'On paras autopesu Tampereella.', author: 'Petteri Puumala', rating: 5 },
    { text: 'Hyvä paikka.', author: 'Jimen Hussein', rating: 5 },
    { text: 'Paras autopesu Tampereella.', author: 'Gailan Ttampere', rating: 5 },
  ]
};

function renderStars(rating, max = 5) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let stars = '';
  for (let i = 0; i < max; i++) {
    stars += i < full ? '★' : (i === full && half ? '★' : '☆');
  }
  return stars;
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}

function renderReviewCard(review) {
  return `
    <article class="review-card">
      <div class="review-card__stars">${renderStars(review.rating)}</div>
      <p class="review-card__quote">${review.text}</p>
      <div class="review-card__author">
        <div class="review-card__avatar">${getInitials(review.author)}</div>
        <div>
          <div class="review-card__name">${review.author}</div>
          <div class="review-card__source">Google-arvostelu</div>
        </div>
      </div>
    </article>
  `;
}

function initReviews() {
  const track = document.getElementById('reviewsTrack');
  const starsEl = document.getElementById('reviewsStars');
  const scoreEl = document.getElementById('reviewsScore');
  const countEl = document.getElementById('reviewsCount');
  if (!track) return;

  const { rating, count, reviews } = GOOGLE_REVIEWS;

  if (starsEl) starsEl.textContent = renderStars(rating);
  if (scoreEl) scoreEl.textContent = rating.toFixed(1);
  if (countEl) countEl.textContent = `${count} Google-arvostelua`;

  const cards = reviews.map(renderReviewCard).join('');
  track.innerHTML = cards + cards;
  track.classList.add('reviews__track--animate');
}

/* ---- SPLASH ---- */
function initSplash() {
  const splash = document.getElementById('splash');
  const nav = document.getElementById('nav');

  setTimeout(() => {
    splash.classList.add('splash--done');
    nav.classList.add('nav--visible');
    revealHeroElements();
  }, 2200);
}

/* ---- HERO REVEALS ---- */
function revealHeroElements() {
  document.querySelectorAll('.reveal').forEach(el => {
    const delay = parseInt(el.dataset.delay || 0);
    setTimeout(() => el.classList.add('reveal--shown'), delay);
  });

  animateCounters();
}

function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1200;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
    }

    setTimeout(() => requestAnimationFrame(tick), 600);
  });
}

/* ---- BUBBLE CANVAS ---- */
function initBubbles() {
  const canvas = document.getElementById('bubbleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let w, h;
  const bubbles = [];
  const COUNT = 60;

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    w = rect.width;
    h = rect.height;
  }

  class Bubble {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = h + Math.random() * 100;
      this.r = Math.random() * 30 + 5;
      this.speed = Math.random() * 0.6 + 0.2;
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.02 + 0.005;
      this.opacity = Math.random() * 0.15 + 0.05;
    }
    update() {
      this.y -= this.speed;
      this.wobble += this.wobbleSpeed;
      this.x += Math.sin(this.wobble) * 0.3;
      if (this.y + this.r < -20) this.reset();
    }
    draw() {
      const grad = ctx.createRadialGradient(
        this.x - this.r * 0.3, this.y - this.r * 0.3, 0,
        this.x, this.y, this.r
      );
      grad.addColorStop(0, `rgba(255,255,255,${this.opacity * 1.5})`);
      grad.addColorStop(0.5, `rgba(91,181,232,${this.opacity})`);
      grad.addColorStop(1, `rgba(45,156,219,${this.opacity * 0.3})`);

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,255,${this.opacity * 0.5})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.15, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.opacity * 2})`;
      ctx.fill();
    }
  }

  resize();
  for (let i = 0; i < COUNT; i++) {
    const b = new Bubble();
    b.y = Math.random() * h;
    bubbles.push(b);
  }

  let mouseX = w / 2;
  let mouseY = h / 2;

  canvas.parentElement.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = e.clientY - rect.top;
  });

  function animate() {
    ctx.clearRect(0, 0, w, h);

    bubbles.forEach(b => {
      const dx = b.x - mouseX;
      const dy = b.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        b.x += dx * 0.01;
        b.y += dy * 0.005;
      }
      b.update();
      b.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
  window.addEventListener('resize', resize);
}

/* ---- CURSOR GLOW ---- */
function initCursorGlow() {
  const glow = document.getElementById('cursorGlow');
  if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  });
}

/* ---- NAV ---- */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');

  const closeMenu = () => {
    burger.classList.remove('nav__burger--open');
    links.classList.remove('nav__links--open');
    overlay.classList.remove('nav__overlay--open');
    overlay.hidden = true;
    document.body.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Avaa valikko');
  };

  const openMenu = () => {
    burger.classList.add('nav__burger--open');
    links.classList.add('nav__links--open');
    overlay.hidden = false;
    overlay.classList.add('nav__overlay--open');
    document.body.classList.add('nav-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Sulje valikko');
  };

  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  }, { passive: true });

  burger.addEventListener('click', () => {
    if (links.classList.contains('nav__links--open')) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);

  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

/* ---- SCROLL REVEAL ---- */
function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-on-scroll--shown');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
}

/* ---- PRICING ---- */
function isFromPrice(service, vehicle) {
  if (!service.from) return false;
  if (service.from === true) return true;
  return !!service.from[vehicle];
}

function renderPrices(vehicle) {
  const grid = document.getElementById('priceGrid');
  if (!grid) return;

  const items = SERVICES.filter(s => s.prices[vehicle] !== undefined);

  grid.innerHTML = items.map((s, i) => {
    const price = s.prices[vehicle];
    const display = price ? `${isFromPrice(s, vehicle) ? 'alk. ' : ''}${price}` : 'Kysy hinta';
    const priceClass = price ? '' : ' price-row__price--na';

    return `
      <div class="price-row${s.featured ? ' price-row--featured' : ''}" style="animation-delay:${i * 60}ms">
        <div class="price-row__left">
          <span class="price-row__num">${String(i + 1).padStart(2, '0')}</span>
          <div class="price-row__info">
            <span class="price-row__name">${s.name}</span>
            ${s.desc ? `<span class="price-row__desc">${s.desc}</span>` : ''}
          </div>
        </div>
        <span class="price-row__price${priceClass}">${display}</span>
      </div>
    `;
  }).join('');
}

function initPricing() {
  const tabs = document.querySelectorAll('.vehicle-tab');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      renderPrices(tab.dataset.v);
    });
  });

  renderPrices('henkiloauto');
}

/* ---- INIT ---- */
document.addEventListener('DOMContentLoaded', () => {
  initSplash();
  initBubbles();
  initCursorGlow();
  initNav();
  initScrollReveal();
  initPricing();
  initReviews();
});
