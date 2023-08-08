class OpenWeatherMap {
  
    static API_KEY = import.meta.env.VITE_OPENWHEATHERMAPAPIKEY;
    
    /**
     * Récupère les coordonnées d'une ville 
     * @param {string} city 
     * @returns {Array} data : coord of a city 
     */
    static async geocoding(city){
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${OpenWeatherMap.API_KEY}`

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();

            return data;

        } catch (error) {
            console.error('Error fetching data from OpenWeatherMap API:', error);
            return null;
        }
    }

    static async pollutionInstant(lat, lon){
        let url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${OpenWeatherMap.API_KEY}`

        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }

            const data = await response.json();

            return data;

        } catch (error) {
            console.error('Error fetching data from OpenWeatherMap API:', error);
            return null;
        }
    }
}

export default OpenWeatherMap;