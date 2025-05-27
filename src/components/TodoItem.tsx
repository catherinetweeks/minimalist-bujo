import type { Todo } from "../types/todo";


type Props = {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  return (
    <div className="flex items-center justify-between p-2 border-b">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={onToggle}
        />
        <span className={todo.completed ? "line-through text-gray-500" : ""}>
          {todo.text}
        </span>
      </label>
      <button className="text-red-500 p-4" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
}
