# React + Vite

## Day 17: useReducer + Custom Hook
### useReducer vs useState Example

#### When to use `useState`:
Use `useState` for simple state management, such as toggling a boolean or managing a single value.

```jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>Increment</button>
            <button onClick={() => setCount(count - 1)}>Decrement</button>
        </div>
    );
}

export default Counter;
```

#### When to use `useReducer`:
Use `useReducer` for more complex state logic, such as managing multiple related state variables or handling state transitions.

```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'reset':
            return initialState;
        default:
            throw new Error('Unknown action type');
    }
}

function CounterWithReducer() {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
            <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
        </div>
    );
}

export default CounterWithReducer;
```

#### Key Differences:
- `useState` is simpler and better suited for straightforward state updates.
- `useReducer` is more powerful for managing complex state logic or when actions need to be explicitly defined.
### Key Concepts

- **useReducer vs useState**: Understand the differences and when to use each.
- **Refactor Context with useReducer**: Simplify state management by combining Context API with useReducer.
- **Custom Hook `useCart()`**: Encapsulate cart logic into a reusable custom hook.
- **API Integration**: Connect to your own Node.js API for product management.
- **Form Handling**: Manage loading states, error handling, and form validation.

### API Endpoints

- **Get Products**: `GET http://localhost:3000/api/products`
- **Admin Products**: `GET/POST/PUT/DELETE http://localhost:3000/api/products/admin/products`

### Steps to Refactor the Cart App

1. **Add Reducer for Cart Management**:
    - Use `useReducer` to handle cart actions like adding, removing, and updating products.

2. **Create a Custom Hook**:
    - Implement `useCart()` to encapsulate cart logic, making it reusable across components.

3. **Connect to Node.js API**:
    - Fetch products from `http://localhost:3000/api/products`.
    - Perform CRUD operations on `http://localhost:3000/api/products/admin/products`.

4. **Enhance User Experience**:
    - Handle loading and error states during API calls.
    - Validate forms for adding or editing products.
    ### Project Structure

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
### Running the Updated Project

To start the development server:

```bash
npm run dev
```

Access the application at `http://localhost:5173`.

To build and preview the production version:

```bash
npm run build
npm run preview
```
