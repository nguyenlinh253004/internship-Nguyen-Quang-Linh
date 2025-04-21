const args = process.argv.slice(2); // Bỏ 2 phần tử đầu (node và tên file)

if (args.length !== 2) {
  console.error('Vui lòng nhập đúng 2 số!');
  console.log('Cách dùng: node sum.js <số thứ nhất> <số thứ hai>');
  process.exit(1);
}

const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

if (isNaN(num1) || isNaN(num2)) {
  console.error('Vui lòng nhập số hợp lệ!');
  process.exit(1);
}

const sum = num1 + num2;
console.log(`Tổng của ${num1} và ${num2} là: ${sum}`);