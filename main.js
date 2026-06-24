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
    "nav.sobre": "Sobre",
    "nav.portfolio": "Portfólio",
    "nav.videos": "Vídeos",
    "nav.cursos": "Cursos",
    "nav.lash": "Lash Lifting Iniciante",
    "nav.brow": "Brow Lamination + Design",
    "nav.coreano": "Método Coreano",
    "nav.cta": "Me inscrever",
    "hero.eyebrow": "Bem-vinda ao",
    "hero.tagline":
      "Técnicas de elite em Lash Lifting, Brow Lamination e Design de Sobrancelhas para construir uma carreira de alta lucratividade.",
    "hero.cta": "Quero me inscrever",
    "hero.scroll": "Role para descobrir",
    "sobre.label": "Sobre mim",
    "sobre.h2": "Técnica que <em>transforma</em>",
    "sobre.p1":
      "Sou Fernanda Garcia, especialista e educadora na área de embelezamento do olhar. Desenvolvi uma metodologia própria que une precisão técnica, segurança e resultados naturais que encantam cada cliente.",
    "sobre.p2":
      "Na <strong>Fernanda Garcia Academy</strong>, reúno tudo que aprendi, da química dos produtos à prática de bancada, em um material didático completo para você dominar os procedimentos que mais crescem no mercado da beleza.",
    "sobre.stat1": "Alunas formadas",
    "sobre.stat2": "Anos de experiência",
    "sobre.stat3": "Dias de resultado",
    "sobre.cta": "Conheça os cursos",
    "portfolio.label": "Portfólio",
    "portfolio.h2": "Resultados que<br /><em>falam por si</em>",
    "videos.label": "Na prática",
    "videos.h2": "O procedimento <em>em ação</em>",
    "antesdepois.tag": "Transformações reais",
    "antesdepois.h2": "Antes <em>&amp; depois</em>",
    "faq.label": "Dúvidas",
    "faq.h2": "Perguntas <em>frequentes</em>",
    "faq.q1": "Quanto tempo dura o resultado do Lash Lifting?",
    "faq.a1":
      "O resultado acompanha o ciclo natural de crescimento dos cílios, durando entre 45 e 60 dias. Após esse período, os fios crescem e o efeito desaparece gradualmente, sem necessidade de remoção.",
    "faq.q2": "E o Brow Lamination, quanto tempo o efeito permanece?",
    "faq.a2":
      "O Brow Lamination dura em média 4 a 6 semanas, dependendo da oleosidade da pele e da rotina de cuidados da cliente. Com hidratação adequada os fios mantêm a fixação por mais tempo.",
    "faq.q3": "O Lash Lifting danifica os cílios naturais?",
    "faq.a3":
      "Quando realizado com técnica correta e produtos aprovados, o Lash Lifting não danifica os cílios. O protocolo inclui nutrição ao final do procedimento, deixando os fios mais fortes e hidratados.",
    "faq.q4": "Qual a diferença entre Lash Lifting e Brow Lamination?",
    "faq.a4":
      "O Lash Lifting curva e projeta os cílios, criando um efeito de olhar aberto. O Brow Lamination laminiza e alinha os pelos das sobrancelhas, dando fixação e volume. São técnicas complementares, muitas profissionais oferecem ambas como serviço único.",
    "faq.q5": "Como são estruturados os materiais didáticos?",
    "faq.a5":
      "Cada curso tem um manual próprio desenvolvido por Fernanda Garcia com base em mais de 10 anos de experiência. O de Lash Lifting cobre ciclo do cílio, química dos produtos, biossegurança e metodologias exclusivas de aplicação. O de Brow Lamination inclui mapeamento dos pelos, protocolos de laminação, fixação e nutrição, tudo passo a passo.",
    "contato.label": "Inscrições",
    "contato.h2": "Pronta para dar<br /><em>o próximo passo?</em>",
    "contato.p":
      "Preencha o formulário e entraremos em contato pelo WhatsApp para apresentar todos os detalhes dos cursos disponíveis.",
    // footer
    "footer.tagline": "Transformando paixão em profissão.",
    "footer.links": "Links",
    "footer.contact": "Contato",
    "footer.social": "Redes sociais",
    "footer.rights": "Todos os direitos reservados.",
    "footer.dev": "Desenvolvido por",
    // cursos.html
    "cursos.label": "Fernanda Garcia Academy",
    "cursos.h1": "Nossos <em>cursos</em>",
    "cursos.back": "Voltar ao início",
    "cursos.lash.tag": "Curso iniciante",
    "cursos.lash.title": "Lash Lifting Profissional",
    "cursos.lash.desc":
      "O guia completo para curvar, projetar e alinhar cílios naturais, da química dos produtos à prática de bancada. Resultado dura 45 – 60 dias.",
    "cursos.lash.badge": "Disponível",
    "cursos.lash.cta": "Ver curso",
    "cursos.brow.tag": "Curso completo",
    "cursos.brow.title": "Brow Lamination + Design Estratégico",
    "cursos.brow.desc":
      "Laminação e design visagista em um único curso. Sobrancelhas personalizadas para cada rosto, com resultado duradouro de 4 a 6 semanas.",
    "cursos.brow.badge": "Disponível",
    "cursos.brow.cta": "Ver curso",
    "cursos.coreano.tag": "Aperfeiçoamento · Avançado",
    "cursos.coreano.title": "Lash Lifting - Método Coreano",
    "cursos.coreano.desc":
      "Para profissionais que já dominam o método tradicional. Técnica de aplicação direta com maior velocidade, controle e segurança no procedimento.",
    "cursos.coreano.badge": "Disponível",
    "cursos.coreano.cta": "Ver curso",
    "cursos.design.tag": "Em breve",
    "cursos.design.title": "Design de Sobrancelha",
    "cursos.design.desc":
      "Mapeamento facial, técnicas de design e pigmentação para criar sobrancelhas personalizadas e harmoniosas. Conteúdo em desenvolvimento.",
    "cursos.design.badge": "Indisponível no momento",
    // lash-lifting.html
    "lash.back": "Todos os cursos",
    "lash.tag": "Curso iniciante",
    "lash.h1": "Lash Lifting <em>Profissional</em>",
    "lash.sub":
      "Aprenda a curvar, projetar e alinhar cílios naturais com técnica, segurança e resultado duradouro.",
    "lash.h2": "O que é o <em>Lash Lifting?</em>",
    "lash.p1":
      "O Lash Lifting é um procedimento estético inovador que curva, projeta e alinha os fios naturais dos cílios, sem a necessidade de aplicar extensões artificiais ou alongamentos.",
    "lash.p2":
      'Através de uma técnica precisa e do uso de produtos específicos que respeitam a saúde capilar, o procedimento faz com que os cílios naturais da cliente aparentem ser consideravelmente maiores, mais densos e organizados. O resultado é um olhar marcante, expressivo e com um efeito "cílios de boneca" que dura de 45 a 60 dias.',
    "lash.modulos": "Conteúdo do curso",
    "lash.m1": "Introdução ao Lash Lifting",
    "lash.m2": "Comparações com Outras Profissões Estéticas",
    "lash.m3": "O Ciclo de Crescimento dos Cílios",
    "lash.m4": "Química dos Produtos Utilizados",
    "lash.m5": "Segurança e Regulamentação",
    "lash.m6": "Segurança e Prevenção de Erros Comuns",
    "lash.m7": "Contraindicações e Patologias",
    "lash.m8": "Fichas de Anamnese e Controle de Cliente",
    "lash.m9": "Teste de Reação Alérgica",
    "lash.m10": "Materiais Necessários",
    "lash.m11": "Biossegurança",
    "lash.m12": "Análise de Pálpebra e Cílios",
    "lash.m13": "Método de Teste de Maleabilidade",
    "lash.m14": "Etapas Práticas do Lash Lifting",
    "lash.sidebar.label": "Fernanda Garcia Academy",
    "lash.sidebar.h3": "Lash Lifting Profissional",
    "lash.sidebar.dur": "Resultado dura 45–60 dias",
    "lash.sidebar.level": "Nível iniciante",
    "lash.sidebar.mat": "Material didático completo",
    "lash.sidebar.cta": "Quero me inscrever",
    "lash.sidebar.note":
      "Entraremos em contato pelo WhatsApp com todos os detalhes.",
    // brow-lamination.html
    "brow.back": "Todos os cursos",
    "brow.tag": "Curso completo",
    "brow.h1": "Brow Lamination +<br /><em>Design Estratégico</em>",
    "brow.sub":
      "Redefina, alinhe e projete sobrancelhas personalizadas, unindo laminação e design visagista para resultados que duram de 4 a 6 semanas.",
    "brow.h2": "O que é o <em>Brow Lamination</em> com Design Estratégico?",
    "brow.p1":
      "O Brow Lamination é um procedimento estético avançado que redefine, alinha e disciplina os pelos naturais das sobrancelhas. Através de uma técnica de alinhamento e do uso de produtos específicos que alteram a estrutura do fio de forma segura, os pelos tornam-se maleáveis, permitindo que fiquem penteados na direção desejada.",
    "brow.p2":
      "O grande diferencial deste procedimento é a sua união com o Design de Sobrancelhas Estratégico, que é a nossa assinatura. Longe de moldes prontos ou formatos artificiais, este estilo de design é totalmente personalizado para cada rosto, respeitando as linhas naturais, a anatomia e a identidade única de cada cliente, com foco absoluto na naturalidade.",
    "brow.p3":
      "O resultado é um efeito visual imediato de sobrancelhas mais cheias, robustas e simétricas, sendo a solução perfeita tanto para cobrir falhas quanto para domar pelos desalinhados, rebeldes ou que nascem para baixo. Aliando a maleabilidade do lamination ao visagismo do design estratégico, o procedimento proporciona desde o visual moderno das fluffy brows (sobrancelhas selvagens e volumosas) até um estilo mais clássico, sofisticado e discreto, sempre sob medida para a cliente e mantendo sua durabilidade por 4 a 6 semanas.",
    "brow.modulos": "Conteúdo do curso",
    "brow.m1": "Introdução ao Brow Lamination",
    "brow.m2": "Comparações com Outras Profissões Estéticas",
    "brow.m3": "O Ciclo de Crescimento dos Fios",
    "brow.m4": "Química dos Produtos Utilizados",
    "brow.m5": "Segurança e Regulamentação",
    "brow.m6": "Segurança e Prevenção de Erros Comuns",
    "brow.m7": "Contraindicações e Patologias",
    "brow.m8": "Fichas de Anamnese e Controle de Cliente",
    "brow.m9": "Teste de Reação Alérgica",
    "brow.m10": "Materiais Necessários",
    "brow.m11": "Biossegurança",
    "brow.m12": "Análise de Formato e Visagismo",
    "brow.m13": "Etapas Práticas de Mapping e Brow Lamination",
    "brow.sidebar.label": "Fernanda Garcia Academy",
    "brow.sidebar.h3": "Brow Lamination + Design Estratégico",
    "brow.sidebar.dur": "Resultado dura 4–6 semanas",
    "brow.sidebar.level": "Nível iniciante ao intermediário",
    "brow.sidebar.mat": "Material didático completo",
    "brow.sidebar.cta": "Quero me inscrever",
    "brow.sidebar.note":
      "Entraremos em contato pelo WhatsApp com todos os detalhes.",
    // lash-lifting-coreano.html
    "coreano.back": "Todos os cursos",
    "coreano.tag": "Curso de aperfeiçoamento · Nível avançado",
    "coreano.h1": "Lash Lifting<br /><em>Método Coreano</em>",
    "coreano.sub":
      "Para profissionais que já dominam a técnica tradicional e querem elevar eficiência, velocidade e segurança ao próximo nível.",
    "coreano.h2": "O Lash Lifting no <em>Método Coreano</em>",
    "coreano.p1":
      "O Lash Lifting no Método Coreano é uma especialização avançada voltada para profissionais que já dominam a técnica tradicional e desejam alcançar o próximo nível de eficiência e controle em mesa. O resultado estético entrega o mesmo visual impecável e de alto impacto do método convencional, fios curvados, alinhados e destacados, mas a grande revolução está na dinâmica do atendimento e na segurança do processo.",
    "coreano.aviso":
      "Este curso é voltado exclusivamente para profissionais que já possuem experiência no método tradicional de Lash Lifting. O pré-requisito é a bagagem prática adquirida no método convencional.",
    "coreano.intro":
      "Esta proposta avançada destaca-se por três pilares comerciais e técnicos indispensáveis:",
    "coreano.p1.num": "01",
    "coreano.p1.title": "Faturamento Escalável pelo Menor Tempo",
    "coreano.p1.desc":
      "Com uma metodologia ágil, o tempo de procedimento é significativamente reduzido, permitindo que você aumente o fluxo de atendimentos diários e multiplique o faturamento.",
    "coreano.p2.num": "02",
    "coreano.p2.title": "Controle Direto e Segurança Extrema",
    "coreano.p2.desc":
      "O método baseia-se em uma aplicação onde os fios são atingidos pelo produto de forma direta, possibilitando controle muito maior sobre a ação da química, tornando o procedimento extremamente seguro e previsível.",
    "coreano.p3.num": "03",
    "coreano.p3.title": "Exigência de Expertise Prática",
    "coreano.p3.desc":
      "Por se tratar de uma técnica de alta precisão e agilidade, este não é um curso para iniciantes. Para se especializar no Método Coreano, o profissional já deve dominar o método tradicional.",
    "coreano.modulos": "Conteúdo do curso",
    "coreano.m1": "A Transição do Tradicional para o Coreano",
    "coreano.m2": "A Dinâmica da Aplicação Direta",
    "coreano.m3": "Tipos de Cílios Aptos para a Técnica",
    "coreano.m4": "Cílios Limítrofes",
    "coreano.m5": "Análise Avançada de Moldes",
    "coreano.m6": "Acoplagem de Alta Velocidade",
    "coreano.m7": "Ação do Produto na Aplicação Direta",
    "coreano.m8": "O Cronômetro de Precisão",
    "coreano.m9": "Leitura Visual Avançada",
    "coreano.m10": "Protocolo de Biossegurança Avançado",
    "coreano.sidebar.label": "Fernanda Garcia Academy",
    "coreano.sidebar.h3": "Lash Lifting | Método Coreano",
    "coreano.sidebar.dur": "Resultado dura 45–60 dias",
    "coreano.sidebar.level": "Nível avançado",
    "coreano.sidebar.prereq": "Pré-requisito: método tradicional",
    "coreano.sidebar.cta": "Quero me inscrever",
    "coreano.sidebar.note":
      "Entraremos em contato pelo WhatsApp com todos os detalhes.",
  },
  en: {
    "nav.sobre": "About",
    "nav.portfolio": "Portfolio",
    "nav.videos": "Videos",
    "nav.cursos": "Courses",
    "nav.lash": "Lash Lifting Beginner",
    "nav.brow": "Brow Lamination + Design",
    "nav.coreano": "Korean Method",
    "nav.cta": "Enroll now",
    "hero.eyebrow": "Welcome to",
    "hero.tagline":
      "Elite techniques in Lash Lifting, Brow Lamination and Eyebrow Design to build a highly profitable beauty career.",
    "hero.cta": "Enroll now",
    "hero.scroll": "Scroll to discover",
    "sobre.label": "About me",
    "sobre.h2": "Technique that <em>transforms</em>",
    "sobre.p1":
      "I am Fernanda Garcia, specialist and educator in the eye beauty field. I developed my own methodology that combines technical precision, safety and natural results that delight every client.",
    "sobre.p2":
      "At <strong>Fernanda Garcia Academy</strong>, I bring together everything I have learned — from product chemistry to hands-on practice — in a complete educational program for you to master the fastest-growing procedures in the beauty market.",
    "sobre.stat1": "Students trained",
    "sobre.stat2": "Years of experience",
    "sobre.stat3": "Days of results",
    "sobre.cta": "Explore courses",
    "portfolio.label": "Portfolio",
    "portfolio.h2": "Results that<br /><em>speak for themselves</em>",
    "videos.label": "In practice",
    "videos.h2": "The procedure <em>in action</em>",
    "antesdepois.tag": "Real transformations",
    "antesdepois.h2": "Before <em>&amp; after</em>",
    "faq.label": "Questions",
    "faq.h2": "Frequently <em>asked questions</em>",
    "faq.q1": "How long does the Lash Lifting result last?",
    "faq.a1":
      "The result follows the natural lash growth cycle, lasting between 45 and 60 days. After that period, the lashes grow out and the effect gradually fades — no removal needed.",
    "faq.q2": "And Brow Lamination — how long does the effect last?",
    "faq.a2":
      "Brow Lamination lasts on average 4 to 6 weeks, depending on skin oiliness and the client's care routine. With proper hydration, the hairs maintain their shape longer.",
    "faq.q3": "Does Lash Lifting damage natural lashes?",
    "faq.a3":
      "When performed with the correct technique and approved products, Lash Lifting does not damage the lashes. The protocol includes a nourishing step at the end, leaving the lashes stronger and more hydrated.",
    "faq.q4":
      "What is the difference between Lash Lifting and Brow Lamination?",
    "faq.a4":
      "Lash Lifting curls and projects the lashes, creating an open-eye effect. Brow Lamination smooths and aligns the brow hairs, giving them hold and volume. They are complementary techniques — many professionals offer both as a combined service.",
    "faq.q5": "How are the course materials structured?",
    "faq.a5":
      "Each course has its own manual developed by Fernanda Garcia based on more than 10 years of experience. The Lash Lifting manual covers lash growth cycles, product chemistry, biosafety and exclusive application methodologies. The Brow Lamination manual includes hair mapping, lamination protocols, fixation and nourishment — all step by step.",
    "contato.label": "Enrollment",
    "contato.h2": "Ready to take<br /><em>the next step?</em>",
    "contato.p":
      "Fill in the form and we will get in touch via WhatsApp with all the details about our available courses.",
    // footer
    "footer.tagline": "Turning passion into profession.",
    "footer.links": "Links",
    "footer.contact": "Contact",
    "footer.social": "Social media",
    "footer.rights": "All rights reserved.",
    "footer.dev": "Developed by",
    // cursos.html
    "cursos.label": "Fernanda Garcia Academy",
    "cursos.h1": "Our <em>courses</em>",
    "cursos.back": "Back to home",
    "cursos.lash.tag": "Beginner course",
    "cursos.lash.title": "Professional Lash Lifting",
    "cursos.lash.desc":
      "The complete guide to curling, projecting and aligning natural lashes — from product chemistry to hands-on practice. Results last 45–60 days.",
    "cursos.lash.badge": "Available",
    "cursos.lash.cta": "View course",
    "cursos.brow.tag": "Complete course",
    "cursos.brow.title": "Brow Lamination + Strategic Design",
    "cursos.brow.desc":
      "Lamination and facial design in one course. Personalised eyebrows for every face, with long-lasting results of 4 to 6 weeks.",
    "cursos.brow.badge": "Available",
    "cursos.brow.cta": "View course",
    "cursos.coreano.tag": "Advanced · Specialisation",
    "cursos.coreano.title": "Lash Lifting — Korean Method",
    "cursos.coreano.desc":
      "For professionals who already master the traditional method. Direct-application technique with greater speed, control and safety.",
    "cursos.coreano.badge": "Available",
    "cursos.coreano.cta": "View course",
    "cursos.design.tag": "Coming soon",
    "cursos.design.title": "Eyebrow Design",
    "cursos.design.desc":
      "Facial mapping, design techniques and pigmentation to create personalised, harmonious eyebrows. Content in development.",
    "cursos.design.badge": "Unavailable at the moment",
    // lash-lifting.html
    "lash.back": "All courses",
    "lash.tag": "Beginner course",
    "lash.h1": "Lash Lifting <em>Professional</em>",
    "lash.sub":
      "Learn to curl, project and align natural lashes with technique, safety and long-lasting results.",
    "lash.h2": "What is <em>Lash Lifting?</em>",
    "lash.p1":
      "Lash Lifting is an innovative aesthetic procedure that curls, projects and aligns natural lashes — no extensions or artificial lengthening required.",
    "lash.p2":
      'Using a precise technique and specific products that respect lash health, the procedure makes the client\'s natural lashes appear significantly longer, denser and more defined. The result is a striking, expressive look with a "doll lash" effect that lasts 45 to 60 days.',
    "lash.modulos": "Course content",
    "lash.m1": "Introduction to Lash Lifting",
    "lash.m2": "Comparisons with Other Aesthetic Professions",
    "lash.m3": "The Lash Growth Cycle",
    "lash.m4": "Chemistry of Products Used",
    "lash.m5": "Safety and Regulations",
    "lash.m6": "Safety and Prevention of Common Mistakes",
    "lash.m7": "Contraindications and Conditions",
    "lash.m8": "Client Consultation Forms and Records",
    "lash.m9": "Allergy Reaction Test",
    "lash.m10": "Required Materials",
    "lash.m11": "Biosafety",
    "lash.m12": "Eyelid and Lash Analysis",
    "lash.m13": "Flexibility Testing Method",
    "lash.m14": "Practical Steps of Lash Lifting",
    "lash.sidebar.label": "Fernanda Garcia Academy",
    "lash.sidebar.h3": "Professional Lash Lifting",
    "lash.sidebar.dur": "Results last 45–60 days",
    "lash.sidebar.level": "Beginner level",
    "lash.sidebar.mat": "Complete course materials",
    "lash.sidebar.cta": "I want to enrol",
    "lash.sidebar.note":
      "We will get in touch via WhatsApp with all the details.",
    // brow-lamination.html
    "brow.back": "All courses",
    "brow.tag": "Complete course",
    "brow.h1": "Brow Lamination +<br /><em>Strategic Design</em>",
    "brow.sub":
      "Redefine, align and design personalised eyebrows — combining lamination and facial mapping for results lasting 4 to 6 weeks.",
    "brow.h2": "What is <em>Brow Lamination</em> with Strategic Design?",
    "brow.p1":
      "Brow Lamination is an advanced aesthetic procedure that redefines, aligns and disciplines the natural brow hairs. Through an alignment technique and the use of specific products that safely alter the hair structure, the hairs become pliable and can be styled in any desired direction.",
    "brow.p2":
      "The key differentiator of this procedure is its combination with Strategic Eyebrow Design — our signature approach. Far from ready-made templates or artificial shapes, this design style is fully personalised for each face, respecting natural lines, anatomy and the unique identity of each client, with an absolute focus on a natural look.",
    "brow.p3":
      "The result is an immediate visual effect of fuller, more robust and symmetrical eyebrows — the perfect solution both for covering gaps and taming misaligned or downward-growing hairs. By combining the pliability of lamination with the facial mapping of strategic design, the procedure delivers everything from the modern fluffy brow look to a more classic, sophisticated and discreet style, always tailored to the client and lasting 4 to 6 weeks.",
    "brow.modulos": "Course content",
    "brow.m1": "Introduction to Brow Lamination",
    "brow.m2": "Comparisons with Other Aesthetic Professions",
    "brow.m3": "The Hair Growth Cycle",
    "brow.m4": "Chemistry of Products Used",
    "brow.m5": "Safety and Regulations",
    "brow.m6": "Safety and Prevention of Common Mistakes",
    "brow.m7": "Contraindications and Conditions",
    "brow.m8": "Client Consultation Forms and Records",
    "brow.m9": "Allergy Reaction Test",
    "brow.m10": "Required Materials",
    "brow.m11": "Biosafety",
    "brow.m12": "Shape Analysis and Facial Mapping",
    "brow.m13": "Practical Steps of Mapping and Brow Lamination",
    "brow.sidebar.label": "Fernanda Garcia Academy",
    "brow.sidebar.h3": "Brow Lamination + Strategic Design",
    "brow.sidebar.dur": "Results last 4–6 weeks",
    "brow.sidebar.level": "Beginner to intermediate",
    "brow.sidebar.mat": "Complete course materials",
    "brow.sidebar.cta": "I want to enrol",
    "brow.sidebar.note":
      "We will get in touch via WhatsApp with all the details.",
    // lash-lifting-coreano.html
    "coreano.back": "All courses",
    "coreano.tag": "Advanced specialisation course",
    "coreano.h1": "Lash Lifting<br /><em>Korean Method</em>",
    "coreano.sub":
      "For professionals who already master the traditional technique and want to take efficiency, speed and safety to the next level.",
    "coreano.h2": "Lash Lifting — the <em>Korean Method</em>",
    "coreano.p1":
      "The Korean Method Lash Lifting is an advanced specialisation for professionals who already master the traditional technique and wish to reach the next level of efficiency and control. The aesthetic result delivers the same impeccable, high-impact look as the conventional method — curled, aligned and defined lashes — but the real revolution lies in the dynamics of the service and the safety of the process.",
    "coreano.aviso":
      "This course is exclusively for professionals who already have experience with the traditional Lash Lifting method. Hands-on experience with the conventional method is a prerequisite.",
    "coreano.intro":
      "This advanced approach stands out for three essential commercial and technical pillars:",
    "coreano.p1.num": "01",
    "coreano.p1.title": "Scalable Revenue Through Reduced Time",
    "coreano.p1.desc":
      "With an agile methodology, procedure time is significantly reduced, allowing you to increase the number of daily appointments and multiply your revenue.",
    "coreano.p2.num": "02",
    "coreano.p2.title": "Direct Control and Extreme Safety",
    "coreano.p2.desc":
      "The method is based on direct product application to the lashes, enabling far greater control over the chemical action — making the procedure extremely safe and predictable.",
    "coreano.p3.num": "03",
    "coreano.p3.title": "Practical Expertise Required",
    "coreano.p3.desc":
      "As a high-precision, high-speed technique, this is not a course for beginners. To specialise in the Korean Method, the professional must already master the traditional method.",
    "coreano.modulos": "Course content",
    "coreano.m1": "Transitioning from Traditional to Korean",
    "coreano.m2": "The Dynamics of Direct Application",
    "coreano.m3": "Lash Types Suitable for the Technique",
    "coreano.m4": "Borderline Lashes",
    "coreano.m5": "Advanced Mould Analysis",
    "coreano.m6": "High-Speed Attachment",
    "coreano.m7": "Product Action in Direct Application",
    "coreano.m8": "Precision Timing",
    "coreano.m9": "Advanced Visual Reading",
    "coreano.m10": "Advanced Biosafety Protocol",
    "coreano.sidebar.label": "Fernanda Garcia Academy",
    "coreano.sidebar.h3": "Lash Lifting | Korean Method",
    "coreano.sidebar.dur": "Results last 45–60 days",
    "coreano.sidebar.level": "Advanced level",
    "coreano.sidebar.prereq": "Prerequisite: traditional method",
    "coreano.sidebar.cta": "I want to enrol",
    "coreano.sidebar.note":
      "We will get in touch via WhatsApp with all the details.",
  },
};

function setLang(lang) {
  localStorage.setItem("fg-lang", lang);
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  const btn = document.getElementById("langSwitch");
  if (btn) btn.textContent = lang === "pt" ? "EN" : "PT";

  const t = TRANSLATIONS[lang] || TRANSLATIONS.pt;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const val = t[key];
    if (!val) return;
    // If element contains SVG children (e.g. FAQ buttons), update only text node
    if (el.querySelector("svg")) {
      const tn = [...el.childNodes].find(
        (n) => n.nodeType === 3 && n.textContent.trim(),
      );
      if (tn) tn.textContent = "\n              " + val + "\n              ";
    } else {
      el.innerHTML = val;
    }
  });
}

(function initLang() {
  const saved = localStorage.getItem("fg-lang") || "pt";
  // Apply saved lang after DOM is ready
  if (saved !== "pt") setLang(saved);
  else {
    const btn = document.getElementById("langSwitch");
    if (btn) btn.textContent = "EN";
  }
  document.getElementById("langSwitch")?.addEventListener("click", () => {
    const current = localStorage.getItem("fg-lang") || "pt";
    setLang(current === "pt" ? "en" : "pt");
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
  img.onerror = () => {};
  if (img.complete && img.naturalWidth > 0) img.classList.add("loaded");
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
    "fotos/Mosaico-1.png",
    "fotos/Mosaico-2.JPG",
    "fotos/Mosaico-3.JPG",
    "fotos/Mosaico-4.JPG",
  ];

  const photoCandidates = FOTOS;

  // Patterns reais na pasta logos/
  // idx 0 = Preto → card accent (fundo marrom); idx 1 = Branco → card dark (fundo escuro)
  const knownPatterns = [
    "logos/pattern-preto-transp.png",
    "logos/pattern-branco-transp.png",
  ];

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
      photos.length + Math.min(CARDS.length, photos.length - 1);

    for (let i = 0; i < totalItems; i++) {
      // A cada 2 fotos, inserir 1 card; quando não há mais fotos, preencher com cards
      const isCard =
        cardIdx < CARDS.length && (i % 3 === 2 || photoIdx >= photos.length);

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
   6. VIDEO CAROUSEL
   ─────────────────────────────────────
   DESKTOP (> 768px): 3 cópias completas do array no DOM.
     [cópia A | cópia B | cópia C]
     O utilizador navega sempre na cópia B. Após cada
     transição, se entrou em A ou C, teleporta
     silenciosamente para o equivalente em B.
     Zero flash, zero travamento — o loop é imperceptível.

   MOBILE (≤ 768px): comportamento atual preservado
     (clone só do primeiro e do último — funciona bem).
════════════════════════════════════════ */
(function initCarousel() {
  const ITEMS = [
    { type: "video", src: "videos/Principal.mp4" },
    { type: "video", src: "videos/Lash-1.mp4" },
    { type: "video", src: "videos/Brow-depoimento.mp4" },
    { type: "video", src: "videos/divulg-1.mp4" },
    { type: "video", src: "videos/Brow-lam.mp4" },
    { type: "video", src: "videos/BROW LAMINATION.mp4" },
    { type: "video", src: "videos/design sob.mp4" },
    { type: "video", src: "videos/Pagina-Lash.mp4" },
    { type: "video", src: "videos/Pagina-Brow.mp4" },
    { type: "video", src: "videos/Pagina-Lash-Coreano.mp4" },
    { type: "photo", src: "videos/antes-depois1.JPG" },
    { type: "photo", src: "videos/antes-depois2.JPG" },
    { type: "photo", src: "videos/antes-depois3.JPG" },
  ];

  const fallback = $("#carouselFallback");
  if (fallback) fallback.remove();

  const carousel = $("#videoCarousel");
  if (!carousel) return;

  const GAP = 24;
  const MOBILE_BREAKPOINT = 768;

  function isDesktop() {
    return window.innerWidth > MOBILE_BREAKPOINT;
  }
  function getCardW() {
    return isDesktop() ? 260 : 200;
  }

  // ── Criação de card ─────────────────────────────
  function makeCard(item, active) {
    const card = document.createElement("div");
    card.className = "video-card" + (active ? " active" : "");

    if (item.type === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.preload = "metadata";
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      if (active) {
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

  // ── Probe de arquivos ───────────────────────────
  let pending = ITEMS.length;
  const found = new Array(ITEMS.length).fill(null);

  function onProbed() {
    if (--pending > 0) return;
    const valid = found.filter(Boolean);
    if (valid.length === 0) return;
    buildCarousel(valid);
  }

  ITEMS.forEach((item, idx) => {
    if (item.type === "photo") {
      const img = new Image();
      img.onload = () => {
        found[idx] = item;
        onProbed();
      };
      img.onerror = () => onProbed();
      img.src = item.src;
    } else {
      const v = document.createElement("video");
      v.preload = "metadata";
      v.onloadedmetadata = () => {
        found[idx] = item;
        onProbed();
      };
      v.onerror = () => onProbed();
      v.src = item.src;
    }
  });

  // ── Construção do track ─────────────────────────
  function buildCarousel(valid) {
    const N = valid.length;
    const track = document.createElement("div");
    track.className = "carousel__track";
    track.style.transition = "none";

    if (isDesktop()) {
      // 3 cópias: A(0..N-1) | B(N..2N-1) | C(2N..3N-1)
      // Começa no índice N (primeiro item de B)
      for (let copy = 0; copy < 3; copy++) {
        valid.forEach((item, i) => {
          // Só o primeiro item de B começa como active
          track.appendChild(makeCard(item, copy === 1 && i === 0));
        });
      }
    } else {
      // Mobile: clone apenas do último e do primeiro
      // trackIdx 0 = cloneLast | 1..N = reais | N+1 = cloneFirst
      const cloneLast = makeCard(valid[N - 1], false);
      cloneLast.dataset.clone = "last";
      track.appendChild(cloneLast);
      valid.forEach((item, i) => track.appendChild(makeCard(item, i === 0)));
      const cloneFirst = makeCard(valid[0], false);
      cloneFirst.dataset.clone = "first";
      track.appendChild(cloneFirst);
    }

    carousel.appendChild(track);

    if (isDesktop()) {
      setupDesktop(track, N);
    } else {
      setupMobile(track, N);
    }
  }

  // ── Helpers partilhados ─────────────────────────
  function allCards(track) {
    return [...track.querySelectorAll(".video-card")];
  }

  function activateCard(track, idx) {
    allCards(track).forEach((c, i) => {
      const active = i === idx;
      c.classList.toggle("active", active);
      const v = c.querySelector("video");
      if (!v) return;
      if (active) {
        v.controls = true;
        v.play().catch(() => {});
      } else {
        v.pause();
        v.removeAttribute("controls");
      }
    });
  }

  function translateFor(idx) {
    return carousel.offsetWidth / 2 - getCardW() / 2 - idx * (getCardW() + GAP);
  }

  function applyPos(track, idx, animate) {
    if (animate) {
      track.style.transition =
        "transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    } else {
      track.style.transition = "none";
      void track.offsetWidth; // reflow síncrono — sem batching
    }
    track.style.transform = `translateX(${translateFor(idx)}px)`;
  }

  // ════════════════════════════════════════
  // DESKTOP — 3 cópias, wrap invisível
  // ════════════════════════════════════════
  function setupDesktop(track, N) {
    let current = N; // começa no início da cópia B
    let animating = false;

    function goTo(idx) {
      if (animating) return;
      animating = true;
      current = idx;
      activateCard(track, current);
      applyPos(track, current, true);
    }

    function wrapIfNeeded() {
      // Entrou na cópia A → salta para equivalente em B
      if (current < N) {
        current += N;
        applyPos(track, current, false);
        activateCard(track, current);
        return;
      }
      // Entrou na cópia C → salta para equivalente em B
      if (current >= 2 * N) {
        current -= N;
        applyPos(track, current, false);
        activateCard(track, current);
      }
    }

    track.addEventListener("transitionend", (e) => {
      if (e.target !== track || e.propertyName !== "transform") return;
      wrapIfNeeded();
      animating = false;
    });

    $("#videoPrev")?.addEventListener("click", () => goTo(current - 1));
    $("#videoNext")?.addEventListener("click", () => goTo(current + 1));

    // Click num card lateral
    track.addEventListener("click", (e) => {
      if (animating) return;
      const card = e.target.closest(".video-card");
      if (!card) return;
      const idx = allCards(track).indexOf(card);
      if (idx !== -1 && idx !== current) goTo(idx);
    });

    // Swipe touch (tablets em modo desktop)
    let tx0 = 0,
      ty0 = 0,
      tDragging = false;
    carousel.addEventListener(
      "touchstart",
      (e) => {
        tx0 = e.touches[0].clientX;
        ty0 = e.touches[0].clientY;
        tDragging = false;
      },
      { passive: true },
    );
    carousel.addEventListener(
      "touchmove",
      (e) => {
        const dx = Math.abs(e.touches[0].clientX - tx0);
        const dy = Math.abs(e.touches[0].clientY - ty0);
        if (dx > dy && dx > 8) {
          tDragging = true;
          e.preventDefault();
        }
      },
      { passive: false },
    );
    carousel.addEventListener(
      "touchend",
      (e) => {
        if (!tDragging) return;
        const dx = e.changedTouches[0].clientX - tx0;
        if (dx < -50) goTo(current + 1);
        else if (dx > 50) goTo(current - 1);
      },
      { passive: true },
    );

    function init() {
      applyPos(track, current, false);
      activateCard(track, current);
    }
    document.readyState === "complete"
      ? init()
      : window.addEventListener("load", init, { once: true });

    let rTimer;
    window.addEventListener("resize", () => {
      clearTimeout(rTimer);
      rTimer = setTimeout(() => applyPos(track, current, false), 150);
    });

    const section = document.getElementById("videos");
    if (section) {
      new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) {
            allCards(track).forEach((c) => c.querySelector("video")?.pause());
          } else {
            allCards(track)
              [current]?.querySelector("video")
              ?.play()
              .catch(() => {});
          }
        },
        { threshold: 0.2 },
      ).observe(section);
    }
  }

  // ════════════════════════════════════════
  // MOBILE — clone único, comportamento original
  // ════════════════════════════════════════
  function setupMobile(track, total) {
    let trackIdx = 1;
    let isAnimating = false;

    function getTranslateX(idx) {
      return (
        carousel.offsetWidth / 2 - getCardW() / 2 - idx * (getCardW() + GAP)
      );
    }

    function setPos(idx, animate) {
      if (animate) {
        track.style.transition = "transform 0.5s var(--ease-out)";
      } else {
        track.style.transition = "none";
        track.offsetHeight; // eslint-disable-line no-unused-expressions
      }
      track.style.transform = `translateX(${getTranslateX(idx)}px)`;
    }

    function activateIdx(idx) {
      allCards(track).forEach((c, i) => {
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

    track.addEventListener("transitionend", (e) => {
      if (e.target !== track) return;
      if (trackIdx === 0) {
        trackIdx = total;
        setPos(trackIdx, false);
        activateIdx(trackIdx);
      } else if (trackIdx === total + 1) {
        trackIdx = 1;
        setPos(trackIdx, false);
        activateIdx(trackIdx);
      }
      isAnimating = false;
    });

    $("#videoPrev")?.addEventListener("click", () => goTo(trackIdx - 1));
    $("#videoNext")?.addEventListener("click", () => goTo(trackIdx + 1));

    allCards(track).forEach((card, i) => {
      card.addEventListener("click", () => {
        if (!isAnimating && i !== trackIdx) goTo(i);
      });
    });

    let touchStartX = 0,
      touchStartY = 0,
      isSwiping = false;
    carousel.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        isSwiping = false;
      },
      { passive: true },
    );
    carousel.addEventListener(
      "touchmove",
      (e) => {
        const dx = Math.abs(e.touches[0].clientX - touchStartX);
        const dy = Math.abs(e.touches[0].clientY - touchStartY);
        if (dx > dy && dx > 8) {
          isSwiping = true;
          e.preventDefault();
        }
      },
      { passive: false },
    );
    carousel.addEventListener(
      "touchend",
      (e) => {
        if (!isSwiping) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (dx < -50) goTo(trackIdx + 1);
        else if (dx > 50) goTo(trackIdx - 1);
      },
      { passive: true },
    );

    function initPosition() {
      setPos(trackIdx, false);
      activateIdx(trackIdx);
    }
    document.readyState === "complete"
      ? initPosition()
      : window.addEventListener("load", initPosition, { once: true });

    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => setPos(trackIdx, false), 150);
    });

    const section = document.getElementById("videos");
    if (section) {
      new IntersectionObserver(
        ([e]) => {
          if (!e.isIntersecting) {
            allCards(track).forEach((c) => c.querySelector("video")?.pause());
          } else {
            allCards(track)
              [trackIdx]?.querySelector("video")
              ?.play()
              .catch(() => {});
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
    `Olá Fernanda!`,
    ``,
    `Meu nome é *${nome.value.trim()}* e gostaria de saber mais sobre os *cursos disponíveis*.`,
    ``,
    `Telefone: ${ddi?.value || "+55"} ${telefone.value.trim()}`,
  ];
  if (mensagem.value.trim()) {
    msgParts.push(``, `Mensagem: ${mensagem.value.trim()}`);
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
