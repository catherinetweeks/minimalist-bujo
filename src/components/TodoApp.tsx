import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { useTodos } from "../hooks/useTodos";

export default function TodoApp() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    // max-w-md mx-auto 
    <div className="flex flex-col min-h-screen justify-center items-center">
      <h1 className="text-2xl mb-4">Current Entries</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={todos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
    </div>
  );
}
