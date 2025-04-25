import Counter from './components/Counter';
import TodoList from './components/Todolist';

function App() {
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Day 12: React Basics</h1>
     
      <Counter />
      <TodoList />
    </div>
  );
}

export default App;