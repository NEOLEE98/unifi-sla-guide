import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const prefix = '/unifi-sla-guide.github.io';
const allowed = new Set(['index.html', 'style.css', 'console.css', 'app.js', 'i18n.js']);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };
http.createServer(async (req, res) => {
  try {
    let urlPath = new URL(req.url, 'http://localhost').pathname;
    if (urlPath === prefix) { res.writeHead(302, { Location: prefix + '/' }); res.end(); return; }
    if (urlPath.startsWith(prefix + '/')) urlPath = urlPath.slice(prefix.length);
    const file = urlPath === '/' ? 'index.html' : urlPath.slice(1);
    if (!allowed.has(file)) { res.writeHead(404); res.end('Not found'); return; }
    const body = await readFile(path.join(root, file));
    res.writeHead(200, { 'Content-Type': mime[path.extname(file)], 'Cache-Control': 'no-store' });
    res.end(body);
  } catch { res.writeHead(500); res.end('Unable to serve file'); }
}).listen(4173, '127.0.0.1', () => {
  console.log('Local: http://127.0.0.1:4173' + prefix + '/');
});
