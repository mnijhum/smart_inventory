import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-row justify-between mt-[70px]">
      <div className=" text-slate-400 text-sm">
        ©️ Copyright {new Date().getFullYear()} |{" "}
        <a
          href="http://www.neural-semiconductor.com/"
          className="text-blue-500 cursor-pointer"
        >
          NSL
        </a>
      </div>
      <div className=" text-slate-400 text-sm">
        {" "}
        Terms & Conditions | Help Center
      </div>
    </div>
  );
};

export default Footer;
