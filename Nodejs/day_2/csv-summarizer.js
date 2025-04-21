// File: csv-summarizer.js
const fs = require('fs');
const readline = require('readline');
const { parse } = require('csv-parse/sync');
const { table } = require('table');

async function summarizeCSV(filePath) {
  try {
    // Đọc file CSV
    const csvData = fs.readFileSync(filePath, 'utf8');
    
    // Parse CSV
    const records = parse(csvData, {
      columns: true,
      skip_empty_lines: true
    });

    if (records.length === 0) {
      console.error('File CSV không có dữ liệu');
      process.exit(1);
    }

    // Xác định cột số
    const numericColumns = [];
    const sampleRow = records[0];
    
    for (const column in sampleRow) {
      if (!isNaN(parseFloat(sampleRow[column]))) {
        numericColumns.push(column);
      }
    }

    if (numericColumns.length === 0) {
      console.error('Không tìm thấy cột số trong file CSV');
      process.exit(1);
    }

    // Tính toán thống kê
    const stats = {};
    
    numericColumns.forEach(column => {
      const values = records.map(row => parseFloat(row[column]));
      stats[column] = {
        sum: values.reduce((a, b) => a + b, 0),
        average: values.reduce((a, b) => a + b, 0) / values.length
      };
    });

    // Chuẩn bị dữ liệu cho bảng
    const tableData = [
      ['Cột', 'Tổng', 'Trung bình']
    ];

    numericColumns.forEach(column => {
      tableData.push([
        column,
        stats[column].sum.toFixed(2),
        stats[column].average.toFixed(2)
      ]);
    });

    // Hiển thị kết quả
    console.log(`\nThống kê cho file: ${filePath}`);
    console.log(table(tableData, {
      border: {
        topBody: '─',
        topJoin: '┬',
        topLeft: '┌',
        topRight: '┐',

        bottomBody: '─',
        bottomJoin: '┴',
        bottomLeft: '└',
        bottomRight: '┘',

        bodyLeft: '│',
        bodyRight: '│',
        bodyJoin: '│',

        joinBody: '─',
        joinLeft: '├',
        joinRight: '┤',
        joinJoin: '┼'
      }
    }));

  } catch (error) {
    console.error('Lỗi khi xử lý file CSV:', error.message);
    process.exit(1);
  }
}

// Xử lý command line
const args = process.argv.slice(2);
if (args.length !== 1) {
  console.error('Cách dùng: node csv-summarizer.js <đường-dẫn-file.csv>');
  process.exit(1);
}

summarizeCSV(args[0]);