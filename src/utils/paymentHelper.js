const convertToArray = (obj) => Object.keys(obj).reduce((acc, key) => {
  if (obj[key].trim() === '') return acc;
  if (key.includes('first')) acc[0][key.replace('first', '')] = obj[key];
  else if (key.includes('van')) acc[1][key.replace('van', '')] = obj[key];
  else if (key.includes('business')) acc[2][key.replace('business', '')] = obj[key];

  return acc;
}, [{
  fleetType: 'businessClassFleet',
}, {
  fleetType: 'businessVanSuvFleet',
}, {
  fleetType: 'firstClassFleet',
}]);

const convertToObject = (arr) => arr.reduce((acc, key) => {
  if (key.fleetType === 'firstClassFleet') {
    delete key.fleetType;
    Object.keys(key).forEach((obj) => {
      acc[`first${obj}`] = key[obj];
    });
  } else if (key.fleetType === 'businessVanSuvFleet') {
    delete key.fleetType;
    Object.keys(key).forEach((obj) => {
      acc[`van${obj}`] = key[obj];
    });
  } else if (key.fleetType === 'businessClassFleet') {
    delete key.fleetType;
    Object.keys(key).forEach((obj) => {
      acc[`business${obj}`] = key[obj];
    });
  }
  return acc;
}, {});

export { convertToArray, convertToObject };
