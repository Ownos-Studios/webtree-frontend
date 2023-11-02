import Tick from "@/assets/tick";
import Close from "@/assets/close";
import React from "react";
import axios from "axios";
import { BE_URL } from "@/pages/_app";
import { useUserStore } from "@/store/user";
import useStore from "@/store/useStore";



export const Requests = (data:any) => {
 
 
  
  return (
    <div className="py-6 absolute bottom-0 flex flex-col w-[500px] bg-[#FCFFF7] border border-black rounded-[24px]">
      <span className="flex justify-between items-center px-6">
        <h1 className="text-[30px] font-bold">Verification Requests</h1>
       
      </span>
      <div>
      {console.log(data)}
       {data?.data?.reVerifyRequest?.
       filter((v:any) => v.status === "pending")?.
       map((v: any) => 
           (
            <Req data={v} key={v} id={data?.data?.id}/>
          )
        )}
      </div>
    </div>
  );
};

function Req({data,id}:{data:any,id:string}) {
  const token = useStore(useUserStore, (state) => state.token);
  const GetVerificationLink = async ({id,wallet,status}:{
    id:string,
    wallet:string,
    status:string
  }) => {
    try {
      const response = await axios.post(
        `${BE_URL}reclaim/reverify`,
        {
          id: id,
          requestedWallet: wallet,
          status: status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response?.data?.data?.redirectURL;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span className="flex items-center px-6 pb-2 border-b-2 mt-[20px]">
      <p>
        <strong>{data?.wallet?.slice(0,6) + "..." + data?.wallet?.slice(-2)}</strong> wants to verify your profle
      </p>
      <span className="flex ml-auto gap-[30px]">
        <button onClick={async() => {
          const url = await GetVerificationLink({
            id:id,
            wallet:data?.wallet,
            status:"accept"
          })
          if (url) {
            window?.innerWidth > 768
              ? window.open(window.location + "/user/qr?code=" + url, "_blank")
              : navigator.userAgent.match(/(iPod|iPhone|iPad)/)
              ? window.open(url, "_top")
              : window.open(url, "_blank");
          }
        }}>
        <Tick />
        </button>
        <button onClick={async() =>  
         await  GetVerificationLink({
            id:id,
            wallet:data?.wallet,
            status:"declined"
          })
        }>
        <Close />
        </button>
      </span>
    </span>
  );
}
