import worldMapData from 'city-state-country';

const countriesList = worldMapData.getAllCountries().map((item) => item.name);
const countries = [...new Set(countriesList)];

const ciriesList = worldMapData.getAllStates().map((item) => item.name);
const cities = [...new Set(ciriesList)];

export {
  countries,
  cities,
};
