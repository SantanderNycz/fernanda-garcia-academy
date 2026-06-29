const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dirs = ['./fotos', './videos'];

async function run() {
  for (const dir of dirs) {
    const files = fs.readdirSync(dir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    for (const file of files) {
      const input = path.join(dir, file);
      const output = path.join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      if (fs.existsSync(output)) {
        console.log(`skip (exists): ${output}`);
        continue;
      }
      try {
        await sharp(input)
          .webp({ quality: 80 })
          .resize(1200, null, { withoutEnlargement: true })
          .toFile(output);
        const orig = fs.statSync(input).size;
        const next = fs.statSync(output).size;
        console.log(`✓ ${file} → ${path.basename(output)} (${Math.round(orig/1024)}KB → ${Math.round(next/1024)}KB)`);
      } catch (e) {
        console.error(`✗ ${file}: ${e.message}`);
      }
    }
  }
  console.log('Concluído.');
}

run();
