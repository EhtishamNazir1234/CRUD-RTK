import { ProductList } from "@/components/ProductList";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-800">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Products CRUD
          </h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Redux Toolkit · Tailwind · Fake Store API
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductList />
      </main>
    </div>
  );
}
