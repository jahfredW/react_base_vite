// import{ useEffect, useState} from "react";
// import L from "leaflet";

// function Home() {

//   const [lat, setLat] = useState(null);
//   const [long, setLong] = useState(null);

//   useEffect(() => {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     setLat(position.coords.latitude);
//     setLong(position.coords.longitude);
//   })
// })

//   return (
//     <>
//     <h1 className="text-3xl font-bold underline text-center text-red-500">Bienvenue</h1> 
//     <div>votre lattitude: { lat }</div>
//     <div>votre lattitude: { long }</div>
//     </>
    
//   );
// }

// export default Home;

import React, { useEffect, useState, useCallback } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapWithUserLocation() {
  const [map, setMap] = useState(null);
  

  // Utiliser le useCallback pour définir successCallback
  const successCallback = useCallback((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Créer la carte si elle n'existe pas déjà
    if (!map) {
      const mapInstance = L.map("map").setView([latitude, longitude], 13);
      setMap(mapInstance);

      // Ajouter une couche de tuile de carte (par exemple, OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(mapInstance);

      // Ajouter un marqueur pour la position de l'utilisateur
      L.marker([latitude, longitude]).addTo(mapInstance);
    }
  }, [map]);

  useEffect(() => {
    // Récupérer la géolocalisation de l'utilisateur
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, [successCallback]);

  function errorCallback(error) {
    console.error(`Error code: ${error.code}, Error message: ${error.message}`);
  }

  return (
    <div className="bg-slate-100 h-max">
      <div className="w-1/2 mx-auto shadow-lg rounded" id="map" style={{ height: "400px" }}></div>
    </div>
  
  );
}

export default MapWithUserLocation;




