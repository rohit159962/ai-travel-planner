import { useNavigate } from 'react-router-dom'
import { Plane, Calendar, Save, ArrowRight, Sparkles } from 'lucide-react'

function Home() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative">

      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-blue-600 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-pink-600 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 relative z-10">
        <span
  onClick={() => navigate("/")}
  style={{ fontFamily: "'Playfair Display', serif" }}
  className="text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2"
>
  <Plane size={22} className="text-purple-400" />
  Wandr<span className="text-purple-400">AI</span>
</span>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200"
          >
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-20 pb-10">

        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <Sparkles size={12} />
          Powered by Google Gemini AI
        </div>

        <h1
          style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          className="text-6xl md:text-8xl font-black mb-6 tracking-tight"
        >
          Travel Smarter.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Plan Faster.
          </span>
        </h1>

        <p className="text-white/50 text-lg md:text-xl max-w-xl mb-10 font-light leading-relaxed">
          Describe your dream destination and let AI craft a perfect day-by-day itinerary tailored just for you.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <button
            onClick={() => navigate('/plan')}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-base px-8 py-4 rounded-full shadow-lg shadow-purple-900/40 hover:scale-105 transition-all duration-200"
          >
            Start Planning for Free
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 mt-24 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 pb-24">
        {[
          {
            icon: <Sparkles size={28} className="text-purple-400" />,
            title: 'AI Generated',
            desc: 'Powered by Gemini AI to create smart, personalized travel plans in seconds.'
          },
          {
            icon: <Calendar size={28} className="text-pink-400" />,
            title: 'Day by Day',
            desc: 'Get a detailed breakdown of activities, food spots, and tips for every day.'
          },
          {
            icon: <Save size={28} className="text-blue-400" />,
            title: 'Save & Revisit',
            desc: 'All your itineraries saved in one place, ready whenever you need them.'
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors duration-200"
            >
              {feature.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">{feature.desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default Home