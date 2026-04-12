import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Calendar, Users, Wallet, Compass,
  Sun, Coffee, Moon, UtensilsCrossed, Lightbulb,
  Plane, Save, ArrowLeft, Star, Sparkles, MapPin
} from 'lucide-react'
import { getDestinationPhoto } from '../utils/photos'
import useTripStore from '../store/useTripStore'

function Itinerary() {
  const navigate = useNavigate()
  const { saveTrip } = useTripStore()
  const [data, setData] = useState(null)
  const [activeDay, setActiveDay] = useState(0)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('currentItinerary')
    if (!stored) {
      navigate('/plan')
      return
    }
    setData(JSON.parse(stored))
  }, [])

 
   if (!data) return null
   console.log('data:', data)
console.log('itinerary:', data.itinerary)
  const day = data.itinerary[activeDay]

  const photo = getDestinationPhoto(data.destination)

  const handleSave = async () => {
    setSaving(true)
    const success = await saveTrip(data)
    if (success) setSaved(true)
    else alert('Please login to save trips!')
    setSaving(false)
  }

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white"
    >

      {/* Hero Section with Photo */}
      <div className="relative h-[60vh] min-h-[400px] overflow-hidden">

        {/* Photo */}
        <img
          src={photo}
          alt={data.destination}
          onLoad={() => setImgLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/30 to-transparent" />

        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 py-5 z-10">
          <span
            onClick={() => navigate('/')}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2 drop-shadow-lg"
          >
            <Plane size={20} className="text-purple-400" />
            Wandr<span className="text-purple-400">AI</span>
          </span>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => navigate('/plan')}
              className="flex items-center gap-1 md:gap-2 bg-black/30 backdrop-blur-sm border border-white/20 hover:bg-black/50 text-white text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-full transition-all duration-200"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">New Trip</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-60 text-white text-xs md:text-sm font-medium px-3 md:px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              <Save size={14} />
              {saved ? 'Saved!' : saving ? 'Saving...' : (
                <><span className="hidden sm:inline">Save Trip</span><span className="sm:hidden">Save</span></>
              )}
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-8 md:pb-12">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <Star size={12} />
            AI Generated Itinerary
          </div>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black text-white drop-shadow-lg mb-4"
          >
            {data.destination}
          </h1>
          <div className="flex flex-wrap gap-2">
            {[
              { icon: <Calendar size={12} />, text: `${data.days} Days` },
              { icon: <Users size={12} />, text: `${data.people} People` },
              { icon: <Wallet size={12} />, text: data.budget },
              { icon: <Compass size={12} />, text: data.travelStyle },
            ].map((pill, i) => (
              <div
                key={i}
                className="flex items-center gap-1.5 bg-black/30 backdrop-blur-sm border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full"
              >
                {pill.icon}
                {pill.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 md:px-6 pb-16 md:pb-24 mt-8 md:mt-12">

        {/* Day Selector */}
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-3 mb-8 scrollbar-hide">
          {data.itinerary.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveDay(i)}
              className={`flex-shrink-0 px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium border transition-all duration-200 ${
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
        <div className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 mb-4 md:mb-6">
          <h2
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-2xl md:text-3xl font-black mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          >
            {day.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">

            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-yellow-400 mb-3">
                <Coffee size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Morning</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.morning}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-orange-400 mb-3">
                <Sun size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Afternoon</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.afternoon}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-blue-400 mb-3">
                <Moon size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Evening</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.evening}</p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
              <div className="flex items-center gap-2 text-pink-400 mb-3">
                <UtensilsCrossed size={16} />
                <span className="text-xs font-semibold uppercase tracking-wide">Food</span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{day.food}</p>
            </div>

          </div>

          <div className="mt-4 md:mt-6 bg-purple-500/10 border border-purple-500/20 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-2 text-purple-400 mb-3">
              <Lightbulb size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">Tips for the Day</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{day.tips}</p>
          </div>
        </div>

        {/* General Tips & Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-2 text-green-400 mb-3">
              <Sparkles size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">General Tips</span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{data.generalTips}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl md:rounded-2xl p-4 md:p-6">
            <div className="flex items-center gap-2 text-yellow-400 mb-3">
              <Wallet size={16} />
              <span className="text-xs font-semibold uppercase tracking-wide">Estimated Budget</span>
            </div>
            {typeof data.estimatedBudget === 'object' ? (
              <div className="flex flex-col gap-2">
                {Object.entries(data.estimatedBudget).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/50 capitalize">{key.replace(/_/g, ' ')}</span>
                    <span className="text-white/80">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70 text-sm leading-relaxed">{data.estimatedBudget}</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Itinerary