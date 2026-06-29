const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convert(input, output, opts = {}) {
  const { quality = 80, maxW = 1200 } = opts;
  try {
    await sharp(input)
      .webp({ quality })
      .resize(maxW, null, { withoutEnlargement: true })
      .toFile(output);
    const orig = fs.statSync(input).size;
    const next = fs.statSync(output).size;
    console.log(`✓ ${path.basename(input)} → ${path.basename(output)} (${Math.round(orig/1024)}KB → ${Math.round(next/1024)}KB)`);
  } catch (e) {
    console.error(`✗ ${path.basename(input)}: ${e.message}`);
  }
}

async function run() {
  // fotos/ — mosaico photos, quality 80, 1200px
  const fotos = fs.readdirSync('./fotos').filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  for (const f of fotos) {
    const out = './fotos/' + f.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await convert('./fotos/' + f, out, { quality: 80, maxW: 1200 });
  }

  // logos/ — nav logos, quality 90 (transparency/detail), 400px max
  const logos = [
    'marca-dagua.png',
    'marca-dagua-2.png',
    'marca-dagua-3.png',
    'marca-dagua-4.png',
  ];
  for (const f of logos) {
    const input = './logos/' + f;
    if (!fs.existsSync(input)) continue;
    const out = './logos/' + f.replace('.png', '.webp');
    await convert(input, out, { quality: 90, maxW: 400 });
  }

  // videos/antes-depois — carousel thumbnails, quality 72, 900px
  const carousel = fs.readdirSync('./videos').filter(f => /antes-depois.*\.(jpg|jpeg|png)$/i.test(f));
  for (const f of carousel) {
    const out = './videos/' + f.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    await convert('./videos/' + f, out, { quality: 72, maxW: 900 });
  }

  console.log('\nConcluído.');
}

run();
