const http = require('http');
const Busboy = require('busboy');
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

const emitter = new EventEmitter();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

emitter.on('upload:done', (filename) => {
  const log = `${new Date().toISOString()} - Uploaded: ${filename}\n`;
  fs.appendFileSync(path.join(__dirname, 'uploads.log'), log);
});

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/upload') {
    const busboy = Busboy({ headers: req.headers }); // 👈 KHÔNG có 'new'

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const actualFilename = typeof filename === 'string' ? filename : 'uploaded_' + Date.now();
        const savePath = path.join(uploadsDir, actualFilename);
        const writeStream = fs.createWriteStream(savePath);
      
        file.pipe(writeStream);
      
        file.on('end', () => {
          emitter.emit('upload:done', actualFilename);
        });
      });

    busboy.on('finish', () => {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('✅ Upload xong!');
    });

    req.pipe(busboy);
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(4000, () => {
  console.log('🚀 Server running at http://localhost:4000/upload');
});
