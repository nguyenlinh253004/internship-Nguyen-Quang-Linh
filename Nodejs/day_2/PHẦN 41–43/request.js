const http = require('http');

const options = {
  hostname: 'example.com',
  port: 80,
  path: '/path',
  method: 'GET'
};

const req = http.request(options, res => {
  console.log(`Status: ${res.statusCode}`);
  res.on('data', chunk => {
    console.log(`Body: ${chunk}`);
  });
});

req.on('error', err => {
  console.error('Lỗi:', err);
});

req.end();