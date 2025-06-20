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
        <div className="flex flex-row gap-3">
          <button
            onClick={handleSubmit}
            className="text-black px-4 py-2 hover:underline"
          >
            Save
          </button>

          {initialNote && onDelete && (
          <button
              type="button"
              onClick={() => onDelete(initialNote.id)}
              className="text-black px-4 py-2 hover:underline"
            >
              Delete Note
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default NoteEditor;
