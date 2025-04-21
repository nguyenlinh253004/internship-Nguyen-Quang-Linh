// log-writer.js
const fs = require('fs');
const path = require('path');

const logMessage = `Hello at ${new Date().toISOString()}\n`;
const logPath = path.join(__dirname, 'log.txt');

fs.appendFileSync(logPath, logMessage);
console.log('✅ Ghi log thành công!');