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
    completed: false,
    type: "task",
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
      <h1 className="text-3xl font-bold mb-5">Entries</h1>
      <div className="w-full max-w-md mb-8">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="bg-white rounded-xl p-4 mb-2 shadow flex justify-between items-center cursor-pointer"
            // conditional click handler - won't propagate modal if checking off task
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.tagName !== 'INPUT' && target.tagName !== 'BUTTON') {
                handleEditEntry(entry);
              }
            }}
          >
            <div>
              <h3 className="font-medium">{entry.title}</h3>
              <p className="text-sm text-gray-600">{entry.description}</p>
              <p className="text-xs text-gray-400">{entry.date}</p>
            </div>
            <div className="flex items-center gap-2">
              {entry.type === "task" && (
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
                />
              )}

              <button
                className="text-red-500 text-sm hover:underline"
                onClick={(e) => {
                  e.stopPropagation();
                  setEntries((prev) => prev.filter((e) => e.id !== entry.id));
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {editingEntry?.type === "note" ? (
          <NoteEditor
            initialNote={editingEntry.type === "note" ? editingEntry : undefined}
            onSave={handleSaveEntry}
          />
        ) : (
          <TaskEditor
            initialTask={editingEntry?.type === "task" ? editingEntry : undefined}
            onSave={handleSaveEntry}
          />
        )}
      </Modal>

      <div className="flex flex-col fixed bottom-10 right-10">
        <button
          onClick={handleAddTask}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
          >
          + Add Task
        </button>
        <button
          onClick={handleAddNote}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
        >
          + Add Note
        </button>
      </div>
    </div>
  );
};

export default HomePage;
