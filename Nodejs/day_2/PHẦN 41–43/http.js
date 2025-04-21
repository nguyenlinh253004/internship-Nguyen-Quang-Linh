const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/hello') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Xin chào từ server Node.js!');
  } else {
    res.writeHead(404);
    res.end('404 Not Found');
  }
});

server.listen(3000, () => console.log('🚀 Server đang chạy tại http://localhost:3000'));