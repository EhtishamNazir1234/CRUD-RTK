# Products CRUD

A products CRUD app built with **Next.js**, **Redux Toolkit (RTK)**, **Tailwind CSS**, and the **Fake Store API**. List, add, edit, and delete products with a single Redux-managed state.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-1.x-764ABC?logo=redux)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## Features

- **List products** — Fetch and display all products from the Fake Store API
- **Add product** — Create a new product via a modal form
- **Edit product** — Update an existing product (title, price, description, category, image)
- **Delete product** — Remove a product with a confirmation step
- **Loading & error states** — Spinner while fetching, error message and retry on failure
- **Responsive UI** — Grid layout that adapts to screen size (Tailwind)

---

## Tech Stack

| Layer        | Technology |
|-------------|------------|
| Framework   | Next.js 16 (App Router) |
| State       | Redux Toolkit (RTK) |
| Styling     | Tailwind CSS v4 |
| Language    | TypeScript |
| API         | [Fake Store API](https://fakestoreapi.com) (REST, mocked data) |

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm (or yarn / pnpm)

### Install and run

```bash
# Clone the repository
git clone https://github.com/EhtishamNazir1234/CRUD-RTK.git
cd CRUD-RTK

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts

| Command        | Description |
|----------------|-------------|
| `npm run dev`  | Start dev server (hot reload) |
| `npm run build`| Build for production |
| `npm start`    | Run production build |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
src/
├── app/              # Next.js App Router (layout, page, providers)
├── components/       # ProductList, ProductCard, ProductForm
├── store/            # Redux store, products slice, typed hooks
├── services/         # productsApi (Fake Store API client)
└── types/            # Product, ProductInput
```

For a full technical walkthrough (data flow, Redux slice, API, components), see **[CODEBASE_DOCUMENTATION.md](./CODEBASE_DOCUMENTATION.md)**.

---

## API

The app uses the [Fake Store API](https://fakestoreapi.com):

- **GET** `/products` — List all products  
- **GET** `/products/:id` — Get one product  
- **POST** `/products` — Create product  
- **PATCH** `/products/:id` — Update product  
- **DELETE** `/products/:id` — Delete product  

Data is mocked and may not persist across requests.
