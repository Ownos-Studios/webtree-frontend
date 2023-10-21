import React, { use, useEffect } from 'react'

import Image from "next/image";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { WebtreeLogo } from '@/assets';
import { ConnectKitButton } from "connectkit";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Familjen_Grotesk({ subsets: ["latin"] });
import { useAccount,useSignMessage } from 'wagmi';


import axios from 'axios';
import { useRouter } from 'next/router';
import { useUserStore } from '@/store/user';
import { BE_URL } from '@/pages/_app';
import useStore from '@/store/useStore';
interface indexProps {

}



const Login: React.FC<indexProps> = ({}) => {
     const { token, setToken,firtTimeLogin,setFirtTimeLogin,setUserInfo,userInfo} = useUserStore()
    const { address, isConnected} = useAccount();

    const router = useRouter()

    useEffect(() => {
        if(isConnected && token?.length > 0 ){
            //@ts-ignore
            firtTimeLogin ? router.push("/user/onboard") : router.push(`/`)
        }
    }
    , [isConnected, token, router, firtTimeLogin, address, userInfo])

   
    const { data, error, isLoading, signMessage } = useSignMessage({

        onSuccess: (data,variables) => {
           
            createOrLogin({sign: data, nonce: variables.message})
            
        }
      });


    const getNonce = async () => {
        try{
            const response = await axios.get(`${BE_URL}auth/nonce`)
          
            signMessage({message: response.data?.data?.nonce})
           
        }
        catch(error){
            console.log(error)
        }
    }

    const createOrLogin = async ({sign,nonce}: {
        sign: string;
        nonce: string;
    }) => {
        try{
            const response = await axios.post(`${BE_URL}auth/login`, {
                sign: sign,
                nonce: nonce,
            })
          
            setToken(response.data?.data?.token)
            setFirtTimeLogin(response.data?.data?.firstTimeLogin)
            if(!response.data?.data?.firstTimeLogin && response.data?.data?.data?.username?.length > 0){
                router.push(`/${response.data?.data?.data?.username}`)
            } else {
                router.push("/user/onboard")
            }
        }
        catch(error){
            console.log(error)
        }
    }


        return (
            <>
              <WebtreeLogo
                className='w-24 h-24 mx-auto mt-24'
              />
                <h1 className={`${grotesk.className} text-center  font-bold text-5xl text-black mt-12  
                    
                `}>
              Login your way

                </h1>
                <p className={`${inter.className} text-center text-black text-lg mt-2`}>
                Use either your Google account
                <br/>
                 or your preferred Wallet to Sign into Webtree
                </p>
                <div className="flex justify-center mt-12">
              
                </div>

                <div className="flex justify-center mt-12">
                    {
                        !isConnected ?  <ConnectKitButton
                        /> :                 <button className="flex justify-center items-center bg-white text-black rounded-full px-8 py-2 mt-12 
                        mx-auto hover:border-gray-800 hover:border-2 ease-in-out hover:bg-gray-200 transition duration-300
                        border-2 border-black
                    "
                    onClick={() => {
                        getNonce()
                    }}
                    >
                      Sign message to login
                    </button>
                    }
             
                </div>
            </>
        );
}

export default Login