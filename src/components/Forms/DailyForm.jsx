import { useState } from 'react';
import PropTypes from 'prop-types';
import OpenWeatherMap from '../../../services/weather/OpenWeatherMap';
// import { Card } from 'flowbite-react';




export default function DailyForm({ onVilleChange }) {

  // définition de l'état local de ville 
  const [ville, setVille] = useState('');
  // const [coords, setCoords] = useState([]);

  // fonction appelée lors du changement de l'input 
  const handleVilleChange = (event) => {
    const newVille = event.target.value;
    // const coords = 
    setVille(newVille);
  };

  // fonction appélée lors du submit
  // renvoie de la valuer au parent
  const handleSubmit = async (event) => {
    event.preventDefault();

    // onVilleChange(ville);
    // Ici vous pouvez utiliser la valeur "ville" comme vous le souhaitez
    // console.log('Ville sélectionnée:', ville);
    // console.log('coordonnées', OpenWeatherMap.geocoding(ville));
    const data = await OpenWeatherMap.geocoding(ville);
    // const lat = data.lat;
    let name = data[0].name
    let lat = data[0].lat;
    let lon = data[0].lon;
    onVilleChange(ville, { lat, lng: lon }, name)

  };


  return (
    <>
      <div className='flex flex-row w-full mx-auto bg-slate-300 p-3'>
        <div className="container w-full md:w-1/2 mx-auto px-5"> 
        <form onSubmit={handleSubmit}>
          <div className="flex max-w-md flex-row">
            <div className="relative text-gray-600">
              <input type="text" id="ville" placeholder="ville ? " required value={ville} onChange={handleVilleChange} name="serch"  className="bg-white h-10 px-5 pr-10 rounded text-gray-700 text-sm focus:shadow-outline "/>
                <button type="submit" className="absolute right-0 top-0 mt-2 mr-3">
                  <img src="/assets/search.svg" alt="" />
                </button>
            </div>
          </div>
        </form>
        </div>
        
      </div>
    </>



  )
}

// Add prop validation for onVilleChange
DailyForm.propTypes = {
  onVilleChange: PropTypes.func.isRequired,
}


