console.log(process.argv);
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  readline.question('Bạn tên là gì? ', name => {
    console.log(`Xin chào ${name}!`);
    readline.close();
  });