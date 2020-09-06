const sort = {
  sortText: (a, b, key) => a[key].localeCompare(b.name),
  sortNumber: (a, b, key) => a[key] - b[key],
};

export default sort;
