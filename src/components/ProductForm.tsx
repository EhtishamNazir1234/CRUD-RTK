"use client";

import { useEffect, useState } from "react";
import type { Product, ProductInput } from "@/types/product";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  createProduct,
  updateProduct,
  clearFormStatus,
  clearSelectedProduct,
} from "@/store/productsSlice";

const emptyForm: ProductInput = {
  title: "",
  price: 0,
  description: "",
  category: "",
  image: "",
};

interface ProductFormProps {
  editingProduct: Product | null;
  onClose: () => void;
}

export function ProductForm({ editingProduct, onClose }: ProductFormProps) {
  const dispatch = useAppDispatch();
  const { formStatus, formError } = useAppSelector((s) => s.products);
  const [form, setForm] = useState<ProductInput>(
    editingProduct
      ? {
          title: editingProduct.title,
          price: editingProduct.price,
          description: editingProduct.description,
          category: editingProduct.category,
          image: editingProduct.image,
        }
      : emptyForm
  );

  useEffect(() => {
    if (editingProduct) {
      setForm({
        title: editingProduct.title,
        price: editingProduct.price,
        description: editingProduct.description,
        category: editingProduct.category,
        image: editingProduct.image,
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingProduct]);

  useEffect(() => {
    if (formStatus === "succeeded") {
      dispatch(clearFormStatus());
      dispatch(clearSelectedProduct());
      onClose();
    }
  }, [formStatus, dispatch, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      void dispatch(
        updateProduct({
          id: editingProduct.id,
          data: form,
        })
      );
    } else {
      void dispatch(createProduct(form));
    }
  };

  const handleChange = (field: keyof ProductInput, value: string | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-800">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {editingProduct ? "Edit Product" : "Add Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="title"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={form.title}
              onChange={(e) => handleChange("title", e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              min={0}
              step={0.01}
              value={form.price || ""}
              onChange={(e) =>
                handleChange("price", parseFloat(e.target.value) || 0)
              }
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Category
            </label>
            <input
              id="category"
              type="text"
              value={form.category}
              onChange={(e) => handleChange("category", e.target.value)}
              required
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Image URL
            </label>
            <input
              id="image"
              type="url"
              value={form.image}
              onChange={(e) => handleChange("image", e.target.value)}
              placeholder="https://..."
              className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-zinc-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-100"
            />
          </div>
          {formError && (
            <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
          )}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 font-medium text-zinc-700 transition hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={formStatus === "loading"}
              className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {formStatus === "loading"
                ? "Saving..."
                : editingProduct
                  ? "Update"
                  : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
