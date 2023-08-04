import { Outlet, Link } from 'react-router-dom'

function Survey() {
    return (
        <div>
            <h1 className='font-bold text-center text-xl'>Questionnaire 🧮</h1>
            <div className='flex flex-row justify-evenly'>
                <Link to="client">Questionnaire Client</Link>
                <Link to="freelance">Questionnaire Freelance</Link> 
            </div>
            <div>
                <Outlet />
            </div>
            
        </div>
    )
}

export default Survey