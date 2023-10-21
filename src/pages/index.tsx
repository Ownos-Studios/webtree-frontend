"use client";
import Intro from "@/components/intro"
import Home from "./home"
import { useUserStore } from "@/store/user"
import { useEffect } from "react";
import useStore from "@/store/useStore";




export default function Main() {

  const token = useStore(useUserStore, (state) => state.token)


 
  return (
    <>
      {token && token?.length > 0 ? <Home/> : <Intro/>}
    </>
  );
}
