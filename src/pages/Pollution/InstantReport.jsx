// import { useParams } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import DailyForm from "../../components/Forms/DailyForm";
import { useState, useEffect } from 'react';
import OpenWeatherMap from '../../../services/weather/OpenWeatherMap';
import { Card } from 'flowbite-react';

const InstantReport = () => {
    // useLocation pour récupérer les query params de l'url 
    const location = useLocation();
    const params = new URLSearchParams(location.search);

    // État local pour stocker la valeur de "ville" dans le parent
    const [villeParent, setVilleParent] = useState('');
    // Etat local pour rendre les coordonnées de la ville 
    const [coordParent, setCoord] = useState('');
    const [pollutionDatas, setPollutionDatas] = useState([]);

    // Fonction de rappel pour mettre à jour l'état "villeParent"
    // ici ville tes la valeur transmise par l'enfant
     const handleVilleChangeParent = (ville, coords, villeName) => {
        setVilleParent(villeName);
        setCoord(coords)
    };

    useEffect( () => { 
        const fetchData = async () => {
            if(coordParent.length > 0){
                let data = await OpenWeatherMap.pollutionInstant(coordParent[0], coordParent[1]);
                console.log(data.list[0].components);
                const datas = data.list[0].components;
                setPollutionDatas(datas);
                // console.log(data)
            }
        }
        fetchData()
    }, [coordParent])
    
    const city = params.get('city');
    console.log(city);

    const setColor = (threshold, value) => {
        // destructuration de threshold
        const { good, fair, moderate, poor } = threshold;

        switch (true) {
            case value <= good:
                return { color: 'text-green-500', emoji: '😀'};
            case value <= fair:
                return { color:'text-yellow-400', emoji: '🙂'};
            case value <= moderate:
                return { color:'text-orange-500', emoji: '😐'};
            case value <= poor:
                return { color:'text-red-500', emoji: '😕'};
            default:
                return { color: 'text-purple-500', emoji: '😠'}; // Or any other default color for values beyond "poor"
        }
    }



    // définir les seuils pour chaque type de pollution 
    const pollutionThresholds = [
        {
          polluant: 'pm10',
          thresholds: {
            good: 20,
            fair: 50,
            moderate: 100,
            poor: 200,
          },
        },
        {
          polluant: 'pm2_5',
          thresholds: {
            good: 10,
            fair: 25,
            moderate: 50,
            poor: 75,
          },
        },
        {
          polluant: 'so2',
          thresholds: {
            good: 20,
            fair: 80,
            moderate: 250,
            poor: 350,
          },
        },
        {
            polluant: 'no2',
            thresholds: {
              good: 40,
              fair: 70,
              moderate: 150,
              poor: 200,
            },
        },
        {
        polluant: 'co',
        thresholds: {
            good: 4400,
            fair: 9400,
            moderate: 12400,
            poor: 15400,
        },
        },
        {
        polluant: 'o3',
        thresholds: {
            good: 60,
            fair: 100,
            moderate: 140,
            poor: 180,
        },
        },
        
        
      ];
    // const { dayNumber } = useParams();
    return (
    <>
    <div className='flex flex-col justify-around'>
    {/* <DailyForm onVilleChange={ (ville) => setVilleParent(ville) } /> */}
    <DailyForm onVilleChange={ handleVilleChangeParent } />
    { pollutionDatas.length != 0 && <div className="text-center font-bold mt-6 flex flex-row justify-center">
        <Card className='my-4 w-1/2 md:w-1/4'>
            <h5>{ villeParent && (<div> Ville : { villeParent } </div> )}</h5>
            <div>
            {/* { coordParent && (<p><span>lat : { coordParent[0] }</span> <span>, long : { coordParent[1] }</span>  </p> )} */}
            </div>
            <div>
                { pollutionDatas ? pollutionThresholds.map((item, index) => { 
                        const { polluant, thresholds } = item;
                        const value = pollutionDatas[polluant];
                        const color = setColor(thresholds, value)
                        // const emoji= value > threshold ? '🙁' : '😀';
                        return <div className={color.color} key={`${index}`}>{polluant} : {value} <span> {color.emoji}</span></div>
        

                     }) : null } 
            </div>
        </Card>
    {/* { dayNumber ? (<div> Previsions pour le jour { dayNumber } </div> ) : <div>Prévisions pour tous les jours</div>} */}
    </div>}
    
    </div>
    </>
    
    );
    
}

export default InstantReport;