# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh.
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh.

## Expanding the ESLint Configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Project Setup

### Step 1: Initialize the Project

First, create a Vite project with React:

```bash
npm create vite@latest product-management-app --template react
cd product-management-app
npm install
npm install react-router-dom tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 2: Project Structure

The project structure will look like this:

```
src/
├── components/
│   ├── ProductCard.jsx
│   ├── Navbar.jsx
├── context/
│   ├── CartContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
├── App.jsx
├── main.jsx
```

### Step 3: Key Features

- **Context API**: Manage the global cart state, allowing products to be added or removed from any component.
- **React Router**: Navigate between pages:
    - Home page: Displays a list of products.
    - Product detail page: Shows details of a product by ID.
    - Cart page: Displays the cart details.
- **Tailwind CSS**: Style the entire application using utility classes.

### Step 4: Component Overview

- **ProductCard**: Displays basic product information and an "Add to Cart" button.
- **Navbar**: Shows the number of items in the cart.
- **Cart**: Displays cart details with the ability to remove products.

### Step 5: Running the Project

To run the project locally, use the following commands:

```bash
# Start the development server
npm run dev
```

This will start the Vite development server. Open your browser and navigate to `http://localhost:5173` to view the application.

To build the project for production, use:

```bash
# Build the project
npm run build
```

To preview the production build locally, run:

```bash
# Preview the production build
npm run preview
```