// import { useParams } from "react-router-dom";
// import { useLocation } from 'react-router-dom';
// import DailyForm from "../../components/Forms/DailyForm";
import { useState, useEffect } from 'react';
import OpenWeatherMap from '../../../services/weather/OpenWeatherMap';
import { Card, Spinner } from 'flowbite-react';
import { PollutionUtils } from '../../utils/Pollution/pollutionUtils';
import PropTypes from 'prop-types';

const InstantReport = ({city, lat, long}) => {
    // useLocation pour récupérer les query params de l'url 
    // const location = useLocation();
    // const params = new URLSearchParams(location.search);

    // // État local pour stocker la valeur de "ville" dans le parent
    // const [villeParent, setVilleParent] = useState('');
    // // Etat local pour rendre les coordonnées de la ville 
    // const [coordParent, setCoord] = useState('');
    const [pollutionDatas, setPollutionDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [aqiData, setAqiData] = useState(null)
    const [aqiUtils, setAqiUtils] = useState(null)

    // ajout d'un état pour les coordonées du click
    // const [clickCoords, setClickCoords] = useState(null);

    // Fonction de rappel pour mettre à jour l'état "villeParent"
    // ici ville tes la valeur transmise par l'enfant
    //  const handleVilleChangeParent = (ville, coords, villeName) => {
    //     setVilleParent(villeName);
    //     setCoord(coords)
    // };

    useEffect( () => { 
        const fetchData = async () => {
            if(lat && long > 0){
                setIsLoading(true)
                let data = await OpenWeatherMap.pollutionInstant(lat, long);
                console.log(data.list[0].components);
                const aqi = data.list[0].main.aqi;
                const datas = data.list[0].components;
                setPollutionDatas(datas);
                setIsLoading(false)
                setAqiData(aqi);
                let aqiSetUp = PollutionUtils.setAqiUtils(aqi);
                setAqiUtils(aqiSetUp)
                // console.log(data)
            }
        }
        fetchData()
    }, [city, lat, long])
    
    // const city = params.get('city');
    // console.log(city);

   



    
    // const { dayNumber } = useParams();
    return (
    <>
    {  <div>
    {/* <DailyForm onVilleChange={ (ville) => setVilleParent(ville) } /> */}
    {/* <DailyForm onVilleChange={ handleVilleChangeParent } /> */}
    { pollutionDatas.length != 0 && <div className="my-10 flex flex-row">
        <Card className='my-4 w-full md:w-full md:h-full'>
            <h5 className='text-center font-bold'>{ city && (<div> Ville : { city } </div> )}</h5>
            <div>
            {/* { coordParent && (<p><span>lat : { coordParent[0] }</span> <span>, long : { coordParent[1] }</span>  </p> )} */}
            </div>
            <div>
                { isLoading && <Spinner />}
                { aqiUtils && <div className={`${aqiUtils.color} text-center mb-5 font-bold text-sm`}> indice : { aqiData },  { aqiUtils.text } <span>{ aqiUtils.emoji }</span></div> }
                { pollutionDatas ? PollutionUtils.pollutionThresholds.map((item, index) => { 
                        const { polluant, thresholds } = item;
                        const value = pollutionDatas[polluant];
                        const color = PollutionUtils.setColor(thresholds, value)
                        // const emoji= value > threshold ? '🙁' : '😀';
                        return (
                        <div key={`${index}`} className="grid grid-cols-2 border-b border-gray-200 scale-100 transform  hover:scale-110 hover:cursor-pointer">
                                    <div className={color.color} >{polluant} : {value}</div>
                                    <div className="text-end"> {color.emoji} </div>
                                </div>)
        

                     }) : null } 
            </div>
        </Card>
    {/* { dayNumber ? (<div> Previsions pour le jour { dayNumber } </div> ) : <div>Prévisions pour tous les jours</div>} */}
    </div>}
    
    </div>}
    </>
    
    );
    
}

export default InstantReport;

InstantReport.propTypes = {
    lat: PropTypes.number,
    long: PropTypes.number,
    city: PropTypes.string
}