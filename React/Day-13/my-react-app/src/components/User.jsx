import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-gray-50 min-h-screen">
      <div className="text-3xl font-bold text-green-500 mb-6">Danh sách Người dùng</div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {users.map((user) => (
          <div
            key={user.id}
            className="border-2 border-gray-300 p-4 rounded-lg shadow-md bg-white transition-transform hover:scale-105"
          >
            <div className="text-xl font-semibold text-gray-800 mb-2">{user.name}</div>
            <div className="text-gray-600 mb-1">{user.email}</div>
            <div className="text-gray-500">{user.phone}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default User;
