"use client";


import Image from "next/image";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { User } from "../components/User"

import axios from "axios";
import { useUserStore } from "@/store/user";
import { useEffect, useState } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { BE_URL } from "./_app";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";



const inter = Inter({ subsets: ["latin"] });
const grotesk = Familjen_Grotesk({ subsets: ["latin"] });




export default function Home() {

    const router = useRouter()
  const { token, wallet } = useUserStore();
  const address = useAddress();
 const [userInfo, setUserInfo] = useState<any>({
  userData: false,
  proofs: false,
 });

 useEffect(() => {
    if(router.isReady){
        fetchUserInfo({username: router.query.username as string})
        }
    }
    , [router.isReady, router.query.username])

 const parseProofs = (proofs:any) => {
  switch(proofs?.type){
    case "google-login":
      const data = JSON.parse(proofs?.verification?.parameters);
      return {
        company: data?.emailAddress?.split("@")[1], 
        name: data?.emailAddress?.split("@")[0],
        email: data?.emailAddress,
        timestamp: proofs?.updatedAt,
        isVerified: proofs?.isVerified
      }
  }
 }

  const fetchUserInfo = async(
    {
        username
    }: {
        username: string
    }
  ) => {
    try{
      const response = await axios.get(`${BE_URL}user/fetch/${username}`,{
      })

      console.log(response)
      const dataCheck = await parseProofs(response?.data?.data?.proofs[0])

      setUserInfo({
        userData: response?.data?.data?.user,
        proofs: dataCheck,
      })

      console.log(userInfo)
      
    }
    catch(error){
      console.log(error)
    }
  }
  const GetVerificationLink = async() => {

    try{
      const response = await axios.post(`${BE_URL}reclaim/request`,{
        type: "google-login"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response?.data?.data?.redirectURL
    }
    catch(error){
      console.log(error)
    }
  }

 



  const Links = () => {
    return (
      <section className="fle w-full px-[25px] py-[12px]">
        <span className="flex items-center justify-between mb-[16px]">
          <h3 className="text-[24px] font-bold">My Links :)</h3>
          {/* <p className="text-[18px] font-bold">12</p> */}
        </span>
        <div className="flex flex-col gap-[12px] ">
          <Link 
            name={userInfo?.proofs?.email || "Email not yet verified"}
            isVerified={userInfo?.proofs?.isVerified || false}
            timestamp={userInfo?.proofs?.timestamp || false}
          />
          {/* <Link /> */}
          {/* <AddMore /> */}
        </div>
      </section>
    );
  };
  
  const Link = (data:any) => {
    return (
      <button className="flex flex-col db-border items-center py-[12px]  w-full"
        onClick={() => {}}
      >
        <h1 className="flex items-center text-[18px] font-semibold">
          {/* <svg
            className="mr-2"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="14"
            fill="none"
            viewBox="0 0 16 14"
          >
            <path
              fill="#000"
              d="M13.829 2.786a3.135 3.135 0 001.376-1.73 6.264 6.264 0 01-1.987.758A3.135 3.135 0 007.884 4.67a8.883 8.883 0 01-6.448-3.27 3.135 3.135 0 00.968 4.178 3.118 3.118 0 01-1.416-.392v.04a3.13 3.13 0 002.51 3.067c-.46.125-.944.144-1.413.054a3.135 3.135 0 002.923 2.173 6.277 6.277 0 01-3.886 1.339c-.25 0-.5-.014-.747-.043a8.856 8.856 0 004.796 1.406 8.842 8.842 0 008.902-8.903c0-.136-.003-.27-.01-.405a6.356 6.356 0 001.563-1.62c-.571.253-1.177.42-1.797.493z"
            ></path>
          </svg> */}
          {data?.name}
        </h1>
        {data?.isVerified ? 
        <p className="text-[#18181880] text-[10px]">Verified on {new Date(data?.timestamp).toLocaleString()}</p> : "" }
      </button>
    );
  };
  return (
    <>
    <Toaster />
    <section
      className={`${grotesk.className} flex w-full min-h-screen  justify-center items-center `}
    >
      <section className="flex flex-col items-center w-[390px] h-[700px]   rounded-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="126"
          height="31"
          fill="none"
          viewBox="0 0 126 31"
          className="mt-[25px]"
        >
          <path
            fill="#181818"
            d="M18.677 1.11a.387.387 0 01.736 0l1.96 5.914a9.688 9.688 0 006.148 6.148l5.914 1.96a.387.387 0 010 .736l-5.914 1.96a9.688 9.688 0 00-6.149 6.148l-1.96 5.914a.387.387 0 01-.735 0l-1.96-5.914a9.688 9.688 0 00-6.148-6.148l-5.914-1.96a.387.387 0 010-.736l5.914-1.96a9.688 9.688 0 006.148-6.148l1.96-5.914z"
          ></path>
          <path
            fill="#181818"
            d="M37.451 15.984c0 4.548-8.24 8.235-18.406 8.235-10.166 0-18.406-3.687-18.406-8.235 0-4.547 8.24-8.234 18.406-8.234 10.165 0 18.406 3.687 18.406 8.234zm-33.585 0c0 3.75 6.796 6.791 15.179 6.791s15.179-3.04 15.179-6.79c0-3.751-6.796-6.791-15.18-6.791-8.382 0-15.178 3.04-15.178 6.79zM44.594 1.49h2.882l1.67 18.633.131 6.632h.23l.294-6.631 1.67-18.635h4.258l1.769 18.634.196 6.632h.23l.196-6.631 1.605-18.635h2.882l-2.882 28.022h-4.061L53.6 4.105 51.57 29.51h-4.094L44.594 1.489zM72.78 27.316v2.195h-5.928c-2.194 0-3.668-.911-3.668-2.499V7.607c0-1.564 1.54-2.615 3.766-2.615h2.751c1.573 0 2.85.7 2.85 2.242v14.991L68.162 24.7l-1.768.21v2.242c0 .63.59.981 1.44.888l4.455-.981c.295-.047.491.047.491.257zm-3.275-5.208V8.004c0-.98-.491-1.448-1.572-1.448-1.048 0-1.54.468-1.54 1.448V23.37l1.343-.093 1.769-1.168zM74.189 29.51V1.49h3.21v6h.229c.49-1.377 1.473-2.732 3.439-2.732 1.473 0 2.685.724 2.685 2.733v18.704l-3.635 3.316h-5.928zm3.21-19.334v17.653h2.128l1.016-.887V8.845c0-1.354-.688-1.821-1.376-1.821-1.277 0-1.638 1.704-1.769 3.152zM86.535 1.49h3.373c.197 0 .295.093.23.233l-1.343 3.035c-.066.14 0 .234.196.234h3.505v1.705h-2.752v20.362c0 .56.426.817.95.817.164 0 .295-.023.426-.047l1.9-.84c.261-.094.425 0 .425.21v2.312h-3.242c-2.195 0-3.668-1.051-3.668-2.616V6.697h-1.867V4.992h1.867V1.489zM94.626 4.992h3.21V7.49h.197c.49-1.378 1.506-2.733 3.471-2.733 1.441 0 2.653.818 2.653 2.943v2.078l-2.948 2.592c-.163.117-.262.07-.262-.094V8.845c0-1.354-.687-1.821-1.375-1.821-1.376 0-1.638 1.844-1.736 3.152V29.51h-3.21V4.99zM114.455 27.316v2.195h-5.928c-2.194 0-3.668-.911-3.668-2.499V7.607c0-1.564 1.539-2.615 3.766-2.615h2.751c1.572 0 2.85.7 2.85 2.242v14.991l-4.389 2.475-1.769.21v2.242c0 .63.59.981 1.442.888l4.454-.981c.294-.047.491.047.491.257zm-3.275-5.208V8.004c0-.98-.491-1.448-1.572-1.448-1.048 0-1.54.468-1.54 1.448V23.37l1.343-.093 1.769-1.168zM125.361 27.316v2.195h-5.928c-2.194 0-3.668-.911-3.668-2.499V7.607c0-1.564 1.54-2.615 3.767-2.615h2.751c1.572 0 2.849.7 2.849 2.242v14.991l-4.388 2.475-1.769.21v2.242c0 .63.589.981 1.441.888l4.454-.981c.295-.047.491.047.491.257zm-3.275-5.208V8.004c0-.98-.491-1.448-1.572-1.448-1.048 0-1.539.468-1.539 1.448V23.37l1.343-.093 1.768-1.168z"
          ></path>
        </svg>
        <User
          wallet={userInfo?.userData?.wallet || ""}
          company={userInfo?.proofs?.company || "not verified"}
          name={userInfo?.userData?.username || false}
          email={userInfo?.proofs?.email || false}
          bio={userInfo?.userData?.bio || false}
        />
        <Links

        />
      </section>
    </section>
    </>
  );
}
