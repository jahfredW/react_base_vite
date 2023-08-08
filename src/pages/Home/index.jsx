import{ useEffect, useState} from "react";
import PollutionMap from "../../components/Maps/PollutionMap";
import DailyForm from "../../components/Forms/DailyForm";
import InstantReport from "../Pollution/InstantReport";



function Home() {

  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  // stockage des coordonnées de la ville sélectionnée dans l'état de home : 
  const [cityCoords, setCityCoords] = useState(null)
  const [cityName, setCityName] = useState(null)

  const handleMapClick = (lat, lng) => {
    // Traitez les coordonnées du clic ici
    console.log('Latitude:', lat);
    console.log('Longitude:', lng);
  };

  const handleCityLocation = (city, coords, cityName) => {
    console.log(city);
    console.log(coords);
    console.log(cityName);
    setCityCoords(coords)
    setCityName(cityName);
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLong(position.coords.longitude);
  })
}, [])
  

  return (
    <>
    <div>
        <DailyForm onVilleChange={ handleCityLocation} className="w-full"/>
    </div>
    <div className="container bg-sky-100 w-full md:w-1/2 mx-auto px-5">
    
    <div className="flex flex-col md:flex-row justify-between">
        <div>
          { lat  && <InstantReport city={ cityName } lat={cityCoords ? cityCoords.lat : lat} long={cityCoords ? cityCoords.lng : long} />}
        </div>
          { lat  && <PollutionMap lat={cityCoords ? cityCoords.lat : lat} long={cityCoords ? cityCoords.lng : long} onMapClick={handleMapClick} />}
    </div>
    </div>
    
      
  
    </>
    
  );
}

export default Home;





