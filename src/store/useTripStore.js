import { create } from 'zustand'
import API from '../utils/api'

const useTripStore = create((set) => ({
  trips: [],
  loading: false,

  fetchTrips: async () => {
    set({ loading: true })
    try {
      const res = await API.get('/trips')
      set({ trips: res.data.trips })
    } catch (error) {
      console.error(error)
    } finally {
      set({ loading: false })
    }
  },

  saveTrip: async (tripData) => {
    try {
      const res = await API.post('/trips', tripData)
      set((state) => ({ trips: [res.data.trip, ...state.trips] }))
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },

  deleteTrip: async (id) => {
    try {
      await API.delete(`/trips/${id}`)
      set((state) => ({ trips: state.trips.filter((t) => t._id !== id) }))
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  },
}))

export default useTripStore