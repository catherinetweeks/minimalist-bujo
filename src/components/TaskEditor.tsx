import { useState, useEffect } from "react";
import { type Task } from "../types";

interface Props {
  initialTask?: Task;
  onSave: (task: Task) => void;
}

const TaskEditor = ({ initialTask, onSave }: Props) => {
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

  const handleSubmit = () => {
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
    <div className="flex flex-col gap-3">
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
      <button
        onClick={handleSubmit}
        className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-500"
      >
        Save
      </button>
    </div>
  );
};

export default TaskEditor;
