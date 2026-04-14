import { useLocation } from "react-router-dom";
import { MapPin } from "lucide-react";
import Map from "./Map";
import useTripStore from "../store/useTripStore";

function Footer() {
  const location = useLocation();
  const { tripData } = useTripStore();

  const isItineraryPage = location.pathname === "/itinerary";

  return (
    <div className="mt-16 bg-[#0a0a0f] border-t border-white/10 pt-10 pb-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left */}
        <div className="flex flex-col gap-3 text-white/60 text-sm">
          <h3 className="text-white text-lg font-semibold">
            Wandr<span className="text-purple-400">AI</span>
          </h3>
          <p>
            Smart AI-powered travel planner to explore destinations, plan trips,
            and discover places effortlessly.
          </p>
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} WandrAI. All rights reserved.
          </p>
        </div>

        {/* Right */}
        {isItineraryPage && tripData && (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div className="px-4 py-2 flex items-center gap-2">
              <MapPin size={14} className="text-blue-400" />
              <span className="text-xs uppercase text-blue-400 font-semibold">
                Map Preview
              </span>
            </div>

            <div className="h-[180px] rounded-xl overflow-hidden border border-white/10 backdrop-blur-md bg-white/5">
              <Map
                places={tripData?.itinerary?.[0]?.placesToVisit}
                destination={tripData?.destination}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Footer;
