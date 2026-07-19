# Auditoria SEO / IA / Segurança / Performance
**Projeto:** Fernanda Garcia Academy
**Data:** 2026-07-19
**Modo:** leitura apenas — nenhum ficheiro do site foi alterado.

---

## Sumário executivo

| Prioridade | Nº | Tema dominante |
|---|---|---|
| 🔴 Crítico | 5 | Canónicas contraditórias, conteúdo duplicado, imagens de 4.8 MB |
| 🟠 Importante | 6 | Dados estruturados, llms.txt, CLS, og:image |
| 🟡 Cosmético | 5 | Minificação, SRI, limpeza de repo |

**O achado nº1 é uma regressão que eu próprio introduzi no commit anterior (`30e3d16`).** Detalho abaixo sem rodeios.

---

# 🔴 CRÍTICO

## C1 — Canónicas contradizem todos os links internos *(regressão minha)*

**Ficheiros:** `cursos.html:12`, `lash-lifting.html:11`, `brow-lamination.html:12`, `lash-lifting-coreano.html:11`

No commit `30e3d16` alterei as canónicas para a forma `.html`, a teu pedido. Ao auditar agora, isso está **em conflito direto** com o resto do site:

| Sinal | Forma usada | Ocorrências |
|---|---|---|
| Links internos (`href`) | `/cursos` (limpa) | **21** |
| `rel="canonical"` | `/cursos.html` | 4 |
| `sitemap.xml` | `.html` | 4 |

O Google segue 21 links para `/cursos`, chega à página, e lê "a versão oficial é `/cursos.html`". Envia sinais para um URL que **nenhum link do site aponta**. Isto agrava exatamente o sintoma que querias resolver no Search Console ("página alternativa com tag canónica adequada" / "descoberta, não indexada").

**Correção proposta — padronizar em URL limpo** (é a forma que 21 links já usam; muda-se 8 sítios em vez de 21):

- `cursos.html:12` → `https://fernandagarciaacademy.com/cursos`
- `lash-lifting.html:11` → `.../lash-lifting`
- `brow-lamination.html:12` → `.../brow-lamination`
- `lash-lifting-coreano.html:11` → `.../lash-lifting-coreano`
- Idem para os 4 `og:url` e os 3 `"url"` do JSON-LD
- `sitemap.xml` → remover `.html` dos 4 `<loc>`

> Se preferires a forma `.html`, é igualmente válida — mas então há que reescrever os 21 links internos **e** o `vercel.json`. Recomendo a limpa.

---

## C2 — Conteúdo duplicado: cada página responde 200 em dois URLs

**Ficheiro:** `vercel.json:2-7`

As regras são `rewrites`, não `redirects`. Um rewrite serve o conteúdo **sem redirecionar** — logo `/cursos` **e** `/cursos.html` devolvem ambos HTTP 200 com HTML idêntico. São 4 pares de URLs duplicados, precisamente o que o Google reporta como duplicação.

**Correção proposta:** manter os `rewrites` (servem os URLs limpos) e **acrescentar** `redirects` 308 de `.html` → limpo, para colapsar o par:

```json
"redirects": [
  { "source": "/cursos.html", "destination": "/cursos", "permanent": true },
  { "source": "/lash-lifting.html", "destination": "/lash-lifting", "permanent": true },
  { "source": "/brow-lamination.html", "destination": "/brow-lamination", "permanent": true },
  { "source": "/lash-lifting-coreano.html", "destination": "/lash-lifting-coreano", "permanent": true }
]
```

⚠️ **A verificar em produção antes de aplicar:** confirmar que a Vercel não entra em loop de redirect com o rewrite ativo para o mesmo par, e se `/index.html` já redireciona para `/` (não consigo determinar isto estaticamente — requer um `curl -I` ao site publicado).

---

## C3 — Imagens de 4.8 MB servidas na página de cursos

**Ficheiro:** `cursos.html:106, 124, 142`

| Ficheiro | Peso |
|---|---|
| `Capas/Brow.png` | **4.8 MB** |
| `Capas/Design.png` | **4.8 MB** |
| `Capas/Lash-Coreano.png` | **4.4 MB** |
| `Capas/Lash.jpeg` | 1.6 MB |

São ~15 MB numa única página. É de longe o maior problema de performance do site e afeta ranking diretamente (LCP). Existem já `.jpeg` equivalentes com 230 KB, comentados no código (linhas 105, 123, 141).

**Correção proposta:** converter as 4 para WebP com o `optimize-images.js` já existente no projeto (alvo ~150–250 KB cada). Redução esperada: **~15 MB → ~800 KB**.

---

## C4 — GSAP carregado de CDN sem SRI

**Ficheiro:** `index.html:73-74`

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/ScrollTrigger.min.js" defer></script>
```

Sem `integrity` nem `crossorigin`. Se o cdnjs for comprometido, executa-se JS arbitrário no domínio — com um formulário de contacto na mesma página. Fonte é reputada e é HTTPS, mas SRI é barato.

**Correção proposta:** adicionar `integrity="sha384-..."` + `crossorigin="anonymous"` (hashes oficiais do cdnjs), ou alojar localmente em `/vendor/` (também elimina 2 ligações externas).

---

## C5 — `lh-report.json` (330 KB) versionado e público

**Ficheiro:** `lh-report.json` — confirmado em `git ls-files`

Relatório Lighthouse interno, servido publicamente e indexável. Não expõe segredos, mas é peso morto no repo e no deploy.

**Correção proposta:** `git rm --cached lh-report.json` + adicionar ao `.gitignore`.

---

# 🟠 IMPORTANTE

## I1 — `cursos.html` sem dados estruturados

Única página sem JSON-LD. Sendo o hub de cursos, é a melhor candidata a `ItemList` de `Course` — formato que os assistentes de IA e o Google usam para enumerar oferta formativa.

**Correção proposta:** `ItemList` com os 4 cursos (nome, descrição, URL, `provider`).

## I2 — Sem `llms.txt`

Não existe. Recomendado para descoberta/citação por assistentes de IA.

**Correção proposta:** criar `/llms.txt` com descrição do negócio, lista de cursos com URLs, localização, contacto e nota de licenciamento.

## I3 — `og:image` aponta para o JPG pesado

**Ficheiros:** `index.html:21, 29` e `cursos.html:17, 21` → `fotos/FerGarcia-33.jpg` (**796 KB**)

O ficheiro existe, mas há um `.webp` de 84 KB ao lado. Nota: alguns validadores de Open Graph lidam mal com WebP — recomendo **manter JPG mas recomprimir** para ~150 KB, em vez de trocar o formato.

## I4 — Imagens sem `width`/`height` em `cursos.html`

**Linhas:** 86, 88, 103, 106, 121, 124, 139, 142 → causa CLS.

⚠️ **Contexto importante:** tu pediste explicitamente a remoção destes atributos numa sessão anterior porque distorciam as imagens. A causa real foi terem sido postos valores de rácio errado (`600×400` em imagens que não são 3:2), não os atributos em si.

**Correção proposta:** ler as dimensões reais de cada ficheiro e aplicar os valores corretos + `height: auto` no CSS. Só avanço nisto se aprovares — e verifico visualmente depois.

## I5 — Conteúdo do mosaico só existe via JS

**Ficheiros:** `index.html:219` (`<div class="mosaic" id="mosaic">` vazio), `main.js:620-640`

O mosaico e o carrossel são construídos em JS. Crawlers de IA que leem o HTML servido não veem nada. O restante conteúdo (textos, módulos, FAQ) **está em HTML real** — o essencial está salvo.

**Correção proposta:** aceitável como está (é conteúdo visual, não informativo). Opcional: `<noscript>` com as imagens do portefólio.

## I6 — Sem `theme-color` nem `og:image:alt`

Cosmético para SEO, mas melhora previews de partilha.

---

# 🟡 COSMÉTICO

## X1 — `rel="noopener"` sem `noreferrer` — 9 ocorrências
Todos os `target="_blank"` **já têm `noopener`** (bem feito). `noreferrer` é opcional; em navegadores modernos `noopener` já é implícito. **Sem risco real.**

## X2 — `innerHTML` em 2 pontos — risco baixo, sem ação
- `main.js:444` — valores do objeto `TRANSLATIONS`, controlado pelo dev.
- `main.js:628` — constantes `CARDS`, controlado pelo dev.

Nenhum recebe input do utilizador ou de URL. **Não é vulnerabilidade.** Registo apenas por rastreabilidade.

## X3 — CSS/JS não minificados
`main.js` 54 KB, `style.css` 36 KB. Ganho modesto (~15 KB gzipped); a Vercel já comprime.

## X4 — Fontes Google
Já otimizadas: `preconnect` + `preload` assíncrono + `noscript` + `display=swap`. **Sem ação.**

## X5 — Ficheiros `.jpeg`/`.png` órfãos
`Capas/` tem duplicados em vários formatos (`Lash.jpeg`, `Lash.JPEG`, `Lash-Coreano.png`…). Limpeza opcional.

---

# ✅ O que já está correto

- `lang="pt-BR"` nas 5 páginas
- **Exatamente um `<h1>` por página**, hierarquia coerente
- `<title>` e `<meta description>` únicos e descritivos em todas as páginas
- **Nenhum `noindex` acidental**
- `robots.txt` e `sitemap.xml` presentes e válidos
- **Nenhum segredo, chave ou token exposto** (varredura em `.html`/`.js`/`.css`)
- **Zero mixed content** — tudo HTTPS
- Todos os `target="_blank"` com `noopener`
- Formulário não transmite dados: gera link `wa.me` no cliente, sem backend nem endpoint terceiro
- Open Graph + Twitter Card completos nas 5 páginas
- JSON-LD válido em 4 de 5 páginas (`EducationalOrganization`, `Course`, `Person`, `OfferCatalog`)
- Cabeçalhos de cache `immutable` bem configurados no `vercel.json`

---

# Ordem de execução recomendada

| # | Categoria | Impacto | Risco |
|---|---|---|---|
| 1 | **C1 + C2** — canónicas + redirects | 🔥 Resolve o problema do Search Console | Médio (validar em prod) |
| 2 | **C3** — comprimir Capas | 🔥 ~15 MB → ~800 KB | Baixo |
| 3 | **C5 + C4** — repo + SRI | Segurança/limpeza | Baixo |
| 4 | **I1 + I2** — JSON-LD + llms.txt | Descoberta por IA | Nenhum |
| 5 | **I3 + I4** — og:image + CLS | Performance | Médio (I4 mexe em layout) |

**Aguardo aprovação.** Diz-me quais categorias avanço e faço uma de cada vez, com verificação visual nas que mexem em layout.
