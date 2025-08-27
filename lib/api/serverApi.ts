import { cookies } from 'next/headers'
import { api } from './api'
import { CheckSessionRequest } from './clientApi'
import { User } from '@/types/user'
import { Note } from '@/types/note'

export const checkServerSession = async () => {
  const cookieStore = await cookies()
  const res = await api.get<CheckSessionRequest>(`/auth/session`, {
    headers: { Cookie: cookieStore.toString() },
  })
  return res
}

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get(`/users/me`, {
    headers: {
      Cookie: cookieStore.toString()
    },
  });
  return data;
}



export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number,
  perPage: 12,
  search: string = "",
  tag?: string
): Promise<FetchNotesResponse> => {
  const cookieStore = await cookies();
  const response = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search.trim() ? { search } : {}),
      tag,
    },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return response.data;
};

export const fetchNoteById = async (id: string) => {
  const cookieStore = await cookies();

  const response = await api.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
};