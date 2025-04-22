try {
    const a = 10;
    const b = 0;
    if (b === 0) throw new Error('Không thể chia cho 0!');
    const result = a / b;
    console.log(result);
  } catch (err) {
    console.error('Lỗi:', err.message);
  }