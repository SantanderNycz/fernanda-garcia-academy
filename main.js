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
   5. MOSAIC — fotos intercaladas com cards
════════════════════════════════════════ */
(function loadMosaic() {
  // Lê o índice de diretório — normaliza barras invertidas do Windows
  async function listDir(dir, extsRegex) {
    try {
      const res = await fetch(`/${dir}/`);
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return [...doc.querySelectorAll('a[href]')]
        .map(a => decodeURIComponent(a.getAttribute('href')))
        .filter(h => extsRegex.test(h))
        .map(h => {
          // extrai só o nome do arquivo (suporta / e \)
          const name = h.replace(/^.*[\/\\]/, '');
          return `${dir}/${name}`;
        });
    } catch { return []; }
  }

  const photoCandidates = [];

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

  // Carrega fotos reais do índice do servidor
  listDir('fotos', /\.(jpg|jpeg|png|webp)$/i).then(real => {
    const allCandidates = real.length ? real : photoCandidates;
    pendingPhotos = allCandidates.length || 1;
    if (!allCandidates.length) { pendingPhotos = 0; tryBuildMosaic(); return; }
    allCandidates.forEach(src => {
      const img = new Image();
      img.onload = () => { if (!foundPhotos.includes(src)) foundPhotos.push(src); pendingPhotos--; tryBuildMosaic(); };
      img.onerror = () => { pendingPhotos--; tryBuildMosaic(); };
      img.src = src;
    });
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
  const exts = ['mp4', 'MP4', 'webm', 'WEBM', 'mov', 'MOV'];

  async function listVideos() {
    try {
      const res = await fetch('/videos/');
      const html = await res.text();
      const doc = new DOMParser().parseFromString(html, 'text/html');
      return [...doc.querySelectorAll('a[href]')]
        .map(a => decodeURIComponent(a.getAttribute('href')))
        .filter(h => /\.(mp4|webm|mov)$/i.test(h))
        .map(h => `videos/${h.replace(/^.*[\/\\]/, '')}`);
    } catch { return []; }
  }

  const fallbackCandidates = [];
  for (let i = 1; i <= 30; i++) {
    exts.forEach(e => {
      fallbackCandidates.push(`videos/${i}.${e}`);
      fallbackCandidates.push(`videos/video${i}.${e}`);
      fallbackCandidates.push(`videos/vid${i}.${e}`);
      fallbackCandidates.push(`videos/Video${i}.${e}`);
    });
  }

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

  listVideos().then(real => {
    const allCandidates = real.length ? real : fallbackCandidates;
    const found = [];
    let pending = allCandidates.length;

    if (!pending) return; // mantém fallback

    function finish() {
      pending--;
      if (pending <= 0) buildCarousel(found);
    }

    allCandidates.forEach(src => {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.onloadedmetadata = () => { if (!found.includes(src)) found.push(src); finish(); };
      v.onerror = finish;
      v.src = src;
    });
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
