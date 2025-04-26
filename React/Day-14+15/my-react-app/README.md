# React + Vite

This template provides a minimal setup to get React working in Vite with HMR (Hot Module Replacement) and some ESLint rules.

## Official Plugins

Currently, two official plugins are available for integrating React with Vite:

1. **[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react)**  
    This plugin uses [Babel](https://babeljs.io/) for enabling Fast Refresh, which allows you to see changes in your React components instantly without losing their state.

2. **[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc)**  
    This plugin uses [SWC](https://swc.rs/), a fast JavaScript and TypeScript compiler, to enable Fast Refresh.

## Expanding the ESLint Configuration

For production-grade applications, it is recommended to use TypeScript with type-aware linting rules enabled. This ensures better code quality and maintainability. Refer to the [TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for guidance on integrating TypeScript and [`typescript-eslint`](https://typescript-eslint.io) into your project.

## Project Structure

Below is an example of a typical project structure for a React application using Vite:

```
my-react-app/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Cart.jsx
│   │   ├── CartItem.jsx
│   │   ├── ProductForm.jsx
│   │   ├── ProductItem.jsx
│   │   └── ProductList.jsx
│   ├── Page/
│   │   └── Home.jsx
│   ├── utils/
│   │   └── storage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Basic Setup

### 1. Initialize the Project

Run the following commands to create a new React project using Vite:

```bash
npm create vite@latest my-react-app --template react
cd my-react-app
npm install
```

### 2. Install Additional Libraries (Optional)

To use icons in your project, you can install the `react-icons` library:

```bash
npm install react-icons
npm install heroicons/react
```

## Key Features

- Modern UI with Tailwind CSS
- Responsive design for all devices
- State management using `localStorage`
- Product form with validation
- Smart shopping cart:
  - Add/remove/update product quantities
  - Automatic total calculation
  - Empty cart display
- Enhanced UX with hover effects and transitions
- Well-organized, maintainable code

## Running the Application

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```