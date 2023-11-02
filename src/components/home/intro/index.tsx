import React from "react";

import Image from "next/image";

//assets
import logobg from "../../../assets/svg/logobg.svg";
import WebtreeLogo from "../../../assets/logo/webtree";

import { Inter, Familjen_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Familjen_Grotesk({ subsets: ["latin"] });

const Intro = ({}) => {
  return (
    <section>
      <span className="flex overflow-hidden justify-center items-center w-full h-screen">
        <picture className="absolute left-0 top-0 w-full">
          <img className="
          object-fill
          w-full  h-full  
        

          " src={logobg.src} alt="" />
        </picture>
        <div
          className={`${grotesk.className} h-full  flex w-96 text-center flex-col items-center z-10`}
        >
          <h1 className={`text-[64px] font-bold mt-[92px] leading-[64px]`}>
            Welcome to Webtree
          </h1>
          <p className="text-[24px] mt-3 mb-[70px]">
            Grow your own Identi-tree
          </p>
          <WebtreeLogo />
          <button
            onClick={() => {
              window.location.href = "/login";
            }}
            className="text-[20px] black-btn text-white py-[23px] w-[340px] mt-auto"
          >
            Get Started
          </button>
          <p className="text-[#A5BCB0] py-4">
            Built by OWNOS. Remember the Name.
          </p>
        </div>
      </span>
    </section>
  );
};

{
  /* <button

className="flex justify-center items-center bg-black text-white rounded-full px-8 py-2 mt-12 
            mx-auto  hover:bg-gray-800 transition duration-300 ease-in-out hover:border-gray-800 hover:border-2
            border-2 border-white"
>
Get Started
</button> */
}

export default Intro;