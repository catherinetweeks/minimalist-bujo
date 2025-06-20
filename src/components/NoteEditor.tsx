import { useState, useEffect } from "react";
import { type Note } from "../types";

interface Props {
  initialNote?: Note;
  onSave: (note: Note) => void;
  onDelete?: (id: string) => void;
}

const NoteEditor = ({ initialNote, onSave, onDelete }: Props) => {
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

  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (title.trim() === "") {
      setError("Title is required.");
      return;
    }
    setError("");

    const newNote: Note = {
      id: initialNote?.id || Date.now().toString(),
      title,
      description,
      date,
      type: "note",
    };
    onSave(newNote);
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
        <button
          onClick={handleSubmit}
          className="bg-blue-300 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Save
        </button>

        {initialNote && onDelete && (
        <button
            type="button"
            onClick={() => onDelete(initialNote.id)}
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-600 mt-2"
          >
            Delete Note
          </button>
        )}
      </form>
    </div>
  );
};

export default NoteEditor;
