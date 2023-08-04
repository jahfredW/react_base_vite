import { Dropdown } from 'flowbite-react';
import { Link } from 'react-router-dom';


export default function PollutionDropdown() {
    let url = "/pollution";
   
    
  

    return (
      <>
      <Dropdown
          inline
          label="Pollution"
        >
          <Dropdown.Item>
            <Link to={url}> Instant report</Link>
          </Dropdown.Item>
          <Dropdown.Item>
            forecasts
          </Dropdown.Item>
      </Dropdown>
      </>
      
    )
  }