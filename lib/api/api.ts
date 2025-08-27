import axios from 'axios'

export const nextServer = axios.create({
  // baseURL: 'http://localhost:3000/api',
  baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
  withCredentials: true,
})

// getNotes = tags
// export const getNotes = ["Work", "Todo", "Personal", "Meeting", "Shopping"];