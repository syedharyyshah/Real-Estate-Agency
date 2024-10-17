import React, { createContext, useEffect, useState } from 'react';
import { housesData } from '../data';

export const HouseContext = createContext();

const HouseContextProvider = ({ children }) => {
  const [houses, setHouses] = useState(housesData);
  const [country, setCountry] = useState('Location (any)');
  const [countries, setCountries] = useState([]);
  const [property, setProperty] = useState('Property type (any)');
  const [properties, setProperties] = useState([]);
  const [price, setPrice] = useState('Price range (any)');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const allCountries = houses.map((house) => house.country);
    const uniqueCountries = ['Location (any)', ...new Set(allCountries)];
    setCountries(uniqueCountries);
  }, [houses]);

  useEffect(() => {
    const allProperties = houses.map((house) => house.type);
    const uniqueProperties = ['Property type (any)', ...new Set(allProperties)];
    setProperties(uniqueProperties);
  }, [houses]);

  const handleClick = () => {
    setLoading(true);

    const isDefault = (str) => str.includes('(any)');

    const [minPrice, , maxPrice] = price.split(' ').map(str => parseInt(str));

    const newHouses = housesData.filter((house) => {
      const housePrice = parseInt(house.price);

      if (house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice) {
        return true;
      }

      if (isDefault(country) && isDefault(property) && isDefault(price)) {
        return true;
      }

      if (!isDefault(country) && isDefault(property) && isDefault(price)) {
        return house.country === country;
      }

      if (!isDefault(property) && isDefault(country) && isDefault(price)) {
        return house.type === property;
      }

      if (!isDefault(price) && isDefault(country) && isDefault(property)) {
        return housePrice >= minPrice && housePrice <= maxPrice;
      }

      if (!isDefault(country) && !isDefault(property) && isDefault(price)) {
        return house.country === country && house.type === property;
      }

      if (!isDefault(country) && !isDefault(property) && !isDefault(price)) {
        return house.country === country && house.type === property && housePrice >= minPrice && housePrice <= maxPrice;
      }

      return false;
    });

    setTimeout(() => {
      setHouses(newHouses.length < 1 ? [] : newHouses);
      setLoading(false);
    }, 1000);

    console.log(newHouses);
  };

  return (
    <HouseContext.Provider value={{
      country,
      setCountry,
      countries,
      property,
      setProperty,
      properties,
      price,
      setPrice,
      houses,
      loading,
      handleClick,
    }}>
      {children}
    </HouseContext.Provider>
  );
};

export default HouseContextProvider;
