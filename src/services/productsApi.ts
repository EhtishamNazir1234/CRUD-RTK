import type { Product, ProductInput } from "@/types/product";

const BASE_URL = "https://fakestoreapi.com";

export const productsApi = {

  async getAll(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  async getById(id: number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  async create(data: ProductInput): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  async update(id: number, data: Partial<ProductInput>): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  async delete(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete product");
  },
};
