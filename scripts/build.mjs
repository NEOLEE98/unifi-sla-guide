import { mkdir, copyFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.join(root, '_site');
await mkdir(output, { recursive: true });
// Publish only this allowlist, never repository metadata, checks, or source history.
for (const file of ['index.html', 'style.css', 'console.css', 'app.js', 'i18n.js', '.nojekyll']) {
  await copyFile(path.join(root, file), path.join(output, file));
}
console.log('GitHub Pages artifact ready in _site/');
