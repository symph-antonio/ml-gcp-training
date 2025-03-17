'use client';

import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ApiKeyDisplay from './ApiKeyDisplay';
import Header from './Header';
import TodoItem from './TodoItem';

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    // Load todos from localStorage on initial render
    if (typeof window !== 'undefined') {
      const savedTodos = localStorage.getItem('todos');
      if (savedTodos) {
        try {
          return JSON.parse(savedTodos);
        } catch (e) {
          console.error('Failed to parse todos from localStorage', e);
          return [];
        }
      }
    }
    return [];
  });

  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (newTodoText.trim()) {
      setTodos([
        ...todos,
        {
          id: uuidv4(),
          text: newTodoText.trim(),
          completed: false,
        },
      ]);
      setNewTodoText('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, newText: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const completedCount = todos.filter((todo) => todo.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="max-w-2xl mx-auto p-4 sm:p-6">
      <Header />
      <div className="mb-6">
        <div className="flex mb-4">
          <input
            type="text"
            value={newTodoText}
            onChange={(e) => setNewTodoText(e.target.value)}
            placeholder="What needs to be done?"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-l-lg 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       dark:bg-gray-800 dark:text-white"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors"
          >
            Add
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  id={todo.id}
                  text={todo.text}
                  completed={todo.completed}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              No todos to display
            </div>
          )}

          {todos.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-600 dark:text-gray-300">
              <div>
                <span className="font-medium">{activeCount}</span> items left
              </div>

              <div className="flex space-x-1 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1 ${
                    filter === 'all'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-3 py-1 ${
                    filter === 'active'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Active
                </button>
                <button
                  onClick={() => setFilter('completed')}
                  className={`px-3 py-1 ${
                    filter === 'completed'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  Completed
                </button>
              </div>

              {completedCount > 0 && (
                <button
                  onClick={clearCompleted}
                  className="text-red-500 hover:text-red-700 hover:underline"
                >
                  Clear completed
                </button>
              )}
            </div>
          )}
        </div>

        <ApiKeyDisplay />
      </div>
    </div>
  );
};

export default TodoList;
