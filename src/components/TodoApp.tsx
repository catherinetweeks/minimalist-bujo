import { useState } from "react";
import { type Entry } from "../types";

import Modal from "../components/Modal";
import TaskEditor from "../components/TaskEditor";
import NoteEditor from "../components/NoteEditor";
import Dropdown from "../components/Dropdown";

import addEntry from "../assets/addEntry.svg";

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

// const handleAddNote = () => {
//   setEditingEntry({
//     id: Date.now().toString(),
//     title: "",
//     description: "",
//     date: "",
//     type: "note",
//   });
//   setIsModalOpen(true);
// };

const [entries, setEntries] = useState<Entry[]>([]);
const [editingEntry, setEditingEntry] = useState<Entry | null>(null);

// for sorting and filters
const [filterStatus, setFilterStatus] = useState<"all" | "completed" | "incomplete">("all");
const [sortBy, setSortBy] = useState<"dateAdded" | "taskDate">("dateAdded");

  return (
    <div className="flex flex-col items-center p-8">
      <div className="flex flex-row items-center gap-2 p-6 mt-5">
        <h1 className="text-5xl mb-5 mt-2 font-titleFont hover:-translate-y-0.5 transition-all">
          Your Entries
        </h1>
        <div className="relative">
          <button
            onClick={() => handleAddTask()}
            className="mb-2 p-2 bg-white text-black rounded flex items-center justify-center w-15 h-15 shrink-0"
          >
            <img
              src={addEntry}
              alt="Add Entry"
              className="w-9 h-9 object-contain pointer-events-none hover:-translate-y-0.5 transition-all"
            />
          </button>
        </div>
      </div>
      <div className="flex justify-between mb-4 w-full max-w-xs p-3 appearance-none">
        <div className="flex justify-between mb-4 w-full max-w-lg gap-4">
          <Dropdown
            options={["all", "completed", "incomplete"]}
            value={filterStatus}
            onChange={(val) => setFilterStatus(val as typeof filterStatus)}
          />

          <Dropdown
            options={["dateAdded", "taskDate"]}
            value={sortBy}
            onChange={(val) => setSortBy(val as typeof sortBy)}
          />
        </div>
      </div>
        <div className="w-full max-w-lg mb-8">
          {entries.length === 0 ? (
            <p className="text-center text-gray-400 italic">
              Add a task to get started ~
            </p>
          ) : (
            <>
              {entries
                .filter((entry) => {
                  if (entry.type !== "task") return true;
                  if (filterStatus === "completed") return entry.completed;
                  if (filterStatus === "incomplete") return !entry.completed;
                  return true;
                })
                .sort((a, b) => {
                  if (sortBy === "dateAdded") return Number(b.id) - Number(a.id);
                  if (sortBy === "taskDate") return a.date.localeCompare(b.date);
                  return 0;
                })
                .map((entry) => (
                  <div
                    key={entry.id}
                    className="rounded-xl p-4 mb-1 flex items-start gap-4 cursor-pointer hover:bg-slate-50 hover:-translate-y-0.5 transition-all"
                    onClick={(e) => {
                      const target = e.target as HTMLElement;
                      if (
                        target.tagName !== "INPUT" &&
                        target.tagName !== "BUTTON"
                      ) {
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
                    ) : (
                      <p className="font-bold">—</p>
                    )}

                    <div className="flex-1">
                      <h3
                        className={`font-medium ${
                          entry.type === "task" && entry.completed
                            ? "line-through text-gray-400"
                            : ""
                        }`}
                      >
                        {entry.title}
                      </h3>
                      <p
                        className={`text-sm ${
                          entry.type === "task" && entry.completed
                            ? "text-gray-400 line-through"
                            : "text-gray-600"
                        }`}
                      >
                        {entry.description}
                      </p>
                      <p
                        className={`text-xs ${
                          entry.type === "task" && entry.completed
                            ? "text-gray-300 line-through"
                            : "text-gray-400"
                        }`}
                      >
                        {entry.date}
                      </p>
                    </div>
                  </div>
                ))}
            </>
          )}
        </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {/* Toggle only appears for new entries (not edits) */}
        {editingEntry && !entries.find((e) => e.id === editingEntry.id) && (
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() =>
                setEditingEntry((prev) =>
                  prev ? { ...prev, type: "task", completed: false } : prev
                )
              }
              className={`px-3 py-1 rounded ${
                editingEntry?.type === "task"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              Task
            </button>
            <button
              onClick={() =>
                setEditingEntry((prev) =>
                  prev ? { ...prev, type: "note" } : prev
                )
              }
              className={`px-3 py-1 rounded ${
                editingEntry?.type === "note"
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              Note
            </button>
          </div>
        )}

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
    </div>
  );
};

export default HomePage;