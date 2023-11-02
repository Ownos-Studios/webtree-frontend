import EditIcon from "@/assets/edit";
import { useRouter } from "next/router";
import React from "react";
import PFPModal from "../modal/pfpModal";
import useStore from "@/store/useStore";
import { useUserStore } from "@/store/user";

interface profileType {
  name: string;
  username: string;
  bio: string;
  company: string;
  tags: string[]; 
  pfp: string | boolean;
}

function Profile({ name, username, bio, company, tags, pfp=false }: profileType) {
  const router = useRouter();
  const [modal, setModal] = React.useState(false);
  const token = useStore(useUserStore, (state) => state.token);
  return (
    <div className="flex w-full">
      <div className="relative flex flex-col rounded-[23.5px] p-[14.7px] w-full bg-[#D6E0EA]">
        {/* Profile Img */}
        <picture className="absolute right-[14.7px] top-[14.7px]">
  <img
    className="h-36 w-36 rounded-md border-[1.5px] border-black"
    src={pfp ?  pfp as string : "/user.png"}
    alt=""
  />
  {
    token && token?.length > 0 ?
  
  <button onClick={()=>{ setModal(true) }} className="w-[24px] h-[24px] bg-[#D6E0EA] p-[2px] rounded-[50%] cursor-pointer absolute right-0 bottom-0">
 <EditIcon
   
  />
  </button> : ""
  }
 
 
</picture>


        {/* Name */}
        <h1 className="text-[28px] font-semibold leading-7">{name}</h1>
        {/* username */}
        <p className="mt-4 flex justify-center items-center w-min text-[20px] px-3 py-[6px] font-semibold rounded-[235px] text-[#6E0BAB] bg-[#FFFFFF80]">
          @{username}
        </p>
        {/* bio */}
        <span className="flex gap-2 mt-[20px]">
          {bio ? (
            <>
              <p>{bio}</p>
            </>
          ) : 
          (
            <>
              <button
              onClick={()=>{ router.push('/user/onboard') }}
              className="bg-white p-[6px] rounded-[24px] text-[#575A5C] px-3">
                + Add Bio
              </button>
              <Placeholder />
            </>
          )
        
        }
        </span>
        <span className="flex items-center gap-2 mt-[18.8px]">
          <h3 className="text-[#575A5C] text-[24px] font-semibold">Works</h3>
          <h2 className="font-semibold text-[24px]">
            {company ? `@ ${company}` : "@Add your company"}
          </h2>
        </span>
        {tags?.length > 0 ? (
          <span className="flex  flex-wrap gap-1 mt-3">
            {tags.map((ele, key) => {
              return <Tag title={ele} key={key + "tag"} />;
            })}
          </span>
        ) :
        tags !== undefined ?
        (
          <button
          onClick={()=>{ router.push('/user/onboard') }}
          className="mt-[12px] bg-white p-[6px] rounded-[24px] w-fit text-[#575A5C] px-3 border border-[#A5BCB0]">
            + Add Tags
          </button>
        ) : ""}
      </div>
      <PFPModal state={modal} setState={setModal} />
    </div>
  );
}

const Tag = ({ title }: { title: string }) => {
  return (
    <span className="text-[18px] w-fit text-[#575A5C] font-medium bg-white p-[11.5px] px-[14px] rounded-[23.4px] border-[#A5BCB0] border-[1.5px]">
      {title}
    </span>
  );
};

const Placeholder = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="352"
      height="39"
      fill="none"
      viewBox="0 0 352 39"
    >
      <rect
        width="351.471"
        height="5.882"
        x="0.471"
        y="0.143"
        fill="#39779D"
        fillOpacity="0.2"
        rx="2.941"
      ></rect>
      <rect
        width="322.059"
        height="5.882"
        x="0.471"
        y="11.067"
        fill="#39779D"
        fillOpacity="0.2"
        rx="2.941"
      ></rect>
      <rect
        width="342.647"
        height="5.882"
        x="0.471"
        y="21.992"
        fill="#39779D"
        fillOpacity="0.2"
        rx="2.941"
      ></rect>
      <rect
        width="282.353"
        height="5.882"
        x="0.471"
        y="32.916"
        fill="#39779D"
        fillOpacity="0.2"
        rx="2.941"
      ></rect>
    </svg>
  );
};

export default Profile;
