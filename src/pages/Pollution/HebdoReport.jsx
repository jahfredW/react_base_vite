import { Card } from "flowbite-react";
import { useState , useEffect } from 'react'



// const dataSetTest = [
//     {
//         day : "monday",
//         weather : "nice",
//     },
//     {
//         day : "thuesday",
//         weather : "cloudy",
//     },
//     {
//         day : "wednesday",
//         weather : "rainy",
//     },

// ]



const HebdoReport = () => {

    

    const [dataSetTest, setDataSetTest] = useState([]);

    useEffect( () => {
        setDataSetTest([
            {
                day : "monday",
                weather : "nice",
            },
            {
                day : "thuesday",
                weather : "cloudy",
            },
            {
                day : "wednesday",
                weather : "rainy",
            },
        
        ])
        console.log(import.meta.env.VITE_OPENWHEATHERMAPAPIKEY)
    }, [])
    

    return (
        <>
        <div className="text-center font-bold mb-10">Ceci est le bloc Prévisions hebdo</div>
        <div className="grid grid-cols-3 gap-2 m-2 ">
            { dataSetTest.map( (forecast, index) => (
                <div key={`${index}-${forecast}`}>
                    <Card  >
                    <h5>{ forecast.day }</h5>
                    <p>{ forecast.weather }</p>
                    </Card>
                </div>
                
            ))}
        </div>
        
        </>
    )
}

export default HebdoReport;