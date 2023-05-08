import React, { useEffect, useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./MapContainer.css";

const MapContainer = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBcbQOenBrouiGdjYHHIpHvAD9Lzxn3K84",
  });
  const { nameCountry } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const response = await axios(
          `https://restcountries.com/v3.1/name/${nameCountry}`
        );
        setCountry(response.data[0]);
      } catch (error) {
        console.error(error);
        setCountry("Error");
      }
    }
    fetchCountry();
  }, [nameCountry]);

  if (!country) {
    return <div>Loading...</div>;
  }

  if (country === "Error") {
    return <div>There was an error loading the country.</div>;
  }

  const defaultCenter = {
    lat: country.latlng[0],
    lng: country.latlng[1],
  };
  console.log(country.latlng[0])

  return (
    <div className="map_container">
      {isLoaded && (
        <GoogleMap mapContainerClassName="map" zoom={7} center={defaultCenter}>
          <Marker position={defaultCenter} />
        </GoogleMap>
      )}
    </div>
  );
};

export default MapContainer;
