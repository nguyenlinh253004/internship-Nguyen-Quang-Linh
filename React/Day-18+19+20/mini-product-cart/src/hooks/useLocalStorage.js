import { useState, useEffect } from 'react';

export default function useLocalStorage(key, defaultValue) {
  // Lấy giá trị khởi đầu từ localStorage (nếu có), ngược lại dùng defaultValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('useLocalStorage getItem error:', error);
      return defaultValue;
    }
  });

  // Mỗi khi storedValue thay đổi, sync lại vào localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('useLocalStorage setItem error:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
