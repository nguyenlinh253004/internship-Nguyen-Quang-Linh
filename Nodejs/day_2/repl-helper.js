import repl from 'repl';
import fs from 'fs';

let commandHistory = [];

// Tạo REPL mà không cần custom eval
const server = repl.start({
  prompt: '>> '
});

// Thêm hàm vào context REPL
server.context.sayHi = () => 'Hi there!';
server.context.now = () => new Date().toLocaleString();
server.context.sum = (a, b) => a + b;

// Lưu lệnh nhập vào history
server.on('line', (cmd) => {
  commandHistory.push(cmd.trim());
});

// Command .save để lưu lịch sử
server.defineCommand('save', {
  help: 'Lưu lịch sử REPL vào file history.txt',
  action() {
    fs.writeFileSync('history.txt', commandHistory.join('\n'), 'utf8');
    console.log('Đã lưu lịch sử vào history.txt');
    this.displayPrompt();
  }
});
