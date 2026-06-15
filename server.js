#!/usr/bin/env node
/**
 * ARVideo lokal dev server — tashqi paketlarsiz (faqat Node.js).
 *
 * Ishlatish:
 *   node server.js                 # http://localhost:8000
 *   node server.js --port 3000     # boshqa port
 *   node server.js --https         # o'z-o'zidan sertifikat bilan HTTPS (telefonda sinash uchun)
 *   node server.js --host 0.0.0.0  # LANdagi boshqa qurilmalar uchun ochiq
 *
 * Kamera faqat HTTPS yoki localhost da ishlaydi. Telefonda (LAN orqali) sinash
 * uchun --https bilan ishga tushiring va telefonda https://<kompyuter-IP>:8000 ni oching.
 */

'use strict';

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const os = require('os');
const crypto = require('crypto');
const { execFileSync } = require('child_process');

// ---- Argumentlarni o'qish ----
function parseArgs(argv) {
  const args = { port: 8000, host: '0.0.0.0', https: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--port' || a === '-p') args.port = parseInt(argv[++i], 10);
    else if (a === '--host' || a === '-h') args.host = argv[++i];
    else if (a === '--https' || a === '-s') args.https = true;
    else if (a === '--help') { printHelp(); process.exit(0); }
  }
  if (!Number.isInteger(args.port) || args.port <= 0) {
    console.error('Noto\'g\'ri port.');
    process.exit(1);
  }
  return args;
}

function printHelp() {
  console.log(`ARVideo lokal dev server

Foydalanish:
  node server.js [opsiyalar]

Opsiyalar:
  -p, --port <n>    Port (default: 8000)
  -h, --host <addr> Host manzili (default: 0.0.0.0 — LAN uchun ochiq)
  -s, --https       HTTPS rejimi (o'z-o'zidan sertifikat — telefon kamerasi uchun)
      --help        Yordam`);
}

const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.bin': 'application/octet-stream',
  '.mind': 'application/octet-stream',
  '.wasm': 'application/wasm',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
};

function contentType(filePath) {
  return MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
}

// ---- So'rovni qayta ishlash ----
function handler(req, res) {
  let urlPath;
  try {
    urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  } catch {
    res.writeHead(400); res.end('Bad request'); return;
  }

  // Papka so'ralsa index.html
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  // Xavfsizlik: ROOT dan tashqariga chiqishni bloklash
  const safePath = path.normalize(path.join(ROOT, urlPath));
  if (!safePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.stat(safePath, (err, stat) => {
    if (err) {
      // Papka bo'lsa index.html ga urinish
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404</h1><p>Topilmadi: ' + urlPath + '</p>');
      return;
    }
    let target = safePath;
    if (stat.isDirectory()) target = path.join(safePath, 'index.html');

    fs.readFile(target, (rdErr, data) => {
      if (rdErr) {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>404</h1><p>Topilmadi: ' + urlPath + '</p>');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType(target),
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*',
      });
      res.end(data);
    });
  });
}

// ---- O'z-o'zidan HTTPS sertifikat ----
function selfSignedCert() {
  // openssl bo'lsa undan foydalanamiz (keng qo'llab-quvvatlanadi)
  try {
    const tmp = path.join(os.tmpdir(), 'arvideo-cert');
    const keyFile = tmp + '.key';
    const certFile = tmp + '.crt';
    execFileSync('openssl', [
      'req', '-x509', '-newkey', 'rsa:2048', '-nodes',
      '-keyout', keyFile, '-out', certFile,
      '-days', '365', '-subj', '/CN=localhost',
      '-addext', 'subjectAltName=DNS:localhost,IP:127.0.0.1',
    ], { stdio: 'ignore' });
    const cert = { key: fs.readFileSync(keyFile), cert: fs.readFileSync(certFile) };
    fs.unlinkSync(keyFile); fs.unlinkSync(certFile);
    return cert;
  } catch {
    // openssl yo'q bo'lsa — Node built-in (faqat zamonaviy Node)
    if (typeof crypto.generateKeyPairSync === 'function' && crypto.X509Certificate) {
      console.warn('openssl topilmadi — minimal sertifikat yaratilmoqda. openssl o\'rnatish tavsiya etiladi.');
    }
    throw new Error('HTTPS uchun openssl kerak. O\'rnating yoki --https siz ishga tushiring.');
  }
}

// ---- LAN IP manzilini topish ----
function lanAddresses() {
  const out = [];
  const ifaces = os.networkInterfaces();
  for (const name of Object.keys(ifaces)) {
    for (const ni of ifaces[name] || []) {
      if (ni.family === 'IPv4' && !ni.internal) out.push(ni.address);
    }
  }
  return out;
}

// ---- Ishga tushirish ----
const args = parseArgs(process.argv.slice(2));
const scheme = args.https ? 'https' : 'http';

function listen(server) {
  server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
      console.error(`\n  Port ${args.port} band. Boshqa port: node server.js --port ${args.port + 1}\n`);
    } else {
      console.error(e);
    }
    process.exit(1);
  });
  server.listen(args.port, args.host, () => {
    const lan = lanAddresses();
    console.log(`\n  ARVideo dev server ishga tushdi (${scheme.toUpperCase()})\n`);
    console.log(`  Local:   ${scheme}://localhost:${args.port}`);
    for (const ip of lan) console.log(`  Network: ${scheme}://${ip}:${args.port}`);
    if (args.https) {
      console.log('\n  Eslatma: o\'z-o\'zidan sertifikat — brauzer "xavfsiz emas" deydi,');
      console.log('  "Advanced -> Proceed" tugmasini bosing. Telefon kamerasi shunda ishlaydi.');
    } else if (lan.length) {
      console.log('\n  Telefonda kamera uchun HTTPS kerak: node server.js --https');
    }
    console.log('\n  To\'xtatish: Ctrl+C\n');
  });
}

if (args.https) {
  let cred;
  try {
    cred = selfSignedCert();
  } catch (e) {
    console.error('  ' + e.message + '\n');
    process.exit(1);
  }
  listen(https.createServer(cred, handler));
} else {
  listen(http.createServer(handler));
}
