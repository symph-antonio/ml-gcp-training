import TodoList from '@/components/TodoList';

export default function Home() {
  return (
    <main className="min-h-screen py-8 sm:py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto">
        <TodoList />
      </div>
    </main>
  );
}
