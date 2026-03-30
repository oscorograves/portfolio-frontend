import puppeteer from 'puppeteer';
import http from 'http';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, '../dist');

// The routes we want static HTML for
const routes = [
  '/',
  '/experience',
  '/case-studies',
  '/my-story',
  '/metrics',
  '/experiments',
  '/404'
];

async function startServer() {
  const server = http.createServer((req, res) => {
    let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url);
    if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
      filePath = path.join(distPath, 'index.html');
    }
    const ext = path.extname(filePath);
    const mimeTypes = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    fs.createReadStream(filePath).pipe(res);
  });

  return new Promise((resolve) => {
    server.listen(0, () => resolve({
      port: server.address().port,
      close: () => server.close()
    }));
  });
}

async function run() {
  console.log('Starting local server for pre-rendering...');
  const server = await startServer();
  const baseUrl = `http://localhost:${server.port}`;

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox', '--disable-setuid-sandbox'] });

  for (const route of routes) {
    console.log(`Pre-rendering ${route}...`);
    const page = await browser.newPage();
    try {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle0' });
      const html = await page.content();
      
      const routePath = route === '/' ? '/index.html' : `${route}.html`;
      const filePath = path.join(distPath, routePath);
      
      fs.writeFileSync(filePath, html);
      console.log(`Saved ${routePath}`);
    } catch (err) {
      console.error(`Failed to pre-render ${route}`, err);
    } finally {
      await page.close();
    }
  }

  await browser.close();
  server.close();
  console.log('Pre-rendering complete.');
}

run();
