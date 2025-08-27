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

// export const fetchNotes = async (
//   { page = 1, perPage = 10, search = "" }: FetchNotesParams = {},
//   tag?: string
// ) => {
//   const params: Record<string, string | number> = { page, perPage };

//   if (search.trim()) params.search = search.trim();
//   if (tag && tag !== 'All') params.tag = tag;

//   const { data } = await api.get<NoteListType>("/notes", { params });
//   return data;
// };

// export const getSingleNote = async (id: string) => {
//   const { data } = await api.get<Note>(`/notes/${id}`)
//   return data
// }

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

export const getMe = async () => {
  const { data } = await nextServer.get<User>('/users/me');
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post('/auth/logout')
};



export type UpdateUserRequest = {
  userName?: string;
};

export const updateMe = async (payload: UpdateUserRequest) => {
  const res = await nextServer.patch<User>('/users/me', payload);
  return res.data;
};