const fs = require('fs/promises');
const path = require('path');
const zlib = require('zlib');

const logsDir = path.join(__dirname, 'logs');
const archiveDir = path.join(__dirname, 'archives');

// Hàm định dạng lại tên file
function formatTimestamp(filename) {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[-:]/g, '').split('.')[0].replace('T', '_');
  return `log_${timestamp}.log`;
}

// Tạo thư mục nếu chưa có
async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch (e) {
    console.error('❌ Lỗi tạo thư mục:', e);
  }
}

async function archiveLogs() {
  await ensureDir(archiveDir);

  const files = await fs.readdir(logsDir);
  const logFiles = files.filter(f => f.endsWith('.log'));

  for (const file of logFiles) {
    const filePath = path.join(logsDir, file);
    const newName = formatTimestamp(file);
    const renamedPath = path.join(logsDir, newName);

    // Đổi tên file
    await fs.rename(filePath, renamedPath);

    // Đọc nội dung
    const data = await fs.readFile(renamedPath);

    // Nén file
    const zipName = newName.replace('.log', '.zip');
    const zipPath = path.join(archiveDir, zipName);
    const compressed = zlib.gzipSync(data);

    // Ghi file nén
    await fs.writeFile(zipPath, compressed);
    console.log(`✅ Đã nén ${newName} thành ${zipName}`);
  }
}

archiveLogs().catch(console.error);
