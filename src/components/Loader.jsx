import { useEffect, useState } from "react";
import { Globe, Map, UtensilsCrossed, Hotel, Sparkles } from "lucide-react";

const steps = [
  {
    icon: <Globe size={28} className="text-purple-300" />,
    text: "Analyzing your destination...",
  },
  {
    icon: <Map size={28} className="text-pink-300" />,
    text: "Mapping out the best routes...",
  },
  {
    icon: <UtensilsCrossed size={28} className="text-blue-300" />,
    text: "Finding hidden food gems...",
  },
  {
    icon: <Hotel size={28} className="text-purple-300" />,
    text: "Scouting perfect stays...",
  },
  {
    icon: <Sparkles size={28} className="text-pink-300" />,
    text: "Crafting your itinerary...",
  },
];

function Loader() {
  const [stepIndex, setStepIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % steps.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Ambient background blobs */}
      <div className="absolute top-[-150px] left-[-150px] w-[500px] h-[500px] bg-purple-700 opacity-25 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-blue-600 opacity-25 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute top-[40%] left-[45%] w-[250px] h-[250px] bg-pink-600 opacity-10 rounded-full blur-[100px] pointer-events-none" />

      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Orbiting ring */}
      <div className="relative flex items-center justify-center mb-12">
        {/* Outer glow ring */}
        <div className="absolute w-36 h-36 rounded-full border border-purple-500/20 animate-ping" />
        <div className="absolute w-28 h-28 rounded-full border border-purple-400/30" />

        {/* Orbiting dots */}
        {[0, 1, 2, 3].map((i) => {
          const animationClass = [
            "animate-orbit",
            "animate-orbit-1",
            "animate-orbit-2",
            "animate-orbit-3",
          ][i];
          return (
            <div
              key={i}
              className={`absolute w-3 h-3 rounded-full ${animationClass}`}
              style={{
                background:
                  i % 2 === 0
                    ? "linear-gradient(135deg, #a855f7, #ec4899)"
                    : "linear-gradient(135deg, #3b82f6, #a855f7)",
                transformOrigin: "0 56px",
                top: "50%",
                left: "50%",
                marginTop: "-6px",
                marginLeft: "-6px",
              }}
            />
          );
        })}

        {/* Center icon */}
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-4xl relative z-10"
          style={{
            background:
              "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
            border: "1px solid rgba(168,85,247,0.3)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center relative z-10"
            style={{
              background:
                "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(236,72,153,0.2))",
              border: "1px solid rgba(168,85,247,0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease" }}
            >
              {steps[stepIndex].icon}
            </div>
          </div>
        </div>
      </div>

      {/* Title */}
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          lineHeight: 1.1,
        }}
        className="text-4xl font-black text-white text-center mb-4"
      >
        Building your{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
          perfect trip
        </span>
      </h2>

      {/* Cycling status text */}
      <p
        className="text-white/50 text-sm font-light text-center mb-10 h-5 transition-all duration-300"
        style={{ opacity: fade ? 1 : 0, transition: "opacity 0.3s ease" }}
      >
        {steps[stepIndex].text}
      </p>

      {/* Progress bar */}
      <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full animate-progress"
          style={{
            background: "linear-gradient(90deg, #a855f7, #ec4899)",
          }}
        />
      </div>
    </div>
  );
}

export default Loader;
