import React, { useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
  Marker
} from "@react-google-maps/api";
  const MAPS_ID=
  "AIzaSyBSgJ8YkO7z94BQvUMufPiQ7WU8EeI9nL0";
const libraries = ["places"];
const options = {
  componentRestrictions: { country: "ph" }, // Restrict to Philippines
};

const LocationPicker = ({ onAddressSelect }) => {
  const searchBoxRef = useRef(null);
  const [location, setLocation] = React.useState({
    lat: 6.5244,
    lng: 3.3792
  });

  const handlePlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const place = places[0];
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLocation({ lat, lng });
      onAddressSelect(address); // Update parent component
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={MAPS_ID}
      libraries={libraries}
    >
      <div className="mb-4">
        <StandaloneSearchBox
          onLoad={(ref) => (searchBoxRef.current = ref)}
          onPlacesChanged={handlePlacesChanged}
          options={options}
        >
          <input
            type="text"
            placeholder="Search your location"
            className="w-full px-3 py-2 border rounded mb-3"
          />
        </StandaloneSearchBox>

        <GoogleMap
          center={location}
          zoom={14}
          mapContainerStyle={{ width: "100%", height: "300px" }}
        >
          <Marker position={location} />
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default LocationPicker;
