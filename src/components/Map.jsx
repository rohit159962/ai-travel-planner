import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';

const Map = ({ places = [], destination }) => { 
  const [mappedPlaces, setMappedPlaces] = useState([]); 
  const [center, setCenter] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });


  const fetchCoords = async (placeName) => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${placeName}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );
      const data = await res.json();
      return data.results[0]?.geometry.location;
    } catch (err) {
      console.error("Geocode error:", err);
      return null;
    }
  };

  //  Load coordinates
  useEffect(() => {
    if (!places || places.length === 0) return;

    const loadPlaces = async () => {
      const updated = await Promise.all(
        places.map(async (p) => {
          const coords = await fetchCoords(p.name);
          return { ...p, coords };
        })
      );

      setMappedPlaces(updated.filter(p => p.coords)); // remove invalid ones
    };

    loadPlaces();
  }, [places]);
  useEffect(() => {
  if (!destination) return;

  const fetchCenter = async () => {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${destination}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
      );

      const data = await res.json();
      const location = data.results[0]?.geometry.location;

      if (location) {
        setCenter(location);
      }
    } catch (err) {
      console.error("Center fetch error:", err);
    }
  };

  fetchCenter();
}, [destination]);

  if (!isLoaded) return <p className="text-white text-sm">Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={
  center || mappedPlaces[0]?.coords || { lat: 28.6139, lng: 77.2090 }
}
      zoom={center ? 12 : 5}
    >
      {mappedPlaces.map((place, i) => (
        <Marker key={i} position={place.coords} />
      ))}
    </GoogleMap>
  );
};

export default Map;