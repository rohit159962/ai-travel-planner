import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane, Plus, Trash2, MapPin, Calendar, Users, Wallet } from 'lucide-react'
import API from '../utils/api'
import useAuthStore from '../store/useAuthStore'

function Saved() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
const { user, token } = useAuthStore()

useEffect(() => {
  if (!token) {
    navigate('/login')
    return
  }
  fetchTrips()
}, [])

  const fetchTrips = async () => {
    try {
      const res = await API.get('/trips')
      setTrips(res.data.trips)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await API.delete(`/trips/${id}`)
      setTrips(trips.filter((trip) => trip._id !== id))
    } catch (error) {
      console.error(error)
    }
  }

const handleView = (trip) => {
  const itineraryData = {
    destination: trip.destination,
    days: trip.days,
    people: trip.people,
    budget: trip.budget,
    travelStyle: trip.travelStyle,
    itinerary: trip.itinerary.itinerary || trip.itinerary,
    generalTips: trip.itinerary.generalTips,
    estimatedBudget: trip.itinerary.estimatedBudget,
  }
  localStorage.setItem('currentItinerary', JSON.stringify(itineraryData))
  navigate('/itinerary')
}


  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden"
    >

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-blue-600 opacity-20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 relative z-10">
        <span
          onClick={() => navigate('/')}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2"
        >
          <Plane size={20} className="text-purple-400" />
          Wandr<span className="text-purple-400">AI</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="text-white/50 text-sm hidden sm:inline">
            Hey, {user.name?.split(' ')[0]}! 👋
          </span>
          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            <Plus size={14} />
            New Trip
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              navigate('/')
            }}
            className="text-white/40 hover:text-white text-xs md:text-sm transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-24">

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            Your Trips
          </div>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black"
          >
            Saved{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
              Itineraries
            </span>
          </h1>
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center text-white/50 py-20">Loading your trips...</div>
        )}

        {/* Empty state */}
        {!loading && trips.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🗺️</div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl font-black mb-3"
            >
              No trips saved yet!
            </h3>
            <p className="text-white/50 text-sm mb-6">Plan your first AI generated trip now.</p>
            <button
              onClick={() => navigate('/plan')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm px-6 py-3 rounded-full mx-auto hover:scale-105 transition-all duration-200"
            >
              <Plus size={16} />
              Plan a Trip
            </button>
          </div>
        )}

        {/* Trips Grid */}
        {!loading && trips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {trips.map((trip) => (
              <div
                key={trip._id}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col gap-4"
              >
                {/* Destination */}
                <div>
                  <div className="flex items-center gap-2 text-purple-400 mb-1">
                    <MapPin size={14} />
                    <span className="text-xs uppercase tracking-wide font-medium">Destination</span>
                  </div>
                  <h3
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-xl font-black text-white"
                  >
                    {trip.destination}
                  </h3>
                </div>

                {/* Trip details */}
                <div className="flex flex-wrap gap-2">
                  <div className="flex items-center gap-1.5 bg-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">
                    <Calendar size={12} />
                    {trip.days} Days
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">
                    <Users size={12} />
                    {trip.people} People
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/10 text-white/60 text-xs px-3 py-1.5 rounded-full">
                    <Wallet size={12} />
                    {trip.budget}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => handleView(trip)}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs font-semibold py-2.5 rounded-xl transition-all duration-200 hover:scale-105"
                  >
                    View Itinerary
                  </button>
                  <button
                    onClick={() => handleDelete(trip._id)}
                    className="bg-white/10 hover:bg-red-500/20 hover:border-red-500/30 border border-white/10 text-white/60 hover:text-red-400 p-2.5 rounded-xl transition-all duration-200"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  )
}

export default Saved