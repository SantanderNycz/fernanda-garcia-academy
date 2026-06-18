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

/* ── sobre photo — src fixo no HTML ── */
(function () {
  const img = $('#sobrePhoto');
  if (!img) return;
  img.onload = () => img.classList.add('loaded');
  img.onerror = () => {}; // mantém o fallback FG se arquivo não existir
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
   5. MOSAIC — fotos intercaladas com cards
════════════════════════════════════════ */
(function loadMosaic() {
  // Lista fixa dos arquivos reais no repositório
  const FOTOS = [
    'fotos/FerGarcia-1.jpg',
    'fotos/FerGarcia-18.jpg',
    'fotos/FerGarcia-32.jpg',
    'fotos/FerGarcia-33.jpg',
    'fotos/FerGarcia-5.jpg',
    'fotos/8F465E70-7CC5-4779-A2FA-61656DDF3076.png',
    'fotos/9681C60A-B299-439D-B06A-E95BDB3B540F.JPG',
    'fotos/IMG_1992.JPG',
    'fotos/IMG_1993.JPG',
  ];

  const photoCandidates = FOTOS;

  // Patterns reais na pasta logos/
  const knownPatterns = ['logos/pattern marrom.png', 'logos/pattern branco.png'];

  // Cards de cor sólida que aparecem no mosaico (intercalados)
  const CARDS = [
    { type: 'dark',   patternIdx: 1, text: 'Técnica & Arte',        sub: 'Academy' },
    { type: 'accent', patternIdx: 0, text: 'Formando Profissionais', sub: '10+ anos' },
    { type: 'dark',   patternIdx: 1, text: '+500 Alunas',            sub: 'Formadas' },
  ];

  const foundPhotos = [];
  const foundPatterns = [];
  let pendingPhotos = 1; // será re-atribuído após listDir
  let pendingPatterns = knownPatterns.length;

  function tryBuildMosaic() {
    if (pendingPhotos > 0 || pendingPatterns > 0) return;

    const fallback = $('#mosaicFallback');
    if (foundPhotos.length === 0) {
      // Placeholders com animação
      $$('.mosaic-ph').forEach((el, i) => {
        el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
      return;
    }

    if (fallback) fallback.remove();
    const mosaicEl = $('#mosaic');

    // Intercalar fotos com cards
    let photoIdx = 0;
    let cardIdx  = 0;
    const totalItems = foundPhotos.length + Math.min(CARDS.length, Math.floor(foundPhotos.length / 2));

    for (let i = 0; i < totalItems; i++) {
      // A cada 2 fotos, inserir 1 card
      const isCard = (i % 3 === 2) && cardIdx < CARDS.length;

      if (isCard) {
        const card = CARDS[cardIdx++ % CARDS.length];
        const item = document.createElement('div');
        item.className = `mosaic__item mosaic__item--card${card.type === 'dark' ? ' card--dark' : ''} gs-reveal`;

        // Pattern: arquivo real ou inline SVG fallback
        const patDiv = document.createElement('div');
        const patSrc = foundPatterns[card.patternIdx] || foundPatterns[0];
        if (patSrc) {
          patDiv.className = 'card__pattern';
          patDiv.style.backgroundImage = `url('${patSrc}')`;
          patDiv.style.backgroundSize = 'contain';
          patDiv.style.backgroundRepeat = 'repeat';
          patDiv.style.opacity = '0.15';
        } else {
          patDiv.className = `card__pattern card__pattern--${card.patternIdx === 0 ? 'lines' : 'dots'}`;
        }

        const textDiv = document.createElement('div');
        textDiv.className = 'card__text';
        textDiv.innerHTML = `<strong>${card.text}</strong><span>${card.sub}</span>`;

        item.appendChild(patDiv);
        item.appendChild(textDiv);
        mosaicEl.appendChild(item);
      } else if (photoIdx < foundPhotos.length) {
        const item = document.createElement('div');
        item.className = 'mosaic__item mosaic__item--photo gs-reveal';

        const img = document.createElement('img');
        img.src = foundPhotos[photoIdx++];
        img.alt = 'Portfólio Fernanda Garcia';
        img.loading = 'lazy';

        const overlay = document.createElement('div');
        overlay.className = 'mosaic__overlay';

        item.appendChild(img);
        item.appendChild(overlay);
        mosaicEl.appendChild(item);
      }
    }

    initScrollReveal();
  }

  pendingPhotos = photoCandidates.length;
  photoCandidates.forEach(src => {
    const img = new Image();
    img.onload = () => { if (!foundPhotos.includes(src)) foundPhotos.push(src); pendingPhotos--; tryBuildMosaic(); };
    img.onerror = () => { pendingPhotos--; tryBuildMosaic(); };
    img.src = src;
  });

  // Probe patterns reais
  knownPatterns.forEach((src, idx) => {
    const img = new Image();
    img.onload = () => { foundPatterns[idx] = src; pendingPatterns--; tryBuildMosaic(); };
    img.onerror = () => { pendingPatterns--; tryBuildMosaic(); };
    img.src = src;
  });
})();

/* ════════════════════════════════════════
   6. VIDEO CAROUSEL
════════════════════════════════════════ */
(function initCarousel() {
  // Lista fixa dos vídeos reais no repositório
  const VIDEOS = [
    'videos/Principal.mp4',
    'videos/Lash 1.mp4',
    'videos/Brown - depoimento.mp4',
    'videos/divulg 1.mp4',
  ];

  function buildCarousel(found) {
    if (found.length === 0) return;

    const fallback = $('#carouselFallback');
    if (fallback) fallback.remove();

    const carousel = $('#videoCarousel');
    const track = document.createElement('div');
    track.className = 'carousel__track';

    found.forEach((src, idx) => {
      const card = document.createElement('div');
      card.className = 'video-card' + (idx === 0 ? ' active' : '');
      card.dataset.type = 'local';

      const video = document.createElement('video');
      video.src = src;
      video.preload = 'metadata';
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      if (idx === 0) { video.autoplay = true; video.controls = true; }

      card.appendChild(video);
      track.appendChild(card);
    });

    carousel.appendChild(track);
    setupCarouselControls(track, found.length);
  }

  buildCarousel(VIDEOS);

  function setupCarouselControls(track, total) {
    let current = 0;
    const carousel = track.parentElement;
    const cards = $$('.video-card', carousel);

    function deactivateCurrent() {
      const card = cards[current];
      if (!card) return;
      card.classList.remove('active');

      const v = card.querySelector('video');
      if (v) { v.pause(); v.controls = false; }
    }

    function activateCard(idx) {
      const card = cards[idx];
      if (!card) return;
      card.classList.add('active');

      const v = card.querySelector('video');
      if (v) { v.controls = true; v.play().catch(() => {}); }
    }

    function goTo(idx) {
      deactivateCurrent();
      current = (idx + total) % total;
      activateCard(current);

      // Centraliza
      const card = cards[current];
      const offset = card.offsetLeft - carousel.offsetWidth / 2 + card.offsetWidth / 2;
      carousel.scrollTo({ left: offset, behavior: 'smooth' });
    }

    // Clique em card lateral ativa
    cards.forEach((card, i) => {
      card.addEventListener('click', () => { if (i !== current) goTo(i); });
    });

    $('#videoPrev')?.addEventListener('click', () => goTo(current - 1));
    $('#videoNext')?.addEventListener('click', () => goTo(current + 1));

    // Pause ao sair do viewport
    const section = document.getElementById('videos');
    if (section) {
      const io = new IntersectionObserver(([e]) => {
        if (!e.isIntersecting) {
          cards.forEach(c => c.querySelector('video')?.pause());
          // Também remove o iframe do Drive para parar
          cards[current]?.querySelector('video')?.pause();
        } else {
          activateCard(current);
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
