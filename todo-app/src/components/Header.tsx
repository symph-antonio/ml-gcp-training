'use client';

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 mb-6">
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Todo App
          </h1>
        </div>
        <div className="mt-2 text-xs flex items-center text-gray-500 dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-3 h-3 mr-1"
          >
            <path d="M12.933 10.144c-1.404 1.212-2.38 2.756-2.87 4.414l-3.039-3.01 1.414-1.415 1.453 1.453c.389-.847.858-1.63 1.384-2.373a9.93 9.93 0 0 1 1.658-1.926c.177.183.358.362.544.538a9.912 9.912 0 0 1 2.115 3.175c.051.138.095.277.134.418l1.228-1.227 1.415 1.414-3.013 3.013c-1.777-3.243-3.454-4.497-4.647-5.257a11.92 11.92 0 0 0-1.914 1.45l.905.933a9.97 9.97 0 0 1 1.233-1z" />
            <path d="M2 2h20v20H2V2zm2 2v16h16V4H4z" />
          </svg>
          Deployed on Google Cloud Platform
        </div>
      </div>
    </header>
  );
};

export default Header;
