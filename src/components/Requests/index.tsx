import Tick from "@/assets/tick";
import Close from "@/assets/close";
import React from "react";

export const Requests = () => {
  return (
    <div className="py-6 absolute bottom-0 flex flex-col w-[500px] bg-[#FCFFF7] border border-black rounded-[24px]">
      <span className="flex justify-between items-center px-6">
        <h1 className="text-[30px] font-bold">Verification Requests</h1>
        <p className="text-[23px] text-[#434343]">4</p>
      </span>
      <div>
        <Req />
        <Req />
        <Req />
      </div>
    </div>
  );
};

function Req() {
  return (
    <span className="flex items-center px-6 pb-2 border-b-2 mt-[20px]">
      <p>
        <strong>Srivatsan</strong> wants to verify your profle
      </p>
      <span className="flex ml-auto gap-[30px]">
        <Tick />
        <Close />
      </span>
    </span>
  );
}
