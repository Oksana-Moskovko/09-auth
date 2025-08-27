import { Note, NoteTag } from "@/types/note";
import { User } from "@/types/user";
import { nextServer } from "./api";

export type RegisterRequest = {
  email: string;
  password: string;
};

export type CheckSessionRequest = {
  success: boolean;
};

export type CreateNoteData = {
  title: string
  content: string
  tag: NoteTag;
}

export type NoteListType = {
  notes: Note[];        
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
}

export type LoginRequest = {
  email: string;
  password: string;
};


export const fetchNotes = async (
  page: number,
  perPage: number,
  search: string = "",
  tag?: string
): Promise<NoteListType> => {
  const response = await nextServer.get<NoteListType>("/notes", {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search } : {}),
      ...(tag && tag !== "All" ? { tag } : {}),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const response = await nextServer.get<Note>(`/notes/${id}`);
  return response.data;
};
export const createNote = async (newNote: CreateNoteData): Promise<Note> => {
  const response = await nextServer.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
};

export const login = async (data: LoginRequest) => {
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
};

export const register = async (data: RegisterRequest) => {
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
};

export const checkSession = async () => {
  const res = await nextServer.get<CheckSessionRequest>('/auth/session');
  return res.data.success;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};



export type UpdateUserRequest = {
  username?: string;
};

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};
