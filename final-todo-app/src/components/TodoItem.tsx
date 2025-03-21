'use client';

import React from 'react';

type TodoItemProps = {
  id: string;
  text: string;
  completed: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [editText, setEditText] = React.useState(text);

  const handleEditSubmit = () => {
    if (editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className="group border border-gray-200 dark:border-gray-700 rounded-lg mb-3 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="p-4 flex items-center justify-between">
        {isEditing ? (
          <div className="flex-1 flex items-center gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleEditSubmit()}
            />
            <button
              onClick={handleEditSubmit}
              className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(text);
              }}
              className="px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center flex-1">
              <input
                type="checkbox"
                checked={completed}
                onChange={() => onToggle(id)}
                className="w-5 h-5 mr-3 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span
                className={`flex-1 text-lg ${
                  completed
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : ''
                }`}
              >
                {text}
              </span>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-500 hover:text-blue-700 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                aria-label="Edit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(id)}
                className="p-1 text-red-500 hover:text-red-700 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors"
                aria-label="Delete"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
