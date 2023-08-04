import { Button, Label, TextInput } from 'flowbite-react';
import  { useState } from 'react';
import PropTypes from 'prop-types';
import OpenWeatherMap from '../../../services/weather/OpenWeatherMap';
import { Card } from 'flowbite-react';




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
    console.log('Ville sélectionnée:', ville);
    console.log('coordonnées', OpenWeatherMap.geocoding(ville));
    const data = await OpenWeatherMap.geocoding(ville);
    // const lat = data.lat;
    let name = data[0].name
    let lat = data[0].lat;
    let lon = data[0].lon;
    onVilleChange(ville, [lat, lon ], name)

  };


  return (
    <>
    <Card className='flex flex-row justify-center w-1/2 md:w-1/4 mx-auto'>
    <form className="flex max-w-md flex-col justify-start gap-4" onSubmit={ handleSubmit }>
      <div>
        <div className="mb-2 block">
          <Label
            htmlFor="ville"
            value="Votre ville"
          />
        </div>
        <TextInput
          id="ville"
          placeholder="ville ? "
          required
          type="string"
          value={ ville }
          onChange = { handleVilleChange }
          
        />
      </div>
      <Button type="submit">
        Valider
      </Button>
    </form>
    </Card>
    </>
    
    
  )
}

// Add prop validation for onVilleChange
DailyForm.propTypes = {
    onVilleChange: PropTypes.func.isRequired,
}


