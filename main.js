/* ═══════════════════════════════════════
   FERNANDA GARCIA ACADEMY — main.js
═══════════════════════════════════════ */

/* ── helpers ── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ════════════════════════════════════════
   0. LANGUAGE SWITCH
════════════════════════════════════════ */
const TRANSLATIONS = {
  pt: {
    'nav.sobre': 'Sobre',
    'nav.portfolio': 'Portfólio',
    'nav.videos': 'Vídeos',
    'nav.cursos': 'Cursos',
    'nav.lash': 'Lash Lifting Iniciante',
    'nav.brow': 'Brow Lamination + Design',
    'nav.coreano': 'Método Coreano',
    'nav.cta': 'Me inscrever',
    'hero.eyebrow': 'Bem-vinda ao',
    'hero.tagline': 'Técnicas de elite em Lash Lifting, Brow Lamination e Design de Sobrancelhas para construir uma carreira de alta lucratividade.',
    'hero.cta': 'Quero me inscrever',
    'hero.scroll': 'Role para descobrir',
    'sobre.label': 'Sobre mim',
    'sobre.h2': 'Técnica que <em>transforma</em>',
    'sobre.p1': 'Sou Fernanda Garcia, especialista e educadora na área de embelezamento do olhar. Desenvolvi uma metodologia própria que une precisão técnica, segurança e resultados naturais que encantam cada cliente.',
    'sobre.p2': 'Na <strong>Fernanda Garcia Academy</strong>, reúno tudo que aprendi, da química dos produtos à prática de bancada, em um material didático completo para você dominar os procedimentos que mais crescem no mercado da beleza.',
    'sobre.stat1': 'Alunas formadas',
    'sobre.stat2': 'Anos de experiência',
    'sobre.stat3': 'Dias de resultado',
    'sobre.cta': 'Conheça os cursos',
    'portfolio.label': 'Portfólio',
    'portfolio.h2': 'Resultados que<br /><em>falam por si</em>',
    'videos.label': 'Na prática',
    'videos.h2': 'O procedimento <em>em ação</em>',
    'antesdepois.tag': 'Transformações reais',
    'antesdepois.h2': 'Antes <em>&amp; depois</em>',
    'faq.label': 'Dúvidas',
    'faq.h2': 'Perguntas <em>frequentes</em>',
    'faq.q1': 'Quanto tempo dura o resultado do Lash Lifting?',
    'faq.a1': 'O resultado acompanha o ciclo natural de crescimento dos cílios, durando entre 45 e 60 dias. Após esse período, os fios crescem e o efeito desaparece gradualmente, sem necessidade de remoção.',
    'faq.q2': 'E o Brow Lamination, quanto tempo o efeito permanece?',
    'faq.a2': 'O Brow Lamination dura em média 4 a 6 semanas, dependendo da oleosidade da pele e da rotina de cuidados da cliente. Com hidratação adequada os fios mantêm a fixação por mais tempo.',
    'faq.q3': 'O Lash Lifting danifica os cílios naturais?',
    'faq.a3': 'Quando realizado com técnica correta e produtos aprovados, o Lash Lifting não danifica os cílios. O protocolo inclui nutrição ao final do procedimento, deixando os fios mais fortes e hidratados.',
    'faq.q4': 'Qual a diferença entre Lash Lifting e Brow Lamination?',
    'faq.a4': 'O Lash Lifting curva e projeta os cílios, criando um efeito de olhar aberto. O Brow Lamination laminiza e alinha os pelos das sobrancelhas, dando fixação e volume. São técnicas complementares, muitas profissionais oferecem ambas como serviço único.',
    'faq.q5': 'Como são estruturados os materiais didáticos?',
    'faq.a5': 'Cada curso tem um manual próprio desenvolvido por Fernanda Garcia com base em mais de 10 anos de experiência. O de Lash Lifting cobre ciclo do cílio, química dos produtos, biossegurança e metodologias exclusivas de aplicação. O de Brow Lamination inclui mapeamento dos pelos, protocolos de laminação, fixação e nutrição, tudo passo a passo.',
    'contato.label': 'Inscrições',
    'contato.h2': 'Pronta para dar<br /><em>o próximo passo?</em>',
    'contato.p': 'Preencha o formulário e entraremos em contato pelo WhatsApp para apresentar todos os detalhes dos cursos disponíveis.',
  },
  en: {
    'nav.sobre': 'About',
    'nav.portfolio': 'Portfolio',
    'nav.videos': 'Videos',
    'nav.cursos': 'Courses',
    'nav.lash': 'Lash Lifting Beginner',
    'nav.brow': 'Brow Lamination + Design',
    'nav.coreano': 'Korean Method',
    'nav.cta': 'Enroll now',
    'hero.eyebrow': 'Welcome to',
    'hero.tagline': 'Elite techniques in Lash Lifting, Brow Lamination and Eyebrow Design to build a highly profitable beauty career.',
    'hero.cta': 'Enroll now',
    'hero.scroll': 'Scroll to discover',
    'sobre.label': 'About me',
    'sobre.h2': 'Technique that <em>transforms</em>',
    'sobre.p1': 'I am Fernanda Garcia, specialist and educator in the eye beauty field. I developed my own methodology that combines technical precision, safety and natural results that delight every client.',
    'sobre.p2': 'At <strong>Fernanda Garcia Academy</strong>, I bring together everything I have learned — from product chemistry to hands-on practice — in a complete educational program for you to master the fastest-growing procedures in the beauty market.',
    'sobre.stat1': 'Students trained',
    'sobre.stat2': 'Years of experience',
    'sobre.stat3': 'Days of results',
    'sobre.cta': 'Explore courses',
    'portfolio.label': 'Portfolio',
    'portfolio.h2': 'Results that<br /><em>speak for themselves</em>',
    'videos.label': 'In practice',
    'videos.h2': 'The procedure <em>in action</em>',
    'antesdepois.tag': 'Real transformations',
    'antesdepois.h2': 'Before <em>&amp; after</em>',
    'faq.label': 'Questions',
    'faq.h2': 'Frequently <em>asked questions</em>',
    'faq.q1': 'How long does the Lash Lifting result last?',
    'faq.a1': 'The result follows the natural lash growth cycle, lasting between 45 and 60 days. After that period, the lashes grow out and the effect gradually fades — no removal needed.',
    'faq.q2': 'And Brow Lamination — how long does the effect last?',
    'faq.a2': 'Brow Lamination lasts on average 4 to 6 weeks, depending on skin oiliness and the client\'s care routine. With proper hydration, the hairs maintain their shape longer.',
    'faq.q3': 'Does Lash Lifting damage natural lashes?',
    'faq.a3': 'When performed with the correct technique and approved products, Lash Lifting does not damage the lashes. The protocol includes a nourishing step at the end, leaving the lashes stronger and more hydrated.',
    'faq.q4': 'What is the difference between Lash Lifting and Brow Lamination?',
    'faq.a4': 'Lash Lifting curls and projects the lashes, creating an open-eye effect. Brow Lamination smooths and aligns the brow hairs, giving them hold and volume. They are complementary techniques — many professionals offer both as a combined service.',
    'faq.q5': 'How are the course materials structured?',
    'faq.a5': 'Each course has its own manual developed by Fernanda Garcia based on more than 10 years of experience. The Lash Lifting manual covers lash growth cycles, product chemistry, biosafety and exclusive application methodologies. The Brow Lamination manual includes hair mapping, lamination protocols, fixation and nourishment — all step by step.',
    'contato.label': 'Enrollment',
    'contato.h2': 'Ready to take<br /><em>the next step?</em>',
    'contato.p': 'Fill in the form and we will get in touch via WhatsApp with all the details about our available courses.',
  },
};

function setLang(lang) {
  localStorage.setItem('fg-lang', lang);
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  const btn = document.getElementById('langSwitch');
  if (btn) btn.textContent = lang === 'pt' ? 'EN' : 'PT';

  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t[key];
    if (!val) return;
    // If element contains SVG children (e.g. FAQ buttons), update only text node
    if (el.querySelector('svg')) {
      const tn = [...el.childNodes].find(n => n.nodeType === 3 && n.textContent.trim());
      if (tn) tn.textContent = '\n              ' + val + '\n              ';
    } else {
      el.innerHTML = val;
    }
  });
}

(function initLang() {
  const saved = localStorage.getItem('fg-lang') || 'pt';
  // Apply saved lang after DOM is ready
  if (saved !== 'pt') setLang(saved);
  else {
    const btn = document.getElementById('langSwitch');
    if (btn) btn.textContent = 'EN';
  }
  document.getElementById('langSwitch')?.addEventListener('click', () => {
    const current = localStorage.getItem('fg-lang') || 'pt';
    setLang(current === 'pt' ? 'en' : 'pt');
  });
})();

/* ════════════════════════════════════════
   1. YEAR
════════════════════════════════════════ */
const yearEl = $("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── sobre photo — src fixo no HTML ── */
(function () {
  const img = $("#sobrePhoto");
  if (!img) return;
  img.onload = () => img.classList.add("loaded");
  img.onerror = () => {}; // mantém o fallback FG se arquivo não existir
})();

/* ════════════════════════════════════════
   3. NAVBAR
════════════════════════════════════════ */
const navbar = $("#navbar");
const burger = $("#burger");
const mobileNav = $("#mobileNav");

// Scroll → solid background
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 40);
  },
  { passive: true },
);

// Burger toggle
burger?.addEventListener("click", () => {
  burger.classList.toggle("open");
  mobileNav.classList.toggle("open");
});

// Close mobile nav on link click
$$(".mobile-link").forEach((link) => {
  link.addEventListener("click", () => {
    burger.classList.remove("open");
    mobileNav.classList.remove("open");
  });
});

/* ════════════════════════════════════════
   4. CUSTOM CURSOR
════════════════════════════════════════ */
const cursor = $("#cursor");
const follower = $("#cursorFollower");

if (cursor && follower && window.matchMedia("(hover: hover)").matches) {
  let mx = 0,
    my = 0,
    fx = 0,
    fy = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + "px";
    cursor.style.top = my + "px";
  });

  (function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + "px";
    follower.style.top = fy + "px";
    requestAnimationFrame(animateFollower);
  })();
}

/* ════════════════════════════════════════
   5. MOSAIC — fotos intercaladas com cards
════════════════════════════════════════ */
(function loadMosaic() {
  // Lista fixa — ordem preservada, 4 fotos = 1 linha do mosaico
  const FOTOS = [
    "fotos/Mosaico 1.png",
    "fotos/Mosaico 2.JPG",
    "fotos/Mosaico 3.JPG",
    "fotos/Mosaico 4.JPG",
  ];

  const photoCandidates = FOTOS;

  // Patterns reais na pasta logos/
  // idx 0 = Preto → card accent (fundo marrom); idx 1 = Branco → card dark (fundo escuro)
  const knownPatterns = ["logos/pattern preto transp.png", "logos/pattern branco transp.png"];

  // Cards de cor sólida que aparecem no mosaico (intercalados)
  const CARDS = [
    { type: "dark", patternIdx: 1, text: "Técnica & Arte", sub: "Academy" },
    {
      type: "accent",
      patternIdx: 0,
      text: "Formando Profissionais",
      sub: "+10 anos",
    },
    { type: "dark", patternIdx: 1, text: "+100 Alunas", sub: "Formadas" },
  ];

  const foundPhotos = new Array(FOTOS.length).fill(null); // indexed — preserva ordem
  const foundPatterns = [];
  let pendingPhotos = FOTOS.length;
  let pendingPatterns = knownPatterns.length;

  function tryBuildMosaic() {
    if (pendingPhotos > 0 || pendingPatterns > 0) return;

    const fallback = $("#mosaicFallback");
    const photos = foundPhotos.filter(Boolean);
    if (photos.length === 0) {
      // Placeholders com animação
      $$(".mosaic-ph").forEach((el, i) => {
        el.style.transition = `opacity 0.7s ease ${i * 0.12}s, transform 0.7s ease ${i * 0.12}s`;
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
      return;
    }

    if (fallback) fallback.remove();
    const mosaicEl = $("#mosaic");

    // Intercalar fotos com cards
    let photoIdx = 0;
    let cardIdx = 0;
    const totalItems =
      photos.length + Math.min(CARDS.length, Math.floor(photos.length / 2));

    for (let i = 0; i < totalItems; i++) {
      // A cada 2 fotos, inserir 1 card
      const isCard = i % 3 === 2 && cardIdx < CARDS.length;

      if (isCard) {
        const card = CARDS[cardIdx++ % CARDS.length];
        const item = document.createElement("div");
        item.className = `mosaic__item mosaic__item--card${card.type === "dark" ? " card--dark" : ""} gs-reveal`;

        // Pattern: arquivo real ou inline SVG fallback
        const patDiv = document.createElement("div");
        const patSrc = foundPatterns[card.patternIdx] || foundPatterns[0];
        if (patSrc) {
          patDiv.className = "card__pattern";
          patDiv.style.backgroundImage = `url('${patSrc}')`;
          patDiv.style.backgroundSize = "1400px";
          patDiv.style.backgroundRepeat = "repeat";
          patDiv.style.opacity = "0.08";
        } else {
          patDiv.className = `card__pattern card__pattern--${card.patternIdx === 0 ? "lines" : "dots"}`;
        }

        const textDiv = document.createElement("div");
        textDiv.className = "card__text";
        textDiv.innerHTML = `<strong>${card.text}</strong><span>${card.sub}</span>`;

        item.appendChild(patDiv);
        item.appendChild(textDiv);
        mosaicEl.appendChild(item);
      } else if (photoIdx < photos.length) {
        const item = document.createElement("div");
        item.className = "mosaic__item mosaic__item--photo gs-reveal";

        const img = document.createElement("img");
        img.src = photos[photoIdx++];
        img.alt = "Portfólio Fernanda Garcia";
        img.loading = "lazy";

        const overlay = document.createElement("div");
        overlay.className = "mosaic__overlay";

        item.appendChild(img);
        item.appendChild(overlay);
        mosaicEl.appendChild(item);
      }
    }

    initScrollReveal();
  }

  photoCandidates.forEach((src, idx) => {
    const img = new Image();
    img.onload = () => {
      foundPhotos[idx] = src;
      pendingPhotos--;
      tryBuildMosaic();
    };
    img.onerror = () => {
      pendingPhotos--;
      tryBuildMosaic();
    };
    img.src = src;
  });

  // Probe patterns reais
  knownPatterns.forEach((src, idx) => {
    const img = new Image();
    img.onload = () => {
      foundPatterns[idx] = src;
      pendingPatterns--;
      tryBuildMosaic();
    };
    img.onerror = () => {
      pendingPatterns--;
      tryBuildMosaic();
    };
    img.src = src;
  });
})();

/* ════════════════════════════════════════
   6. VIDEO CAROUSEL — INFINITO
════════════════════════════════════════ */
(function initCarousel() {
  // Todos os arquivos da pasta videos/
  const ITEMS = [
    { type: "video", src: "videos/Principal.mp4" },
    { type: "video", src: "videos/Lash 1.mp4" },
    { type: "video", src: "videos/Brow - depoimento.mp4" },
    { type: "video", src: "videos/divulg 1.mp4" },
    { type: "video", src: "videos/Brow-lam.mp4" },
    { type: "video", src: "videos/BROW LAMINATION.mp4" },
    { type: "video", src: "videos/design sob.mp4" },
    { type: "video", src: "videos/Pagina - Lash.mp4" },
    { type: "video", src: "videos/Pagina - Brow.mp4" },
    { type: "video", src: "videos/Pagina - Lash Coreano.mp4" },
    { type: "photo", src: "videos/antes-depois1.JPG" },
    { type: "photo", src: "videos/antes-depois2.JPG" },
    { type: "photo", src: "videos/antes-depois3.JPG" },
  ];

  const fallback = $("#carouselFallback");
  if (fallback) fallback.remove();

  const carousel = $("#videoCarousel");
  if (!carousel) return;

  const CARD_W = 260;
  const GAP = 24;
  const STEP = CARD_W + GAP;

  // Cria um card DOM a partir de um item
  function makeCard(item, isActive) {
    const card = document.createElement("div");
    card.className = "video-card" + (isActive ? " active" : "");

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.preload = "metadata";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      if (isActive) {
        video.autoplay = true;
        video.controls = true;
      }
      card.appendChild(video);
    } else {
      const img = document.createElement("img");
      img.src = item.src;
      img.alt = "Antes e depois";
      card.appendChild(img);
    }
    return card;
  }

  // Proba cada arquivo antes de criar o card — arquivos ausentes são ignorados
  let pending = ITEMS.length;
  const found = new Array(ITEMS.length).fill(null);

  function onProbed() {
    if (--pending > 0) return;

    const validItems = found.filter(Boolean);
    if (validItems.length === 0) return;

    const total = validItems.length;
    const track = document.createElement("div");
    track.className = "carousel__track";
    track.style.transition = "none";

    // Estrutura infinita: [clone_last] [item0…itemN] [clone_first]
    const cloneLast = makeCard(validItems[total - 1], false);
    cloneLast.dataset.clone = "last";
    track.appendChild(cloneLast);

    validItems.forEach((item, i) => {
      track.appendChild(makeCard(item, i === 0));
    });

    const cloneFirst = makeCard(validItems[0], false);
    cloneFirst.dataset.clone = "first";
    track.appendChild(cloneFirst);

    carousel.appendChild(track);
    setupCarousel(track, total);
  }

  ITEMS.forEach((item, idx) => {
    if (item.type === "photo") {
      const img = new Image();
      img.onload = () => { found[idx] = item; onProbed(); };
      img.onerror = () => onProbed();
      img.src = item.src;
    } else {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => { found[idx] = item; onProbed(); };
      v.onerror = () => onProbed();
      v.src = item.src;
    }
  });

  function setupCarousel(track, total) {
    // Índice no track: 0 = cloneLast, 1…total = reais, total+1 = cloneFirst
    let trackIdx = 1;
    let isAnimating = false;

    function getTranslateX(idx) {
      return carousel.offsetWidth / 2 - CARD_W / 2 - idx * STEP;
    }

    function setPos(idx, animate) {
      track.style.transition = animate
        ? "transform 0.5s var(--ease-out)"
        : "none";
      track.style.transform = `translateX(${getTranslateX(idx)}px)`;
    }

    function allCards() {
      return [...track.querySelectorAll(".video-card")];
    }

    function activateIdx(idx) {
      allCards().forEach((c, i) => {
        const active = i === idx;
        c.classList.toggle("active", active);
        const v = c.querySelector("video");
        if (!v) return;
        if (active) {
          v.controls = true;
          v.play().catch(() => {});
        } else {
          v.pause();
          v.controls = false;
        }
      });
    }

    function goTo(idx) {
      if (isAnimating) return;
      isAnimating = true;
      trackIdx = idx;
      activateIdx(trackIdx);
      setPos(trackIdx, true);
    }

    // Só responde à transição do próprio track, ignorando borbulhamento dos cards
    track.addEventListener("transitionend", (e) => {
      if (e.target !== track) return;
      isAnimating = false;
      if (trackIdx === 0) {
        trackIdx = total;
        setPos(trackIdx, false);
      } else if (trackIdx === total + 1) {
        trackIdx = 1;
        setPos(trackIdx, false);
      }
    });

    $("#videoPrev")?.addEventListener("click", () => goTo(trackIdx - 1));
    $("#videoNext")?.addEventListener("click", () => goTo(trackIdx + 1));

    allCards().forEach((card, i) => {
      card.addEventListener("click", () => {
        if (i !== trackIdx) goTo(i);
      });
    });

    // Inicializa após layout pronto
    function initPosition() {
      setPos(trackIdx, false);
      activateIdx(trackIdx);
    }
    if (document.readyState === "complete") {
      initPosition();
    } else {
      window.addEventListener("load", initPosition, { once: true });
    }

    // Recalcula ao redimensionar
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setPos(trackIdx, false), 150);
    });

    // Pausa ao sair do viewport
    const section = document.getElementById("videos");
    if (section) {
      new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) {
            allCards().forEach((c) => c.querySelector("video")?.pause());
          } else {
            const v = allCards()[trackIdx]?.querySelector("video");
            if (v) v.play().catch(() => {});
          }
        },
        { threshold: 0.2 },
      ).observe(section);
    }
  }
})();

/* ════════════════════════════════════════
   7. GSAP ANIMATIONS
════════════════════════════════════════ */
function initScrollReveal() {
  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined")
    return;
  gsap.registerPlugin(ScrollTrigger);

  // Generic reveal
  $$(".gs-reveal").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none",
      },
    });
  });

  // Staggered dep cards
  const depCards = $$(".dep-card");
  if (depCards.length) {
    gsap.set(depCards, { opacity: 0, y: 30 });
    gsap.to(depCards, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.18,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".depoimentos__grid",
        start: "top 82%",
      },
    });
  }
}

// Hero entrance (runs regardless of GSAP — will be enhanced when GSAP loads)
// ScrollReveal runs after page load (GSAP is deferred)
window.addEventListener("load", () => {
  initScrollReveal();
});

/* ════════════════════════════════════════
   8. FAQ ACCORDION
════════════════════════════════════════ */
$$(".faq__question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq__item");
    const answer = item.querySelector(".faq__answer");
    const isOpen = item.classList.contains("open");

    // Fecha todos
    $$(".faq__item.open").forEach((el) => {
      el.classList.remove("open");
      el.querySelector(".faq__answer").style.maxHeight = "0";
    });

    // Abre este se estava fechado
    if (!isOpen) {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

/* ════════════════════════════════════════
   9. FORMULÁRIO → WHATSAPP
════════════════════════════════════════ */
const form = $("#contactForm");

form?.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = $("#nome");
  const telefone = $("#telefone");
  const ddi = $("#ddi");
  const mensagem = $("#mensagem");
  let valid = true;

  // Reset errors
  $$(".form-group").forEach((g) => g.classList.remove("has-error"));
  $$(".form-error").forEach((el) => {
    el.textContent = "";
  });

  // Validate
  if (!nome.value.trim()) {
    showError("erroNome", "Por favor, informe seu nome.", nome);
    valid = false;
  }
  if (!telefone.value.trim()) {
    showError("erroTelefone", "Por favor, informe seu telefone.", telefone);
    valid = false;
  }

  if (!valid) return;

  // Build WhatsApp message
  const msgParts = [
    `Olá Fernanda! 😊`,
    ``,
    `Meu nome é *${nome.value.trim()}* e gostaria de saber mais sobre os *cursos disponíveis*.`,
    ``,
    `📱 Telefone: ${ddi?.value || "+55"} ${telefone.value.trim()}`,
  ];
  if (mensagem.value.trim()) {
    msgParts.push(``, `💬 Mensagem: ${mensagem.value.trim()}`);
  }

  const encoded = encodeURIComponent(msgParts.join("\n"));
  window.open(
    `https://wa.me/5519971058988?text=${encoded}`,
    "_blank",
    "noopener",
  );

  // Reset form
  form.reset();
});

function showError(id, msg, inputEl) {
  const err = $("#" + id);
  if (err) err.textContent = msg;
  inputEl?.closest(".form-group")?.classList.add("has-error");
  inputEl?.focus();
}

/* ════════════════════════════════════════
   9. PHONE MASK
════════════════════════════════════════ */
$("#telefone")?.addEventListener("input", function () {
  let v = this.value.replace(/\D/g, "").slice(0, 11);
  if (v.length > 10) {
    v = v.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (v.length > 6) {
    v = v.replace(/^(\d{2})(\d{4})(\d*)$/, "($1) $2-$3");
  } else if (v.length > 2) {
    v = v.replace(/^(\d{2})(\d*)$/, "($1) $2");
  }
  this.value = v;
});
