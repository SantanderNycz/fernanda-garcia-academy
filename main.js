/* ═══════════════════════════════════════
   FERNANDA GARCIA ACADEMY — main.js
═══════════════════════════════════════ */

/* ── helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════
   1. YEAR
════════════════════════════════════════ */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ════════════════════════════════════════
   2. LOGO — try images in logos/
════════════════════════════════════════ */
(function loadLogo() {
  const extensions = ['png', 'svg', 'jpg', 'jpeg', 'webp'];
  const names = ['logo', 'Logo', 'LOGO'];
  const img = $('#logoImg');
  if (!img) return;

  let tried = 0;
  const attempts = [];
  names.forEach(n => extensions.forEach(e => attempts.push(`logos/${n}.${e}`)));

  function tryNext() {
    if (tried >= attempts.length) return;
    img.src = attempts[tried++];
    img.onload = () => img.classList.add('loaded');
    img.onerror = tryNext;
  }
  tryNext();
})();

/* ── sobre photo ── */
(function loadSobrePhoto() {
  const extensions = ['jpg', 'jpeg', 'png', 'webp'];
  const names = ['sobre', 'fernanda', 'perfil', 'profile'];
  const img = $('#sobrePhoto');
  if (!img) return;

  const attempts = [];
  names.forEach(n => extensions.forEach(e => {
    attempts.push(`fotos/${n}.${e}`);
    attempts.push(`logos/${n}.${e}`);
  }));

  let tried = 0;
  function tryNext() {
    if (tried >= attempts.length) return;
    img.src = attempts[tried++];
    img.onload = () => img.classList.add('loaded');
    img.onerror = tryNext;
  }
  tryNext();
})();

/* ════════════════════════════════════════
   3. NAVBAR
════════════════════════════════════════ */
const navbar = $('#navbar');
const burger = $('#burger');
const mobileNav = $('#mobileNav');

// Scroll → solid background
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Burger toggle
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

// Close mobile nav on link click
$$('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

/* ════════════════════════════════════════
   4. CUSTOM CURSOR
════════════════════════════════════════ */
const cursor = $('#cursor');
const follower = $('#cursorFollower');

if (cursor && follower && window.matchMedia('(hover: hover)').matches) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  })();
}

/* ════════════════════════════════════════
   5. MOSAIC — load fotos/
════════════════════════════════════════ */
(function loadMosaic() {
  // Known image extensions to try
  const exts = ['jpg', 'jpeg', 'png', 'webp'];
  // Try numbered filenames 1-30 and named patterns
  const candidates = [];

  for (let i = 1; i <= 30; i++) {
    exts.forEach(e => {
      candidates.push(`fotos/${i}.${e}`);
      candidates.push(`fotos/foto${i}.${e}`);
      candidates.push(`fotos/img${i}.${e}`);
    });
  }
  // also try common names
  ['foto','maquiagem','look','beauty','face','noiva','noiva1','noiva2','olho','olhos'].forEach(n => {
    exts.forEach(e => candidates.push(`fotos/${n}.${e}`));
  });

  const found = [];
  let pending = candidates.length;

  function finish() {
    pending--;
    if (pending > 0) return;

    const fallback = $('#mosaicFallback');
    if (found.length === 0) {
      // keep fallback placeholders visible with animation
      $$('.mosaic-ph').forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, i * 120);
      });
      return;
    }

    // Build real mosaic
    if (fallback) fallback.remove();
    const mosaic = $('#mosaic');
    const grid = document.createElement('div');
    grid.className = 'mosaic__grid';

    found.forEach(src => {
      const item = document.createElement('div');
      item.className = 'mosaic__item gs-reveal';

      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Portfólio Fernanda Garcia';
      img.loading = 'lazy';

      const overlay = document.createElement('div');
      overlay.className = 'mosaic__overlay';

      item.appendChild(img);
      item.appendChild(overlay);
      grid.appendChild(item);
    });

    mosaic.appendChild(grid);
    initScrollReveal(); // re-init for new elements
  }

  // Probe each candidate
  candidates.forEach(src => {
    // De-duplicate
    if (found.includes(src)) { pending--; return; }
    const img = new Image();
    img.onload  = () => { if (!found.includes(src)) found.push(src); finish(); };
    img.onerror = finish;
    img.src = src;
  });
})();

/* ════════════════════════════════════════
   6. VIDEO CAROUSEL
════════════════════════════════════════ */
(function initCarousel() {
  const exts = ['mp4', 'webm', 'mov'];
  const candidates = [];

  for (let i = 1; i <= 20; i++) {
    exts.forEach(e => {
      candidates.push(`videos/${i}.${e}`);
      candidates.push(`videos/video${i}.${e}`);
      candidates.push(`videos/vid${i}.${e}`);
    });
  }

  const found = [];
  let pending = candidates.length;

  function finish() {
    pending--;
    if (pending > 0) return;
    if (found.length === 0) return; // keep fallback

    // Build carousel
    const fallback = $('#carouselFallback');
    if (fallback) fallback.remove();

    const carousel = $('#videoCarousel');
    const track = document.createElement('div');
    track.className = 'carousel__track';

    found.forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = 'video-card' + (idx === 0 ? ' active' : '');

      const video = document.createElement('video');
      video.src = src;
      video.preload = 'metadata';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      if (idx === 0) {
        video.autoplay = true;
        video.controls = true;
      }

      card.appendChild(video);
      track.appendChild(card);
    });

    carousel.appendChild(track);
    setupCarouselControls(track, found.length);
  }

  candidates.forEach(src => {
    if (found.includes(src)) { pending--; return; }
    const v = document.createElement('video');
    v.preload = 'metadata';
    v.onloadedmetadata = () => { if (!found.includes(src)) found.push(src); finish(); };
    v.onerror = finish;
    v.src = src;
  });

  function setupCarouselControls(track, total) {
    let current = 0;
    const cards = $$('.video-card', track.parentElement);

    function goTo(idx) {
      if (total <= 1) return;
      // Pause previous
      const prevVideo = cards[current]?.querySelector('video');
      if (prevVideo) { prevVideo.pause(); prevVideo.controls = false; }

      current = (idx + total) % total;

      cards.forEach((c, i) => {
        c.classList.toggle('active', i === current);
        const v = c.querySelector('video');
        if (i === current) {
          v.controls = true;
          v.play().catch(() => {});
        } else {
          v.controls = false;
        }
      });

      // Center the active card
      const card = cards[current];
      const carousel = track.parentElement;
      const offset = card.offsetLeft - carousel.offsetWidth / 2 + card.offsetWidth / 2;
      carousel.scrollTo({ left: offset, behavior: 'smooth' });
    }

    $('#videoPrev')?.addEventListener('click', () => goTo(current - 1));
    $('#videoNext')?.addEventListener('click', () => goTo(current + 1));

    // Pause when out of viewport
    const section = document.getElementById('videos');
    if (section) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) {
          cards.forEach(c => c.querySelector('video')?.pause());
        } else {
          cards[current]?.querySelector('video')?.play().catch(() => {});
        }
      }, { threshold: 0.2 });
      io.observe(section);
    }
  }
})();

/* ════════════════════════════════════════
   7. GSAP ANIMATIONS
════════════════════════════════════════ */
function initScrollReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal
  $$('.gs-reveal').forEach(el => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      }
    });
  });

  // Staggered dep cards
  const depCards = $$('.dep-card');
  if (depCards.length) {
    gsap.set(depCards, { opacity: 0, y: 30 });
    gsap.to(depCards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.depoimentos__grid',
        start: 'top 82%',
      }
    });
  }
}

// Hero entrance (runs regardless of GSAP — will be enhanced when GSAP loads)
// ScrollReveal runs after page load (GSAP is deferred)
window.addEventListener('load', () => {
  initScrollReveal();
});

/* ════════════════════════════════════════
   8. FORMULÁRIO → WHATSAPP
════════════════════════════════════════ */
const form = $('#contactForm');

form?.addEventListener('submit', e => {
  e.preventDefault();

  const nome     = $('#nome');
  const telefone = $('#telefone');
  const mensagem = $('#mensagem');
  let valid = true;

  // Reset errors
  $$('.form-group').forEach(g => g.classList.remove('has-error'));
  $$('.form-error').forEach(el => { el.textContent = ''; });

  // Validate
  if (!nome.value.trim()) {
    showError('erroNome', 'Por favor, informe seu nome.', nome);
    valid = false;
  }
  if (!telefone.value.trim()) {
    showError('erroTelefone', 'Por favor, informe seu telefone.', telefone);
    valid = false;
  }

  if (!valid) return;

  // Build WhatsApp message
  const msgParts = [
    `Olá Fernanda! 😊`,
    ``,
    `Meu nome é *${nome.value.trim()}* e gostaria de saber mais sobre o seu curso.`,
    ``,
    `📱 Telefone: ${telefone.value.trim()}`,
  ];
  if (mensagem.value.trim()) {
    msgParts.push(``, `💬 Mensagem: ${mensagem.value.trim()}`);
  }

  const encoded = encodeURIComponent(msgParts.join('\n'));
  window.open(`https://wa.me/5519971058988?text=${encoded}`, '_blank', 'noopener');

  // Reset form
  form.reset();
});

function showError(id, msg, inputEl) {
  const err = $('#' + id);
  if (err) err.textContent = msg;
  inputEl?.closest('.form-group')?.classList.add('has-error');
  inputEl?.focus();
}

/* ════════════════════════════════════════
   9. PHONE MASK
════════════════════════════════════════ */
$('#telefone')?.addEventListener('input', function () {
  let v = this.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
  } else if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{4})(\d*)$/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d*)$/, '($1) $2');
  }
  this.value = v;
});
