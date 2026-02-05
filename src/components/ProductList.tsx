"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/productsSlice";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";

export function ProductList() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    void dispatch(fetchProducts());
  }, [dispatch]);

  const openAddForm = () => {
    setEditingProduct(null);
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditingProduct(null);
  };

  if (status === "loading") {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
        <p className="font-medium">Failed to load products</p>
        <p className="text-sm">{error}</p>
        <button
          type="button"
          onClick={() => void dispatch(fetchProducts())}
          className="mt-2 rounded-lg bg-red-600 px-3 py-1.5 text-sm text-white hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
          Products
        </h1>
        <button
          type="button"
          onClick={openAddForm}
          className="rounded-xl bg-emerald-600 px-4 py-2.5 font-medium text-white shadow-sm transition hover:bg-emerald-700"
        >
          Add Product
        </button>
      </div>
      {items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 bg-zinc-50 py-12 text-center text-zinc-500 dark:border-zinc-600 dark:bg-zinc-800/50 dark:text-zinc-400">
          <p className="mb-2 font-medium">No products yet</p>
          <p className="text-sm">Add your first product to get started.</p>
          <button
            type="button"
            onClick={openAddForm}
            className="mt-4 rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white hover:bg-emerald-700"
          >
            Add Product
          </button>
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} onEdit={openEditForm} />
            </li>
          ))}
        </ul>
      )}
      {formOpen && (
        <ProductForm editingProduct={editingProduct} onClose={closeForm} />
      )}
    </>
  );
}
