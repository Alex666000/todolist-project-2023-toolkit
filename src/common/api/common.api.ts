import axios from "axios"

export const instance = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  withCredentials: true,
  headers: {
    "API-KEY": "35a2bc33-9361-4658-a8b4-b1a6a75da53d",
  },
})
