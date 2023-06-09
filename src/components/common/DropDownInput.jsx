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
      <select
        id="day"
        className={`sm:pl-4 sm:pr-10 py-2 w-full border border-gray-300 rounded-none ${
          !selectedValue && "border-red-500 focus:border-red-500"
        }`}
        onChange={handleInputChange}
        onSelect={(e) => e.target.blur}
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
