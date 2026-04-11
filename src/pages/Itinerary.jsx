import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  MapPin, Calendar, Users, Wallet, Compass,
  Sun, Coffee, Moon, UtensilsCrossed, Lightbulb,
  Plane, Save, ArrowLeft, Star
} from 'lucide-react'

function Itinerary() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [activeDay, setActiveDay] = useState(0)

  useEffect(() => {
    const stored = localStorage.getItem('currentItinerary')
    if (!stored) {
      navigate('/plan')
      return
    }
    setData(JSON.parse(stored))
  }, [])

  if (!data) return null

  const day = data.itinerary[activeDay]

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white relative overflow-hidden"
    >

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600 opacity-20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 relative z-10">
        <span
          onClick={() => navigate('/')}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2"
        >
          <Plane size={22} className="text-purple-400" />
          Wandr<span className="text-purple-400">AI</span>
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-2 text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            <ArrowLeft size={16} />
            Plan New Trip
          </button>
          <button
            className="flex items-center gap-2 bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
          >
            <Save size={14} />
            Save Trip
          </button>
        </div>
      </nav>

      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-24">

        {/* Trip Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
            <Star size={12} />
            Your AI Generated Itinerary
          </div>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
            className="text-5xl md:text-6xl font-black mb-4"
          >
            {data.destination}
          </h1>

          {/* Trip Info Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              { icon: <Calendar size={14} />, text: `${data.days} Days` },
              { icon: <Users size={14} />, text: `${data.people} People` },
              { icon: <Wallet size={14} />, text: data.budget },
              { icon: <Compass size={14} />, text: data.travelStyle },
            ].map((pill, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-white/10 border border-white/10 text-white/70 text-sm px-4 py-2 rounded-full"
              >
                {pill.icon}
                {pill.text}
              </div>
            ))}
          </div>
        </div>

        {/* Day Selector */}
        <div className="flex gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {data.itinerary.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeDay === i
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg shadow-purple-900/40'
                  : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>

        {/* Day Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 mb-6">
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-3xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          >
            {day.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Morning */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">
                <Coffee size={18} />
                <span className="text-sm font-semibold uppercase tracking-wide">Morning</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.morning}</p>
            </div>

            {/* Afternoon */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-orange-400 mb-3">
                <Sun size={18} />
                <span className="text-sm font-semibold uppercase tracking-wide">Afternoon</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.afternoon}</p>
            </div>

            {/* Evening */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-blue-400 mb-3">
                <Moon size={18} />
                <span className="text-sm font-semibold uppercase tracking-wide">Evening</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.evening}</p>
            </div>

            {/* Food */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-2 text-pink-400 mb-3">
                <UtensilsCrossed size={18} />
                <span className="text-sm font-semibold uppercase tracking-wide">Food</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.food}</p>
            </div>

          </div>

          {/* Tips */}
          <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <Lightbulb size={18} />
              <span className="text-sm font-semibold uppercase tracking-wide">Tips for the Day</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{day.tips}</p>
          </div>
        </div>

        {/* General Tips & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-green-400 mb-3">
              <Lightbulb size={18} />
              <span className="text-sm font-semibold uppercase tracking-wide">General Tips</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{data.generalTips}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-2 text-yellow-400 mb-3">
              <Wallet size={18} />
              <span className="text-sm font-semibold uppercase tracking-wide">Estimated Budget</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{data.estimatedBudget}</p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Itinerary