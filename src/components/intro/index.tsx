import React from 'react'

import Image from "next/image";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { WebtreeLogo } from '@/assets';


const inter = Inter({ subsets: ["latin"] });
const grotesk = Familjen_Grotesk({ subsets: ["latin"] });
interface indexProps {

}



const Intro: React.FC<indexProps> = ({}) => {
        return (
            <>
                <h1 className={`${grotesk.className} text-center  font-bold text-5xl text-gray-600 mt-12  
                    
                `}>
                Welcome to
                <br/>
                 Webtree

                </h1>
                <p className={`${inter.className} text-center text-gray-500 text-lg mt-4`}>
                Grow your own Identi-tree
                </p>
                <div className="flex justify-center mt-12">
                <WebtreeLogo />
                </div>
                <button 
                onClick={() => {
                    window.location.href = '/login'
                }}
                className="flex justify-center items-center bg-black text-white rounded-full px-8 py-2 mt-12 
                    mx-auto  hover:bg-gray-800 transition duration-300 ease-in-out hover:border-gray-800 hover:border-2
                    border-2 border-white
                ">
                    Get Started
                </button>
            </>
        );
}

export default Intro