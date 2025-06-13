export type EntryType = "task" | "note";

export interface Note {
    id: string;
    title: string;
    description: string;
    date: string;
}

export interface Task extends Note{
    completed: boolean;
}
