import API from './api'

export const generateItinerary = async (formData) => {
  const res = await API.post('/generate', formData)
  return res.data
}