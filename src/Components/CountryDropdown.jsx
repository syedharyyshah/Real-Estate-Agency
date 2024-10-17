import React, { useContext, useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine, RiMapPinLine } from 'react-icons/ri';
import { Menu } from '@headlessui/react';
import { HouseContext } from './HouseContext';

const CountryDropdown = () => {
  const { country, setCountry, countries } = useContext(HouseContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Menu as="div" className="dropdown relative">
      <Menu.Button onClick={() => setIsOpen(!isOpen)} className="dropdown-btn w-full text-left">
        <RiMapPinLine className="dropdown-icon-primary" />
        <div>
          <div className='text-[15px] font-medium leading-tight'>{country}</div>
          <div className='text-[13px]'>Select your place</div>
        </div>
        {isOpen ? (
          <RiArrowUpSLine className="dropdown-icon-secondary" />
        ) : (
          <RiArrowDownSLine className="dropdown-icon-secondary" />
        )}
      </Menu.Button>
      <Menu.Items className="dropdown-menu absolute w-full bg-white shadow-lg mt-2 z-10">
        {countries.map((country, index) => (
          <Menu.Item as="div" key={index}>
            {({ active }) => (
              <div
                onClick={() => setCountry(country)}
                className={`cursor-pointer p-2 ${active ? 'bg-gray-200' : ''}`}
              >
                {country}
              </div>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};

export default CountryDropdown;
