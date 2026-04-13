import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <p className="text-white text-sm">Loading map...</p>;

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={{ lat: 28.6139, lng: 77.2090 }} // Delhi for now
      zoom={10}
    >
      <Marker position={{ lat: 28.6139, lng: 77.2090 }} />
    </GoogleMap>
  );
};

export default Map;