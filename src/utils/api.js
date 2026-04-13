import axios from 'axios'

const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
})

API.interceptors.request.use((req) => {
  const auth = JSON.parse(localStorage.getItem('auth-storage') || '{}')
  const token = auth?.state?.token
  if (token) {
    req.headers.Authorization = `Bearer ${token}`
  }
  return req
})

export default API