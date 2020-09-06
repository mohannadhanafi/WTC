const arrayNumbers = (lowEnd, highEnd) => {
  const list = [];
  for (let i = lowEnd; i <= highEnd; i += 1) {
    list.push(i);
  }
  return list;
};


export default arrayNumbers;
