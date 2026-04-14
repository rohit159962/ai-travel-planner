import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  Wallet,
  Compass,
  Sun,
  Coffee,
  Moon,
  UtensilsCrossed,
  Lightbulb,
  Plane,
  Save,
  ArrowLeft,
  Star,
  Sparkles,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getDestinationPhoto } from "../utils/photos";
import useTripStore from "../store/useTripStore";
const timeSlots = [
  {
    key: "morning",
    label: "Morning",
    icon: Coffee,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10 border-yellow-400/20",
    variant: "morning",
  },
  {
    key: "afternoon",
    label: "Afternoon",
    icon: Sun,
    color: "text-orange-400",
    bg: "bg-orange-400/10 border-orange-400/20",
    variant: "afternoon",
  },
  {
    key: "evening",
    label: "Evening",
    icon: Moon,
    color: "text-blue-400",
    bg: "bg-blue-400/10 border-blue-400/20",
    variant: "evening",
  },
  {
    key: "food",
    label: "Food & Drink",
    icon: UtensilsCrossed,
    color: "text-pink-400",
    bg: "bg-pink-400/10 border-pink-400/20",
    variant: "food",
  },
];

function Itinerary() {
  const navigate = useNavigate();
  const { saveTrip } = useTripStore();
  const [data, setData] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [heroLoaded, setHeroLoaded] = useState(false);




const { setTripData } = useTripStore();

useEffect(() => {
  const stored = localStorage.getItem("currentItinerary");

  if (!stored) {
    navigate("/plan");
    return;
  }

  const parsed = JSON.parse(stored);
  const finalData = parsed.data || parsed;

  setData(finalData);      
  setTripData(finalData);  
}, []);


  useEffect(() => {
    setHeroLoaded(false);
    setTimeout(() => setHeroLoaded(true), 100);
  }, [activeDay]);

 if (!data || !data.itinerary) {
  return <p className="text-white p-6">Loading itinerary...</p>;
}

  const day = data.itinerary[activeDay];
  const heroPhoto = getDestinationPhoto(data.destination, "hero");
  const dayPhoto = getDestinationPhoto(data.destination, `day-${day.day}`);

  const handleSave = async () => {
    setSaving(true);
    const success = await saveTrip(data);
    if (success) setSaved(true);
    else alert("Please login to save trips!");
    setSaving(false);
  };

  const handlePrevDay = () => setActiveDay((prev) => Math.max(0, prev - 1));
  const handleNextDay = () =>
    setActiveDay((prev) => Math.min(data.itinerary.length - 1, prev + 1));

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] text-white"
    >
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src={heroPhoto}
          alt={data.destination}
          onLoad={() => setHeroLoaded(true)}
          className={`absolute inset-0 w-full h-full object-cover scale-105 transition-all duration-1000 ${heroLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        />

        {/* Layered overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/60 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[#0a0a0f]/20" />

        {/* Navbar */}
        <nav className="absolute top-0 left-0 right-0 flex justify-between items-center px-6 md:px-10 py-5 z-10">
          <span
            onClick={() => navigate("/")}
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-xl md:text-2xl font-black tracking-tight text-white cursor-pointer flex items-center gap-2 drop-shadow-lg"
          >
            <Plane size={20} className="text-purple-400" />
            Wandr<span className="text-purple-400">AI</span>
          </span>
          <div className="flex gap-2 md:gap-3">
            <button
              onClick={() => navigate("/plan")}
              className="flex items-center gap-1 md:gap-2 bg-black/40 backdrop-blur-md border border-white/20 hover:bg-black/60 text-white text-xs md:text-sm font-medium px-3 md:px-4 py-2 rounded-full transition-all duration-200"
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">New Trip</span>
            </button>
            <button
              onClick={handleSave}
              disabled={saving || saved}
              className="flex items-center gap-1 md:gap-2 bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-60 text-white text-xs md:text-sm font-medium px-3 md:px-5 py-2 rounded-full transition-all duration-200 hover:scale-105 shadow-lg shadow-purple-900/40"
            >
              <Save size={14} />
              {saved ? (
                "Saved!"
              ) : saving ? (
                "Saving..."
              ) : (
                <>
                  <span className="hidden sm:inline">Save Trip</span>
                  <span className="sm:hidden">Save</span>
                </>
              )}
            </button>
          </div>
        </nav>

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-10 md:pb-16">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white/70 text-xs font-medium px-4 py-1.5 rounded-full mb-4 tracking-widest uppercase">
            <Star size={12} />
            AI Generated Itinerary
          </div>
          <h1
            style={{ fontFamily: "'Playfair Display', serif", lineHeight: 1.0 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-5"
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
                className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full"
              >
                {pill.icon}
                {pill.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-24">
        {/* Day Navigation */}
        <div className="sticky top-0 bg-[#0a0a0f]/90 backdrop-blur-md z-20 py-4 mb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrevDay}
              disabled={activeDay === 0}
              className="p-2 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-all duration-200"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide flex-1">
              {data.itinerary.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setActiveDay(i)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium border transition-all duration-200 ${
                    activeDay === i
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 border-transparent text-white shadow-lg shadow-purple-900/40"
                      : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  Day {d.day}
                </button>
              ))}
            </div>
            <button
              onClick={handleNextDay}
              disabled={activeDay === data.itinerary.length - 1}
              className="p-2 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 transition-all duration-200"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Day Header with Photo */}
        <div className="relative rounded-3xl overflow-hidden mb-8 h-48 md:h-64">
          <img
            src={dayPhoto}
            alt={day.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <span className="text-white/50 text-xs uppercase tracking-widest">
              Day {day.day}
            </span>
            <h2
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl md:text-4xl font-black text-white mt-1"
            >
              {day.title}
            </h2>
          </div>
        </div>


        {/* Time Slots with Photos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            const slotPhoto = getDestinationPhoto(
              data.destination,
              `${slot.variant}-day${day.day}`,
            );
            return (
              <div
                key={slot.key}
                className={`rounded-2xl border overflow-hidden ${slot.bg}`}
              >
                {/* Slot Photo */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={slotPhoto}
                    alt={slot.label}
                    className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/90 to-transparent" />
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <Icon size={16} className={slot.color} />
                    <span
                      className={`text-xs font-semibold uppercase tracking-wide ${slot.color}`}
                    >
                      {slot.label}
                    </span>
                  </div>
                </div>
                {/* Slot Content */}
                <div className="p-4">
                  <p className="text-white/70 text-sm leading-relaxed">
                    {day[slot.key]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

{/* Places to Visit */}
<div className="mb-10">
  <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
    <MapPin className="text-purple-400" size={20} />
    Top Places to Visit
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {day?.placesToVisit?.map((place, i) => (
      <div
        key={i}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
      >
        <h3 className="text-white font-semibold text-lg mb-2">
          {place.name}
        </h3>

        <p className="text-white/60 text-sm mb-3 leading-relaxed">
          {place.description}
        </p>

        <div className="flex justify-between text-xs text-white/40">
          <span>🕒 {place.bestTime}</span>
          <span>🎟 {place.entryFee}</span>
        </div>
      </div>
    ))}
  </div>
  {!day?.placesToVisit?.length && (
  <p className="text-white/50">No places available</p>
)}
</div>


        {/* Tips */}
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl overflow-hidden mb-6">
          <div className="relative h-24 overflow-hidden">
            <img
              src={getDestinationPhoto(data.destination, "tips")}
              alt="tips"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent" />
            <div className="absolute inset-0 flex items-center px-6 gap-3">
              <Lightbulb size={20} className="text-purple-400" />
              <span className="text-purple-300 text-sm font-semibold uppercase tracking-widest">
                Tips for the Day
              </span>
            </div>
          </div>
          <div className="p-6">
            <p className="text-white/70 text-sm leading-relaxed">{day.tips}</p>
          </div>
        </div>

   {/* General Tips */}
<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col gap-4 mb-6">
          <div className="relative h-20 overflow-hidden flex-shrink-0">
            <img
              src={getDestinationPhoto(data.destination, "general")}
              alt="general tips"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 to-transparent" />
            <div className="absolute inset-0 flex items-center px-5 gap-2">
              <Sparkles size={16} className="text-green-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-green-400">
                General Tips
              </span>
            </div>
          </div>
          <div className="p-5 flex-1">
            <p className="text-white/70 text-sm leading-relaxed">
              {data.generalTips}
            </p>
          </div>
        </div>

 {/* Hotels */}
<div className="mb-10">
  <h2 className="text-2xl font-bold mb-5 flex items-center gap-2">
    <Star className="text-yellow-400" size={20} />
    Recommended Hotels
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {data?.hotels?.map((hotel, i) => (
      <div
        key={i}
        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300"
      >
        <h3 className="text-white font-semibold text-lg mb-1">
          {hotel.name}
        </h3>

        <p className="text-purple-400 text-sm mb-2">
          {hotel.type}
        </p>

        <p className="text-white/60 text-sm mb-3">
          {hotel.description}
        </p>

        <div className="flex justify-between text-xs text-white/40">
          <span>{hotel.priceRange}</span>
          <span>⭐ {hotel.highlights}</span>
        </div>
      </div>
    ))}
  </div>
</div>

     {/* Estimated Budget */}
<div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden flex flex-col gap-4 mb-6">
          <div className="relative h-20 overflow-hidden flex-shrink-0">
            <img
              src={getDestinationPhoto(data.destination, "budget")}
              alt="budget"
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f]/90 to-transparent" />
            <div className="absolute inset-0 flex items-center px-5 gap-2">
              <Wallet size={16} className="text-yellow-400" />
              <span className="text-xs font-semibold uppercase tracking-wide text-yellow-400">
                Estimated Budget
              </span>
            </div>
          </div>
          <div className="p-5 flex-1">
            {typeof data.estimatedBudget === "object" ? (
              <div className="flex flex-col gap-2">
                {Object.entries(data.estimatedBudget).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-white/50 capitalize">
                      {key.replace(/_/g, " ")}
                    </span>
                    <span className="text-white/80">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/70 text-sm leading-relaxed">
                {data.estimatedBudget}
              </p>
            )}
          </div>
        </div>
        {/* Day Navigation Bottom */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={handlePrevDay}
            disabled={activeDay === 0}
            className="flex items-center gap-2 bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 text-white text-sm font-medium px-5 py-3 rounded-full transition-all duration-200"
          >
            <ChevronLeft size={16} />
            Previous Day
          </button>
          <span className="text-white/30 text-sm">
            {activeDay + 1} / {data.itinerary.length}
          </span>
          <button
            onClick={handleNextDay}
            disabled={activeDay === data.itinerary.length - 1}
            className="flex items-center gap-2 bg-white/5 border border-white/10 disabled:opacity-30 hover:bg-white/10 text-white text-sm font-medium px-5 py-3 rounded-full transition-all duration-200"
          >
            Next Day
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
    

  );
  
}

export default Itinerary;
