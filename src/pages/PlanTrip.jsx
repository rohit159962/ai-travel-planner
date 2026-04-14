import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateItinerary } from "../utils/gemini";
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Compass,
  ArrowRight,
  Plane,
} from "lucide-react";
import Loader from "../components/Loader";
import useTripStore from "../store/useTripStore";

function PlanTrip() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripData, setTripData } = useTripStore();


  useEffect(() => {
    if (location.state?.destination) {
      setForm((prev) => ({ ...prev, destination: location.state.destination }));
    }
    if (location.state?.travelStyle) {
      setForm((prev) => ({ ...prev, travelStyle: location.state.travelStyle }));
    }
  }, [location.state]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    destination: "",
    days: "",
    budget: "",
    travelStyle: "",
    people: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.destination ||
      !form.days ||
      !form.budget ||
      !form.travelStyle ||
      !form.people
    ) {
      alert("Please fill in all fields!");
      return;
    }

    setLoading(true);

    try {
      const result = await generateItinerary(form);

      const finalData = result.data || result;

      // Save to localStorage
      localStorage.setItem("currentItinerary", JSON.stringify(finalData));

      //  SAVE TO ZUSTAND
      setTripData(finalData);

      navigate("/itinerary");
    } catch (error) {
      console.error(error);

      // const fallback = {
      //   destination: form.destination,
      //   days: form.days,
      //   people: form.people,
      //   budget: form.budget,
      //   travelStyle: form.travelStyle,
      //   itinerary: [
      //     {
      //       day: 1,
      //       title: "Sample Day",
      //       morning: "Explore nearby attractions",
      //       afternoon: "Visit popular places",
      //       evening: "Relax and enjoy local vibe",
      //       food: "Try local cuisine",
      //       tips: "Stay hydrated and plan ahead"
      //     }
      //   ],
      //   generalTips: "AI unavailable due to quota. Showing sample itinerary.",
      //   estimatedBudget: "₹10,000 - ₹20,000"
      // }

      // localStorage.setItem('currentItinerary', JSON.stringify(fallback))

      navigate("/itinerary");
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loader />;

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
          onClick={() => navigate("/")}
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2"
        >
          <Plane size={20} className="text-purple-400" />
          Wandr<span className="text-purple-400">AI</span>
        </span>
      </nav>

      {/* Form */}
      <div className="relative z-10 flex flex-col items-center px-4 md:px-6 pt-8 md:pt-10 pb-16 md:pb-24">
        <div className="inline-block bg-white/10 border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-5 tracking-widest uppercase">
          Plan Your Trip
        </div>

        <h1
          style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-black text-center mb-3 md:mb-4"
        >
          Where do you want to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            explore?
          </span>
        </h1>

        <p className="text-white/50 text-sm md:text-base mb-8 md:mb-12 text-center max-w-md font-light">
          Fill in the details below and our AI will generate a personalized
          itinerary for you.
        </p>

        <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl md:rounded-3xl p-6 md:p-10 flex flex-col gap-5 md:gap-6">
          {/* Destination */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm font-medium tracking-wide flex items-center gap-2">
              <MapPin size={14} /> Destination
            </label>
            <input
              type="text"
              name="destination"
              value={form.destination}
              onChange={handleChange}
              placeholder="e.g. Paris, France"
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm md:text-base"
            />
          </div>

          {/* Days and People */}
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-xs md:text-sm font-medium tracking-wide flex items-center gap-2">
                <Calendar size={14} /> Number of Days
              </label>
              <input
                type="number"
                name="days"
                value={form.days}
                onChange={handleChange}
                placeholder="e.g. 5"
                min="1"
                max="30"
                className="bg-white/10 border border-white/10 rounded-xl px-3 md:px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/60 text-xs md:text-sm font-medium tracking-wide flex items-center gap-2">
                <Users size={14} /> Number of People
              </label>
              <input
                type="number"
                name="people"
                value={form.people}
                onChange={handleChange}
                placeholder="e.g. 2"
                min="1"
                className="bg-white/10 border border-white/10 rounded-xl px-3 md:px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm font-medium tracking-wide flex items-center gap-2">
              <Wallet size={14} /> Budget
            </label>
            <select
              name="budget"
              value={form.budget}
              onChange={handleChange}
              className="bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors duration-200 text-sm md:text-base"
            >
              <option value="" className="bg-[#0a0a0f]">
                Select your budget
              </option>
              <option value="budget" className="bg-[#0a0a0f]">
                Budget (Under $50/day)
              </option>
              <option value="moderate" className="bg-[#0a0a0f]">
                Moderate ($50–$150/day)
              </option>
              <option value="luxury" className="bg-[#0a0a0f]">
                Luxury ($150+/day)
              </option>
            </select>
          </div>

          {/* Travel Style */}
          <div className="flex flex-col gap-2">
            <label className="text-white/60 text-sm font-medium tracking-wide flex items-center gap-2">
              <Compass size={14} /> Travel Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
              {[
                "Adventure",
                "Cultural",
                "Relaxation",
                "Food & Drink",
                "Nature",
                "Nightlife",
              ].map((style) => (
                <button
                  key={style}
                  onClick={() => setForm({ ...form, travelStyle: style })}
                  className={`py-2 px-3 md:px-4 rounded-xl text-xs md:text-sm font-medium border transition-all duration-200 ${
                    form.travelStyle === style
                      ? "bg-purple-500 border-purple-500 text-white"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 text-white font-semibold text-sm md:text-base py-3 md:py-4 rounded-full shadow-lg shadow-purple-900/40 hover:scale-105 transition-all duration-200 mt-2"
          >
            Generate Itinerary
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlanTrip;
