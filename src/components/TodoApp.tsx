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
        {entries.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            Add a task to get started ~
          </p>
        ) : (
          entries.map((entry) => (
          <div
            key={entry.id}
            className="rounded-xl p-4 mb-1 flex items-start gap-4 cursor-pointer hover:bg-slate-50"
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName !== 'INPUT' && target.tagName !== 'BUTTON') {
                handleEditEntry(entry);
              }
            }}
          >
            {entry.type === "task" ? (
              <input
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
                  className="w-4 h-4 accent-black mt-1"
              />
            ): (
              <p className="font-bold">—</p>
            )}

            <div className="flex-1">
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
          </div>
        )))}

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
      </div>
    </div>
  );
};

export default HomePage;

        // <label className="flex items-center cursor-pointer">
        //   <input type="checkbox" className="peer sr-only" />
        //   <div className="w-5 h-5 border-2 border-gray-300 rounded-full bg-white hover:bg-gray-300 peer-checked:bg-gray-400 peer-checked:border-gray-400 flex items-center justify-center">
        //   </div>
        // </label>