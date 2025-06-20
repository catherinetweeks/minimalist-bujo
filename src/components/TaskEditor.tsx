import { useState, useEffect } from "react";
import { type Task } from "../types";

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
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <div className="flex flex-row gap-3">
          <button
            onClick={handleSubmit}
            className="text-black px-4 py-2 hover:underline"
          >
            Save
          </button>
          {initialTask && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(initialTask.id)}
              className="text-black px-4 py-2 hover:underline"
            >
              Delete Task
            </button>
          )}
        </div>

      </form>
    </div>
  );
};

export default TaskEditor;
