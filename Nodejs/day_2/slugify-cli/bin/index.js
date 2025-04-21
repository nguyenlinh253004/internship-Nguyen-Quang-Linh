#!/usr/bin/env node
import slugify from '../lib/slugifys.js';

const args = process.argv.slice(2);

if (args.length === 0) {
  console.error('Vui lòng nhập chuỗi cần chuyển đổi');
  console.log('Cách dùng: npx slugify-cli "Chuỗi cần chuyển"');
  process.exit(1);
}

const input = args.join(' ');
console.log(slugify(input));