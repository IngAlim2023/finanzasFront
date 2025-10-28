import React from "react";
import { TbWallet } from "react-icons/tb";

const Landing: React.FC = () => {
  return (
    <div className="m-2">
      <div className="p-2 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl shadow-md text-4xl text-white">
        <TbWallet />
      </div>
      <div className="text-4xl ">
            FinazasApp
      </div>
    </div>
  );
};

export default Landing;
