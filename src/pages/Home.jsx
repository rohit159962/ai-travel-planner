import { useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Save,
  ArrowRight,
  Sparkles,
  Plane,
} from "lucide-react";
import useAuthStore from "../store/useAuthStore";

function Home() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden relative"
    >
      {/* Background blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-700 opacity-20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600 opacity-20 rounded-full blur-[120px] pointer-events-none" />

      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-5 relative z-10">
        <span
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2"
        >
          <Plane size={20} className="text-purple-400" />
          Wandr<span className="text-purple-400">AI</span>
        </span>
        <div className="flex gap-2 md:gap-4">
          {user ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs md:text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 hover:scale-105"
            >
              Go to Dashboard
              <ArrowRight size={14} />
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="bg-white/10 border border-white/20 hover:bg-white/20 text-white text-xs md:text-sm font-medium px-3 md:px-5 py-2 rounded-full transition-all duration-200"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-12 md:pt-20 pb-10">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-6 md:mb-8 tracking-widest uppercase">
          <Sparkles size={12} />
          Powered by Google Gemini AI
        </div>

        <h1
          style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 tracking-tight"
        >
          Travel Smarter.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Plan Faster.
          </span>
        </h1>

        <p className="text-white/50 text-base md:text-xl max-w-xl mb-8 md:mb-10 font-light leading-relaxed">
          Describe your dream destination and let AI craft a perfect day-by-day
          itinerary tailored just for you.
        </p>

        <button
          onClick={() => navigate("/plan")}
          className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold text-sm md:text-base px-6 md:px-8 py-3 md:py-4 rounded-full shadow-lg shadow-purple-900/40 hover:scale-105 transition-all duration-200"
        >
          Start Planning for Free
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Feature Cards */}
      <div className="relative z-10 mt-16 md:mt-24 px-6 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 pb-16 md:pb-24">
        {[
          {
            icon: <Sparkles size={28} className="text-purple-400" />,
            title: "AI Generated",
            desc: "Powered by Gemini AI to create smart, personalized travel plans in seconds.",
          },
          {
            icon: <Calendar size={28} className="text-pink-400" />,
            title: "Day by Day",
            desc: "Get a detailed breakdown of activities, food spots, and tips for every day.",
          },
          {
            icon: <Save size={28} className="text-blue-400" />,
            title: "Save & Revisit",
            desc: "All your itineraries saved in one place, ready whenever you need them.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-8 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-lg md:text-xl font-bold mb-2 group-hover:text-purple-300 transition-colors duration-200"
            >
              {feature.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed font-light">
              {feature.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
