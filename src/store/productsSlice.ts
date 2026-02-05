import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "@/services/productsApi";
import type { Product, ProductInput } from "@/types/product";

interface ProductsState {
  items: Product[];
  selectedProduct: Product | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  formStatus: "idle" | "loading" | "succeeded" | "failed";
  formError: string | null;
}

const initialState: ProductsState = {
  items: [],
  selectedProduct: null,
  status: "idle",
  error: null,
  formStatus: "idle",
  formError: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await productsApi.getAll();
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      return await productsApi.getById(id);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (data: ProductInput, { rejectWithValue }) => {
    try {
      return await productsApi.create(data);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (
    { id, data }: { id: number; data: Partial<ProductInput> },
    { rejectWithValue }
  ) => {
    try {
      return await productsApi.update(id, data);
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await productsApi.delete(id);
      return id;
    } catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);

// --- Slice (reducers for thunk lifecycle + sync actions) ---

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null;
    },
    clearFormStatus(state) {
      state.formStatus = "idle";
      state.formError = null;
    },
  },
  extraReducers(builder) {
    // fetchProducts
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // fetchProductById
    builder
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state) => {
        state.selectedProduct = null;
      });

    // createProduct
    builder
      .addCase(createProduct.pending, (state) => {
        state.formStatus = "loading";
        state.formError = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.formStatus = "succeeded";
        state.formError = null;
        state.items.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.formStatus = "failed";
        state.formError = action.payload as string;
      });

    // updateProduct
    builder
      .addCase(updateProduct.pending, (state) => {
        state.formStatus = "loading";
        state.formError = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.formStatus = "succeeded";
        state.formError = null;
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
        if (state.selectedProduct?.id === action.payload.id) {
          state.selectedProduct = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.formStatus = "failed";
        state.formError = action.payload as string;
      });

    // deleteProduct
    builder
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
        if (state.selectedProduct?.id === action.payload) {
          state.selectedProduct = null;
        }
      });
  },
});

export const { clearSelectedProduct, clearFormStatus } = productsSlice.actions;
export default productsSlice.reducer;
