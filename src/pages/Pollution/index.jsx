import { Link, Outlet } from "react-router-dom";

const Pollution = () => {

    return (
        <>
        {/* <div className="text-center font-bold mb-10">Ceci est la page pollution</div> */}
        <div className="flex flex-row justify-around m-6">
            <Link to="daily">Prévisions journalières</Link>
            <Link to="hebdo">Prévisions hebdomadaires</Link>
        </div>
        
        <div>
            <Outlet />
        </div>

        </>
        
    )
}

export default Pollution;