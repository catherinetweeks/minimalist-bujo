import { useState, useEffect } from "react";
import { type Note } from "../types";

interface Props {
  initialNote?: Note;
  onSave: (note: Note) => void;
}

const NoteEditor = ({ initialNote, onSave }: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title);
      setDescription(initialNote.description);
      setDate(initialNote.date);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [initialNote]);

  const handleSubmit = () => {
    const newNote: Note = {
      id: initialNote?.id || Date.now().toString(),
      title,
      description,
      date,
      type: "note", // ✅ critical line
    };
    onSave(newNote);
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

export default NoteEditor;
