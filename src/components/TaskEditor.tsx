import { useRef, useState, useEffect } from "react";
import { type Task } from "../types";
import deleteIcon from '../assets/trash.svg';
import saveIcon from '../assets/save.svg';

interface Props {
  initialTask?: Task;
  onSave: (task: Task) => void;
  onDelete?: (id: string) => void;
}

const TaskEditor = ({ initialTask, onSave, onDelete }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setDate(initialTask.date);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
    titleInputRef.current?.focus();
  }, [initialTask]);

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }
    setError("");

    const newTask: Task = {
      id: initialTask?.id || Date.now().toString(),
      title,
      description,
      date,
      completed: initialTask?.completed ?? false,
      type: "task",
    };

    onSave(newTask);
  };

  const titleInputRef = useRef<HTMLInputElement>(null);



  return (
    <div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <form className="flex flex-col gap-3"
        onSubmit={(e) => {
          e.preventDefault(); //prevents the page from reloading
          handleSubmit();
        }}
      >
        <input
          ref={titleInputRef}
          type="text"
          placeholder="Title"
          className="bg-transparent border-none focus:outline-none placeholder-gray-400 text-lg p-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="bg-transparent border-none focus:outline-none placeholder-gray-400 p-2 resize-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="bg-transparent border-none focus:outline-none text-sm text-gray-700 p-2"

          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex flex-row gap-2">
          <button
            onClick={handleSubmit}
            className="text-black px-4 py-2"
          >
            <img
              src={saveIcon}
              alt="Save"
              className="w-5 h-5 cursor-pointer hover:-translate-y-0.5 transition-all"
            />
          </button>
          {initialTask && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(initialTask.id)}
              className="text-black px-4 py-2"
            >
            <img
              src={deleteIcon}
              alt="Delete"
              className="w-5 h-5 cursor-pointer hover:-translate-y-0.5 transition-all"
            />
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default TaskEditor;
