import React, { useEffect, useState } from "react";
import { addYearsToDate } from "../../utils/reusableFuncs";

const WarrantyDate = (props) => {
  const { purchaseDate, warrantyYear, setWarranty } = props;

  const [warrantyDate, setWarrantyDate] = useState("");
  const [date, setDate] = useState();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    setWarrantyDate(addYearsToDate(purchaseDate, parseInt(warrantyYear)));
    setWarranty(addYearsToDate(purchaseDate, parseInt(warrantyYear)));
    dateSetter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [warrantyYear, purchaseDate, warrantyDate]);

  const dateSetter = () => {
    const dateStr = addYearsToDate(purchaseDate, parseInt(warrantyYear));
    if (dateStr) {
      const [year, month, day] = dateStr
        .split("-")
        .map((component) => parseInt(component, 10));

      const formattedMonth = month < 10 ? String(month) : month;
      const formattedDay = day < 10 ? String(day) : day;

      const dateObj = {
        year: year,
        month: formattedMonth,
        day: formattedDay,
      };

      setDate(dateObj);
    }
  };
  return (
    <div className="flex gap-1 sm:flex-row flex-col">
      <div>
        <select id="day" className="block border-gray-300 w-[78px] text-sm">
          <option value={date?.day}>{date?.day}</option>
        </select>
      </div>
      <div>
        <select id="month" className="block border-gray-300 text-sm w-[126px]">
          <option value={months[date?.month]}>{months[date?.month - 1]}</option>
        </select>
      </div>
      <div>
        <select id="year" className="block border-gray-300 text-sm">
          <option value={date?.year}>{date?.year}</option>
        </select>
      </div>
    </div>
  );
};

export default WarrantyDate;
