export type BaseEntry = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type Task = BaseEntry & {
  type: "task";
  completed: boolean;
};

export type Note = BaseEntry & {
  type: "note";
};

export type Entry = Task | Note;
