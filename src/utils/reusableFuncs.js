import _ from "lodash";

export function formatDate(day, month, year) {
  // Add leading zeros if necessary
  const formattedDay = String(day).padStart(2, "0");
  const formattedMonth = String(month).padStart(2, "0");

  // Format the date
  const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

  return formattedDate;
}

export function addYearsToDate(d, year = 1) {
  const dateStr = d;
  const date = new Date(dateStr);

  date.setFullYear(date.getFullYear() + year);

  const newDateStr = date.toISOString().slice(0, 10);
  return newDateStr;
}

export function checkAnyFieldEmpty(products) {
  const isEmptyFieldPresent = _.some(products, (item) => {
    const product = item.product;

    const isEmpty = _.some(product, (value, key) => {
      if (key === "warrantyExpiryDate" || key === "warrantyInYears") {
        return product.hasWarranty ? value === "" : false;
      }
      if (key === "serialNumber") {
        return value === false;
      }
      return value === "" || value === null;
    });

    const isProductPhotoEmpty =
      item.productPhoto === "" || item.productPhoto === null;

    return isEmpty || isProductPhotoEmpty;
  });
  return isEmptyFieldPresent;
}

export function makeDate(d) {
  const dateStr = d;
  const date = new Date(dateStr);

  const options = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);

  return formattedDate;
}

export function searchProducts(products, searchText) {
  return _.filter(products, (product) =>
    _.some(
      product,
      (value) =>
        _.isString(value) &&
        value.toLowerCase().includes(searchText.toLowerCase())
    )
  );
}
