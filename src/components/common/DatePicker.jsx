import React, { useEffect, useState } from "react";
import { addYearsToDate, formatDate } from "../../utils/reusableFuncs";

const DatePicker = (props) => {
  const {
    yearFrom,
    setPurchaseDate,
    isWarrantydate,
    setWarrantyDate,
    warrantyYear,
    purchaseDate,
    prevDate,
    setIsPrevDate,
    isPrevDate,
  } = props;
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedyear] = useState("");

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
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
  const years = Array.from({ length: 50 }, (_, i) => yearFrom - i);
  useEffect(() => {
    if (isWarrantydate) {
      return setWarrantyDate(addYearsToDate(purchaseDate, warrantyYear));
    } else if (isPrevDate) {
      let dateStr = prevDate;
      if (dateStr) {
        const [year, month, day] = dateStr
          .split("-")
          .map((component) => parseInt(component, 10));

        const formattedMonth = month < 10 ? String(month) : month;
        const formattedDay = day < 10 ? String(day) : day;

        setSelectedDay(formattedDay);
        setSelectedMonth(formattedMonth);
        setSelectedyear(year);
        setIsPrevDate(false);
      }
    } else {
      let finalDate = "";
      if (selectedDay && selectedMonth && selectedYear) {
        finalDate = formatDate(selectedDay, selectedMonth, selectedYear);

        setPurchaseDate(finalDate);
      } else setPurchaseDate("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedDay,
    selectedMonth,
    selectedYear,
    isWarrantydate,
    warrantyYear,
    prevDate,
  ]);

  return (
    <div className="flex gap-1 sm:flex-row flex-col">
      <div>
        <select
          id="day"
          className="block border-gray-300 sm:w-[78px] w-full text-sm"
          onChange={(e) => setSelectedDay(e.target.value)}
          value={selectedDay}
        >
          <option value="">Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="month"
          className="block border-gray-300 text-sm  w-full"
          onChange={(e) => {
            setSelectedMonth(e.target.value);
          }}
          value={selectedMonth}
        >
          <option value="">Month</option>
          {months.map((month, index) => (
            <option key={index} value={index + 1}>
              {month}
            </option>
          ))}
        </select>
      </div>
      <div>
        <select
          id="year"
          className="block border-gray-300 text-sm  w-full"
          onChange={(e) => setSelectedyear(e.target.value)}
          value={selectedYear}
        >
          <option value="">Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DatePicker;
