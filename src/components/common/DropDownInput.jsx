import React, { useState } from "react";

const DropdownInput = (props) => {
  const { data, setSelected, warranty } = props;
  const [selectedValue, setSelectedValue] = useState();

  const options = data;

  const handleInputChange = (e) => {
    setSelectedValue(e.target.value);
    setSelected(e.target.value);
  };

  return (
    <div className="relative">
      {/* <select
        className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-none"
        placeholder="Select an option"
        value={selectedValue}
        onChange={handleInputChange}
        required
        disabled={data?.length === 0}
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </select> */}
      <select
        id="day"
        className="pl-4 pr-10 py-2 w-full border border-gray-300 rounded-none"
        onChange={handleInputChange}
        disabled={data?.length === 0}
        placeholder="Select an option"
        value={selectedValue}
        required
      >
        {!warranty && <option value="">Select an option</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropdownInput;
