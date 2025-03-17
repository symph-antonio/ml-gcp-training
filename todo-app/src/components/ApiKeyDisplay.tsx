'use client';

import React, { useState } from 'react';

const ApiKeyDisplay: React.FC = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || 'API key not available';

  const toggleApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  return (
    <div className="mt-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">
          API Key
        </h3>
        <button
          onClick={toggleApiKey}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors"
        >
          {showApiKey ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded">
        {showApiKey ? (
          <p className="font-mono break-all">{apiKey}</p>
        ) : (
          <p className="font-mono">••••••••••••••••••••••••••••••••</p>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        This API key is loaded from Google Cloud Secret Manager.
      </p>
    </div>
  );
};

export default ApiKeyDisplay;
