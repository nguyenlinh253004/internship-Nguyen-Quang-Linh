const fs = require('fs');
const { Transform } = require('stream');

// Tạo Transform stream để thay thế chuỗi
const replaceStream = new Transform({
  transform(chunk, encoding, callback) {
    const replaced = chunk.toString().replace(/ERROR/g, '⚠️ Warning');
    callback(null, replaced);
  }
});

const readStream = fs.createReadStream('bigfile.txt');
const writeStream = fs.createWriteStream('output_fixed.txt');

readStream
  .pipe(replaceStream)
  .pipe(writeStream);

writeStream.on('finish', () => {
  console.log('✅ Hoàn tất xử lý!');
});
