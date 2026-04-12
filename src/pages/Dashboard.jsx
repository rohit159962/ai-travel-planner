import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Plane, Plus, MapPin, Compass, Bookmark,
  Lightbulb, TrendingUp, LogOut, Map,
  Calendar, Users, Wallet, ArrowRight,
  Sparkles, Mountain, Coffee, Music,
  Leaf, UtensilsCrossed, Sunset
} from 'lucide-react'
import API from '../utils/api'

const moods = [
  { label: 'Adventure', icon: Mountain, desc: 'Thrilling & outdoor experiences', gradient: 'from-orange-500/20 to-red-500/20', border: 'border-orange-500/20', accent: 'text-orange-400' },
  { label: 'Relaxation', icon: Sunset, desc: 'Beaches, spas & peaceful stays', gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/20', accent: 'text-blue-400' },
  { label: 'Cultural', icon: Compass, desc: 'History, art & local life', gradient: 'from-purple-500/20 to-pink-500/20', border: 'border-purple-500/20', accent: 'text-purple-400' },
  { label: 'Food & Drink', icon: UtensilsCrossed, desc: 'Culinary journeys & food spots', gradient: 'from-yellow-500/20 to-orange-500/20', border: 'border-yellow-500/20', accent: 'text-yellow-400' },
  { label: 'Nature', icon: Leaf, desc: 'Mountains, forests & wildlife', gradient: 'from-green-500/20 to-emerald-500/20', border: 'border-green-500/20', accent: 'text-green-400' },
  { label: 'Nightlife', icon: Music, desc: 'Clubs, bars & entertainment', gradient: 'from-pink-500/20 to-purple-500/20', border: 'border-pink-500/20', accent: 'text-pink-400' },
]

const trending = [
  { name: 'Bali', country: 'Indonesia', tag: 'Tropical Paradise', gradient: 'from-orange-400/20 to-pink-500/20', border: 'border-orange-400/20' },
  { name: 'Paris', country: 'France', tag: 'City of Love', gradient: 'from-blue-400/20 to-purple-500/20', border: 'border-blue-400/20' },
  { name: 'Tokyo', country: 'Japan', tag: 'Tech & Tradition', gradient: 'from-red-400/20 to-pink-500/20', border: 'border-red-400/20' },
  { name: 'Santorini', country: 'Greece', tag: 'Island Dreams', gradient: 'from-cyan-400/20 to-blue-500/20', border: 'border-cyan-400/20' },
  { name: 'New York', country: 'USA', tag: 'The Big Apple', gradient: 'from-yellow-400/20 to-orange-500/20', border: 'border-yellow-400/20' },
  { name: 'Dubai', country: 'UAE', tag: 'Luxury & Desert', gradient: 'from-amber-400/20 to-yellow-500/20', border: 'border-amber-400/20' },
]

const tips = [
  'Always carry a portable charger when exploring new cities.',
  'Book flights on Tuesdays for the best deals.',
  'Learn 5 basic phrases in the local language — locals love it.',
  'Travel insurance is always worth it — never skip it.',
  'The best food is always where locals eat, not tourists.',
  'Pack light — you can always buy things you forget.',
  'Screenshot your hotel address in the local language before arriving.',
]

function Dashboard() {
  const navigate = useNavigate()
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const tip = tips[new Date().getDay() % tips.length]
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'

  useEffect(() => {
    const token = localStorage.getItem('token')
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  const handleMoodPlan = (mood) => {
    navigate('/plan', { state: { travelStyle: mood } })
  }

  const handleTrendingPlan = (dest) => {
    navigate('/plan', { state: { destination: `${dest.name}, ${dest.country}` } })
  }

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden"
    >
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[45%] w-[300px] h-[300px] bg-pink-600 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 relative z-10 border-b border-white/5">
        <span
          onClick={() => navigate('/')}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2"
        >
          <Plane size={20} className="text-purple-400" />
          Wandr<span className="text-purple-400">AI</span>
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/saved')}
            className="flex items-center gap-2 text-white/50 hover:text-white text-xs md:text-sm transition-colors duration-200"
          >
            <Bookmark size={14} />
            <span className="hidden sm:inline">Saved Trips</span>
          </button>
          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs md:text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
          >
            <Plus size={14} />
            New Trip
          </button>
          <button onClick={handleLogout} className="text-white/40 hover:text-white transition-colors duration-200">
            <LogOut size={16} />
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-6 py-8 md:py-12 space-y-12 md:space-y-16">

        {/* Greeting + CTA */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-white/40 text-sm mb-2 tracking-widest uppercase">{greeting}</p>
            <h1
              style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
              className="text-4xl md:text-6xl font-black mb-3"
            >
              {user.name?.split(' ')[0]}
            </h1>
            <p className="text-white/50 text-base max-w-md">
              Where are you heading next? Let AI craft your perfect trip in seconds.
            </p>
          </div>
          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg shadow-purple-900/40 hover:scale-105 transition-all duration-200 self-start md:self-auto"
          >
            <Sparkles size={18} />
            Plan a Trip
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { icon: <Map size={18} className="text-purple-400" />, label: 'Trips Planned', value: loading ? '-' : trips.length },
            { icon: <MapPin size={18} className="text-pink-400" />, label: 'Destinations', value: loading ? '-' : new Set(trips.map(t => t.destination)).size },
            { icon: <Calendar size={18} className="text-blue-400" />, label: 'Days Planned', value: loading ? '-' : trips.reduce((acc, t) => acc + (t.days || 0), 0) },
            { icon: <Users size={18} className="text-green-400" />, label: 'People Traveled', value: loading ? '-' : trips.reduce((acc, t) => acc + (t.people || 0), 0) },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 md:p-5 hover:bg-white/8 transition-all duration-200">
              <div className="mb-3">{stat.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl md:text-4xl font-black text-white mb-1">
                {stat.value}
              </div>
              <div className="text-white/40 text-xs">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Travel Tip */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-5 md:p-6 flex items-start gap-4">
          <div className="bg-purple-500/20 rounded-xl p-2.5 mt-0.5 shrink-0">
            <Lightbulb size={18} className="text-purple-400" />
          </div>
          <div>
            <p className="text-purple-400 text-xs font-semibold uppercase tracking-widest mb-1.5">Travel Tip of the Day</p>
            <p className="text-white/70 text-sm leading-relaxed">{tip}</p>
          </div>
        </div>

        {/* Plan by Mood */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl md:text-3xl font-black">
                Plan by Mood
              </h2>
              <p className="text-white/40 text-xs mt-1">AI picks the best itinerary for your vibe</p>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4">
            {moods.map((mood, i) => {
              const Icon = mood.icon
              return (
                <button
                  key={i}
                  onClick={() => handleMoodPlan(mood.label)}
                  className={`bg-gradient-to-br ${mood.gradient} border ${mood.border} rounded-2xl p-4 md:p-5 text-left hover:scale-105 hover:brightness-110 transition-all duration-200 group`}
                >
                  <Icon size={24} className={`${mood.accent} mb-3`} />
                  <h3 className="text-white font-semibold text-sm md:text-base mb-1">{mood.label}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{mood.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Trending Destinations */}
        <div>
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl md:text-3xl font-black">
                Trending Destinations
              </h2>
              <p className="text-white/40 text-xs mt-1">Click any destination to plan instantly</p>
            </div>
            <TrendingUp size={18} className="text-white/20" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {trending.map((dest, i) => (
              <button
                key={i}
                onClick={() => handleTrendingPlan(dest)}
                className={`relative bg-gradient-to-br ${dest.gradient} border ${dest.border} rounded-2xl p-5 md:p-6 text-left hover:scale-105 hover:brightness-110 transition-all duration-200 group`}
              >
                <div className="flex items-center gap-2 text-white/50 text-xs mb-3">
                  <MapPin size={12} />
                  {dest.tag}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-black text-white">
                  {dest.name}
                </h3>
                <p className="text-white/40 text-xs mt-1 mb-4">{dest.country}</p>
                <div className="flex items-center gap-1 text-white/50 text-xs group-hover:text-white/80 transition-colors duration-200">
                  <Plus size={12} />
                  Plan this trip
                  <ArrowRight size={12} className="ml-1" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Saved Trips Summary */}
        {!loading && trips.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-6">
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl md:text-3xl font-black">
                  Recent Trips
                </h2>
                <p className="text-white/40 text-xs mt-1">Your latest saved itineraries</p>
              </div>
              <button
                onClick={() => navigate('/saved')}
                className="flex items-center gap-1 text-purple-400 hover:text-purple-300 text-xs transition-colors duration-200"
              >
                View all <ArrowRight size={12} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {trips.slice(0, 3).map((trip) => (
                <div
                  key={trip._id}
                  onClick={() => {
                    localStorage.setItem('currentItinerary', JSON.stringify(trip.itinerary))
                    navigate('/itinerary')
                  }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer group"
                >
                  <div className="flex items-center gap-2 text-purple-400 mb-2">
                    <Bookmark size={14} />
                    <span className="text-xs uppercase tracking-wide font-medium">Saved</span>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-xl font-black text-white mb-3 group-hover:text-purple-300 transition-colors duration-200">
                    {trip.destination}
                  </h3>
                  <div className="flex gap-2 flex-wrap">
                    <span className="flex items-center gap-1 bg-white/10 text-white/50 text-xs px-3 py-1 rounded-full">
                      <Calendar size={10} /> {trip.days} Days
                    </span>
                    <span className="flex items-center gap-1 bg-white/10 text-white/50 text-xs px-3 py-1 rounded-full">
                      <Wallet size={10} /> {trip.budget}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state if no trips */}
        {!loading && trips.length === 0 && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center">
            <Compass size={40} className="text-white/20 mx-auto mb-4" />
            <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-black mb-2">No trips yet!</h3>
            <p className="text-white/40 text-sm mb-6">Plan your first AI generated trip and save it here.</p>
            <button
              onClick={() => navigate('/plan')}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm px-6 py-3 rounded-full mx-auto hover:scale-105 transition-all duration-200"
            >
              <Plus size={16} />
              Plan your first trip
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

export default Dashboard