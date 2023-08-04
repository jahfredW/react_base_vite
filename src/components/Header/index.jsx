// import { Link } from 'react-router-dom'
import  MeteoDropdown  from './../Dropdowns/MeteoDropdown';
import PollutionDropdown from '../Dropdowns/PollutionDropdown';

import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
   
    <Navbar fluid rounded className='bg-slate-500 text-white'>
        <Link to="/" className='flex flex-row'> 
        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Appli météo
        </span></Link>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <MeteoDropdown />
        <PollutionDropdown></PollutionDropdown>
      </Navbar.Collapse>
    </Navbar>
 
  )
}


