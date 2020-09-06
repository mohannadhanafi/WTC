const filterArray = (array, i) => array.slice(0, i).concat(array.slice(i + 1, array.length));

export default filterArray;
