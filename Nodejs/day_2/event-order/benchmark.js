// benchmark.js
const iterations = parseInt(process.argv[2], 10) || 100;
const results = {
  nextTick: [],
  setTimeout: [],
  setImmediate: []
};
let completed = 0;

function runTest() {
  console.log(`Bắt đầu benchmark với ${iterations} lần lặp...`);

  runBenchmark("nextTick", process.nextTick);
  runBenchmark("setTimeout", cb => setTimeout(cb, 0));
  runBenchmark("setImmediate", setImmediate);
}

function runBenchmark(type, scheduler) {
  const start = Date.now();
  for (let i = 0; i < iterations; i++) {
    scheduler(() => {
      results[type].push(Date.now() - start);
      if (results[type].length === iterations) {
        logResults(type);
        completed++;
        if (completed === 3) {
          console.log("🏁 Tất cả benchmark đã hoàn thành.");
        }
      }
    });
  }
}

function logResults(type) {
  const times = results[type];
  const avg = times.reduce((a, b) => a + b, 0) / times.length;

  console.log(`\n📊 Kết quả ${type}:
- Số lần hoàn thành: ${times.length}/${iterations}
- Thời gian trung bình: ${avg.toFixed(2)}ms
- Nhanh nhất: ${Math.min(...times)}ms
- Chậm nhất: ${Math.max(...times)}ms
- Tổng thời gian: ${times[times.length - 1]}ms`);
}

runTest();
