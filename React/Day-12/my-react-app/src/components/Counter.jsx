import { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="p-4 border rounded-lg shadow-md max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Counter App</h2>
      <button
        onClick={toggleVisibility}
        className="mb-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        {isVisible ? 'Ẩn ' : 'Hiện'}
      </button>

      {isVisible && (
        <div className="flex items-center justify-center space-x-4">
          <button
            onClick={decrement}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            -
          </button>
          <span className="text-xl font-semibold">{count}</span>
          <button
            onClick={increment}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Counter;