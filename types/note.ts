export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: NoteTag;
}

export type Tag = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tag: NoteTag;
};

export type NoteTag = "Work" | "Personal" | "Meeting" | "Shopping" | "Ideas" | "Travel" | "Finance" | "Health" | "Important" | "Todo";
export const tags = ["Work", "Personal", "Meeting", "Shopping", "Ideas", "Travel", "Finance", "Health", "Important", "Todo"];