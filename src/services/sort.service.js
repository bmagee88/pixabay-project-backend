async function sortByField(list, key, orderAsc) {
  function compareByStringFieldAsc(a, b) {
    if (a[key].toUpperCase() < b[key].toUpperCase()) return -1;
    if (a[key].toUpperCase() > b[key].toUpperCase()) return 1;
    return 0;
  }

  function compareByStringFieldDesc(a, b) {
    if (a[key].toUpperCase() > b[key].toUpperCase()) return -1;
    if (a[key].toUpperCase() < b[key].toUpperCase()) return 1;
    return 0;
  }

  function compareByNumberFieldAsc(a, b) {
    return a[key] - b[key];
  }

  function compareByNumberFieldDesc(a, b) {
    return b[key] - a[key];
  }

  if (list.length === 0) return list;
  const type_of_key = typeof list[0][key];
  switch (type_of_key) {
    case "number":
      list =
        orderAsc === true
          ? list.sort(compareByNumberFieldAsc)
          : list.sort(compareByNumberFieldDesc);
      break;
    case "string":
      list =
        orderAsc === true
          ? list.sort(compareByStringFieldAsc)
          : list.sort(compareByStringFieldDesc);
      break;
    default:
      break;
  }

  return list;
}

module.exports = { sortByField };
