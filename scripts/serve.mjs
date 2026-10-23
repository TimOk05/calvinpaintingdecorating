import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const base = process.cwd();
const port = Number(process.env.PORT || 4175);
const mime = {'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.svg':'image/svg+xml','.ttf':'font/ttf','.txt':'text/plain; charset=utf-8'};
http.createServer(async (req,res) => {
  try {
    const url = new URL(req.url, 'http://localhost');
    const requestPath = decodeURIComponent(url.pathname).replace(/^\/calvinpaintingdecorating(?=\/|$)/, '') || '/';
    const filename = path.resolve(base, '.' + (requestPath.endsWith('/') ? requestPath + 'index.html' : requestPath));
    if (!filename.startsWith(base + path.sep)) { res.writeHead(403); res.end(); return; }
    if (!(await stat(filename)).isFile()) throw new Error('Not a file');
    res.writeHead(200, {'Content-Type': mime[path.extname(filename)] || 'application/octet-stream', 'Cache-Control':'no-cache'});
    res.end(await readFile(filename));
  } catch { res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/calvinpaintingdecorating/`));
