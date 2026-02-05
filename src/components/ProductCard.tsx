"use client";

import Image from "next/image";
import type { Product } from "@/types/product";
import { useAppDispatch } from "@/store/hooks";
import { deleteProduct, fetchProductById } from "@/store/productsSlice";

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function ProductCard({ product, onEdit }: ProductCardProps) {
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    dispatch(fetchProductById(product.id));
    onEdit(product);
  };

  const handleDelete = () => {
    if (typeof window !== "undefined" && window.confirm("Delete this product?")) {
      void dispatch(deleteProduct(product.id));
    }
  };

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800">
      <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-700">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-2"
            sizes="(max-width: 768px) 100vw, 280px"
            unoptimized
          />
        ) : (
          <div className="flex h-full items-center justify-center p-4 text-center text-sm text-zinc-400">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 font-semibold text-zinc-900 dark:text-zinc-100">
          {product.title}
        </h3>
        <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
          ${product.price.toFixed(2)}
        </p>
        <p className="line-clamp-2 flex-1 text-sm text-zinc-500 dark:text-zinc-400">
          {product.description}
        </p>
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-600 dark:text-zinc-300">
          {product.category}
        </span>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={handleEdit}
            className="flex-1 rounded-lg bg-zinc-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-600 dark:hover:bg-zinc-500"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:border-red-800 dark:bg-zinc-800 dark:text-red-400 dark:hover:bg-red-900/20"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}
