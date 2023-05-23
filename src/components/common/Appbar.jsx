import React from "react";
import logo from "../../assets/logo.svg";
const Appbar = () => {
  return (
    <nav className="h-[62px] bg-neural-gradient w-screen">
      <div>
        <img src={logo} alt="neural logo" className="h-[60px] w-[150px] ml-8" />
      </div>
    </nav>
  );
};

export default Appbar;
