// import { useMap } from 'react-leaflet/hooks'
import { useEffect } from 'react';
import { Marker, Popup, TileLayer, MapContainer, useMapEvents} from 'react-leaflet'
import PropTypes from 'prop-types';
import { Spinner } from 'flowbite-react';
import { PollutionUtils } from '../../utils/Pollution/pollutionUtils';
import OpenWeatherMap from '../../../services/weather/OpenWeatherMap';
import ReactDOMServer from 'react-dom/server';
import { useMap } from 'react-leaflet'; // Importer useMap


const PollutionMap = ( {lat , long, onMapClick} ) => {

    const CenterMap = ({ lat, long }) => {
        const map = useMap();
    
        useEffect(() => {
            if (lat && long) {
                map.flyTo([lat, long], map.getZoom());
            }
        }, [lat, long, map]);
    
        return null;
    }

    // const [aqi, setAqi] = useState(null);
    // const [datas, setDatas] = useState([]);
    // const [aqiSetup, setAqiSetup] = useState(null);

    if (lat === null || long === null) {
        return <Spinner />; // Affiche un message de chargement en attendant les valeurs
      }
    
   
    //...

const MapClickHandler = ({onMapClick}) => {
    const map = useMapEvents({
        click: async (e) => {
            const {lat, lng} = e.latlng
            onMapClick(lat, lng);

            // récupération des datas avec 
            if(lat && lng){
                let data = await OpenWeatherMap.pollutionInstant(lat, lng);
                const aqi = data.list[0].main.aqi;
                const datas = data.list[0].components;
              
                console.log(aqi);
                console.log(datas)

                let aqiUtils = PollutionUtils.setAqiUtils(aqi);
              
              
                
                // créer un pop up perso : 
                let popupContent = ReactDOMServer.renderToString(
                    <div className='w-36 bg-slate-100'>  
                        { aqiUtils && <div className={`${aqiUtils.color} text-center mb-2 font-bold text-sm`}> indice : { aqi },  { aqiUtils.text } <span>{ aqiUtils.emoji }</span></div> }
                        { datas ? PollutionUtils.pollutionThresholds.map((item, index) => { 
                                const { polluant, thresholds } = item;
                                const value = datas[polluant];
                                const color = PollutionUtils.setColor(thresholds, value)
                                // const emoji= value > threshold ? '🙁' : '😀';
                                return (
                                <div key={`${index}`} className="grid grid-cols-2 items-center border-b border-gray-200 scale-100 transform  hover:scale-110 hover:cursor-pointer">
                                    <div className={color.color} >{polluant} : {value}</div>
                                    <div className="text-right"> {color.emoji} </div>
                                </div>
                                
                           )}) : null } 
                    </div>
                );
                
                // injection du popUp dans la map 
                map.openPopup(popupContent, e.latlng)
            }
        },

        zoomstart: () => {
            map.closePopup();
        },
    });
    return null; // Ce composant ne rend rien, il est simplement utilisé pour capturer les événements de clic
}; 



//...

  
    return (
            <MapContainer  center={[lat, long]} zoom={13} scrollWheelZoom={false}>
                <CenterMap lat={lat} long={long} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[lat, long]}>
                    <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
                <MapClickHandler onMapClick={onMapClick} />
            </MapContainer>
    )
}

export default PollutionMap;

PollutionMap.propTypes = {
    lat: PropTypes.number,
    long: PropTypes.number,
    onMapClick: PropTypes.func
}