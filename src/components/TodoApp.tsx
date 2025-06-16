import { useState } from "react";
import { type Task, type Note } from "../types";

import Modal from "../components/Modal";
import TaskEditor from "../components/TaskEditor";

const HomePage = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveTask = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      return exists
        ? prev.map((t) => (t.id === task.id ? task : t))
        : [...prev, task];
    });
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t)=>t.id !== id));
  };


  const [tasks, setTasks] = useState<Task[]>([]);

  const [notes] = useState<Note[]>([]);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-5">Entries</h1>
      {/* tasks */}
      <div className="w-full max-w-md mb-8">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-xl p-4 mb-2 shadow flex justify-between items-center cursor-pointer"
            onClick={() => handleEditTask(task)}
          >
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-xs text-gray-400">{task.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) => {
                  e.stopPropagation(); // prevents modal from opening
                  setTasks((prev) =>
                    prev.map((t) =>
                      t.id === task.id ? { ...t, completed: !t.completed } : t
                    )
                  );
                }}
              />
              <button
                className="text-red-500 text-sm hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteTask(task.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {notes.map((note) => (
          <div
            key={note.id}
            className="bg-gray-100 rounded-xl p-4 mb-2 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{note.title}</h3>
              <p className="text-sm text-gray-600">{note.description}</p>
              <p className="text-xs text-gray-400">{note.date}</p>
            </div>
          </div>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TaskEditor initialTask={editingTask || undefined} onSave={handleSaveTask} />
      </Modal>
      <button
        onClick={handleAddTask}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
        + Add Task
      </button>
    </div>
  );
};

export default HomePage;
