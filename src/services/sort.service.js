const ListEmptyException = require("../exceptions/ListEmptyException");
const KeyNotExistInObjectException = require("../exceptions/KeyNotExistInObjectException");
const KeyTypeNotSupportedException = require("../exceptions/KeyTypeNotSupportedException");
const ListNotArrayException = require("../exceptions/ListNotArrayException");
const NonObjectInListException = require("../exceptions/NonObjectInListException");

/** Takes in a list of objects, a key, and a boolean to sort asc or desc
 * returns modified sorted list
 */
async function sortByField(list, key, orderAsc) {
  function getDateNumberFromKey(item, key) {
    const tokens = item[key].split("/");
    const sliceTokens = tokens.slice(4, 7);
    return parseInt(sliceTokens.join(""));
  }

  function compareByDateAsc(a, b) {
    const date_number_A = getDateNumberFromKey(a, key);
    const date_number_B = getDateNumberFromKey(b, key);
    return date_number_A - date_number_B;
  }

  function compareByDateDesc(a, b) {
    const date_number_A = getDateNumberFromKey(a, key);
    const date_number_B = getDateNumberFromKey(b, key);
    return date_number_B - date_number_A;
  }

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

  if (!Array.isArray(list))
    throw new ListNotArrayException("the list must be a list");
  if (list.length === 0)
    throw new ListEmptyException("The list provided is empty.  cannot sort.");
  list.forEach((item) => {
    if (!(item instanceof Object)) {
      throw new NonObjectInListException("all list items must be Objects");
    }
  });
  if (!Object.keys(list[0]).includes(key))
    throw new KeyNotExistInObjectException(
      "The key provided does not exist in the object."
    );

  if (key === "previewURL") {
    // console.log("list before", list);
    console.log("unsorted")
    list.forEach((item)=>console.log(getDateNumberFromKey(item, "previewURL")))
    list =
      orderAsc === true
        ? list.sort(compareByDateAsc)
        : list.sort(compareByDateDesc);
    // console.log("list after", list);
    console.log("sorted")
    list.forEach((item)=>console.log(getDateNumberFromKey(item, "previewURL")))
    return list;
  }

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
      throw new KeyTypeNotSupportedException(
        "the key type provide isn't supported."
      );
  }

  return list;
}

module.exports = { sortByField };
