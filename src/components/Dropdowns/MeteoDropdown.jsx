import { Dropdown } from 'flowbite-react';

export default function MeteoDropdown() {
    return (
      <Dropdown
          inline
          label="Météo"
        >
          <Dropdown.Item>
            Instant report
          </Dropdown.Item>
          <Dropdown.Item>
            forecasts
          </Dropdown.Item>
        </Dropdown>
    )
  }