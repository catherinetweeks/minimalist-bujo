import { useState } from "react";
import { type Entry } from "../types";

import Modal from "../components/Modal";
import TaskEditor from "../components/TaskEditor";
import NoteEditor from "../components/NoteEditor";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

const handleSaveEntry = (entry: Entry) => {
  setEntries((prev) => {
    const exists = prev.find((e) => e.id === entry.id);
    return exists
      ? prev.map((e) => (e.id === entry.id ? entry : e))
      : [...prev, entry];
  });
  setIsModalOpen(false);
  setEditingEntry(null);
};

const handleEditEntry = (entry: Entry) => {
  setEditingEntry(entry);
  setIsModalOpen(true);
};

const handleAddTask = () => {
  setEditingEntry({
    id: Date.now().toString(),
    title: "",
    description: "",
    date: "",
    type: "task",
    completed: false,
  });
  setIsModalOpen(true);
};

const handleAddNote = () => {
  setEditingEntry({
    id: Date.now().toString(),
    title: "",
    description: "",
    date: "",
    type: "note",
  });
  setIsModalOpen(true);
};

  const [entries, setEntries] = useState<Entry[]>([]);
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-3xl font-semibold mb-5 mt-10">Current Entries</h1>
      <div className="w-full max-w-md mb-8">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl p-4 mb-2 shadow flex justify-between items-center cursor-pointer hover:bg-slate-100"
            // conditional click handler - won't propagate modal if checking off task
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName !== 'INPUT' && target.tagName !== 'BUTTON') {
                handleEditEntry(entry);
              }
            }}
          >
            <div>
              <h3
                className={`font-medium ${
                  entry.type === "task" && entry.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {entry.title}
              </h3>
              <p
                className={`text-sm ${
                  entry.type === "task" && entry.completed ? "text-gray-400 line-through" : "text-gray-600"
                }`}
              >
                {entry.description}
              </p>
              <p
                className={`text-xs ${
                  entry.type === "task" && entry.completed ? "text-gray-300 line-through" : "text-gray-400"
                }`}
              >
                {entry.date}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {entry.type === "task" && (
                <input className="ml-2"
                  type="checkbox"
                  checked={entry.completed}
                  onChange={(e) => {
                    e.stopPropagation();
                    setEntries((prev) =>
                      prev.map((t) =>
                        t.id === entry.id && t.type === "task"
                          ? { ...t, completed: !t.completed }
                          : t
                      )
                    );
                  }}
                />
              )}
            </div>
          </div>
        ))}

      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {editingEntry?.type === "note" ? (
          <NoteEditor
            initialNote={editingEntry.type === "note" ? editingEntry : undefined}
            onSave={handleSaveEntry}
            onDelete={(id) => {
              setEntries((prev) => prev.filter((e) => e.id !== id));
              setIsModalOpen(false);
              setEditingEntry(null);
            }}
          />
        ) : (
          <TaskEditor
            initialTask={editingEntry?.type === "task" ? editingEntry : undefined}
            onSave={handleSaveEntry}
            onDelete={(id) => {
              setEntries((prev) => prev.filter((e) => e.id !== id));
              setIsModalOpen(false);
              setEditingEntry(null);
            }}
          />
        )}
      </Modal>

      <div className="flex flex-col fixed bottom-10 right-10">
        <button
          onClick={handleAddTask}
          className="mb-4 px-4 py-2 text-black hover:underline"
          >
          + Add Task
        </button>
        <button
          onClick={handleAddNote}
          className="mb-4 px-4 py-2 text-black hover:underline"
        >
          + Add Note
        </button>
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" className="peer sr-only" />
          <div className="w-5 h-5 border-2 border-gray-300 rounded-full bg-white peer-checked:bg-black peer-checked:border-black flex items-center justify-center">
          </div>
        </label>

      </div>
    </div>
  );
};

export default HomePage;
