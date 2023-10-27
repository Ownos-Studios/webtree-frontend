import React, { useEffect, useState } from "react";

import Image from "next/image";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { useUserStore } from "@/store/user";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import { useRouter } from "next/router";
import useStore from "@/store/useStore";
import { useAccount } from "wagmi";

const inter = Inter({ subsets: ["latin"] });
const grotesk = Familjen_Grotesk({ subsets: ["latin"] });
interface indexProps {}

const BE_URL = process.env.BE_URL;
const steps = {
  SET_NAME: "set_name",
  SET_USERNAME: "set_username",
  SET_BIO: "set_bio",
};
const UserOnBoard: React.FC<indexProps> = ({}) => {
  const router = useRouter();
  const { address } = useAccount();
  const { setUserInfo } = useUserStore();
  const userInfo = useStore(useUserStore, (state) => state.userInfo) as any;

  const nameExists =
    userInfo?.firstName?.length > 0 && userInfo?.lastName.length > 0;

  const [currentstep, setstep] = useState(steps.SET_BIO);

  useEffect(() => {
    if (nameExists && currentstep == steps.SET_NAME) {
      setstep(steps.SET_USERNAME);
    }
  }, [nameExists]);

  return (
    <>
      <Toaster position="top-right" />
      <section
        className={`flex w-full h-screen justify-center items-center ${grotesk.className} leading-[48px]`}
      >
        {currentstep == steps.SET_NAME && <NamePick />}
        {currentstep == steps.SET_USERNAME && <UsernamePick />}
        {currentstep == steps.SET_BIO && <BioPick />}
      </section>
    </>
  );
};

const UsernamePick = () => {
  const router = useRouter();
  const { setUserInfo } = useUserStore();
  const [userState, setUserState] = useState<any>({
    username: "",
  });

  const token = useStore(useUserStore, (state) => state.token) as string;

  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);

  const userNameAvailablityCheck = async () => {
    try {
      const res = await axios.get(
        `${BE_URL}user/check?username=${userState.username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        setUsernameAvailable(true);
        return true;
      } else {
        setUsernameAvailable(false);
        return false;
      }
    } catch (error) {
      console.log(error);
      setUsernameAvailable(false);
      return false;
    }
  };

  const userInfo = useStore(useUserStore, (state) => state.userInfo) as any;

  const updateUserInfo = async () => {
    try {
      const res = await axios.post(
        `${BE_URL}user/update`,
        {
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          username: userState.username,
          bio: "",
          tags: [],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("user info updated");
        router.push(`/`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col w-[340px] items-center">
      <h1 className={"text-[48px] font-bold text-center"}>Select a username</h1>
      <p className="text-center text-[16px] leading-6 mt-[12px] text-[#575A5C]">
        This uername will be used as your shareable webtree link
      </p>
      <span className="flex flex-col mt-[48px]">
        <label
          className="flex rounded-[12px] bg-[#D6E0EA] h-[48px] w-[340px] px-[12px]"
          htmlFor=""
        >
          <input
            onChange={(e) => {
              setUserState({ ...userState, username: e.target.value });
              userNameAvailablityCheck();
            }}
            value={userState.username}
            className="rounded-[12px] flex flex-1 bg-[#D6E0EA] h-[48px] w-[340px] px-[12px]"
            type="text"
            placeholder="Enter firstname"
          />
          <p className="font-bold text-red-600">.tree</p>
        </label>
        {userState?.username?.length > 0 ? (
          usernameAvailable ? (
            <p className="text-[18px] font-bold text-green-600 text-center">
              Username Available
            </p>
          ) : (
            <p className="text-[18px] font-bold text-green-600 text-center">
              Username Available
            </p>
          )
        ) : (
          ""
        )}
      </span>
      <button
        onClick={() => {
          if (userState.username?.length > 0) {
            if (usernameAvailable) {
              setUserInfo({ ...userInfo, ...userState });
              updateUserInfo();
            } else {
              toast.error("username not available");
            }
          } else {
            if (userState.username?.length === 0) {
              toast.error("please enter your username");
            }
          }
        }}
        className="black-btn text-white w-[340px] mt-[48px] h-[68px]"
      >
        Continue
      </button>
    </div>
  );
};

const NamePick = () => {
  const { setUserInfo, userInfo } = useUserStore();
  const [userState, setUserState] = useState<any>({
    firstName: "",
    lastName: "",
    email: "",
  });

  return (
    <div className="flex flex-col w-[340px] items-center">
      <h1 className={"text-[48px] font-bold text-center"}>Enter your name</h1>
      <p className="text-center text-[16px] leading-6 mt-[12px] text-[#575A5C]">
        This uername will be used as your shareable webtree link
      </p>
      <span className="flex flex-col mt-[48px]">
        <label htmlFor="">
          <h1 className="text-[20px]">Firstname</h1>
          <input
            className="rounded-[12px] bg-[#D6E0EA] h-[48px] w-[340px] px-[12px]"
            type="text"
            placeholder="Enter firstname"
            required
            value={userState.firstName}
            onChange={(e) =>
              setUserState({ ...userState, firstName: e.target.value })
            }
          />
        </label>

        <label className="mt-[18px]" htmlFor="">
          <h1 className="text-[20px]">Lastname</h1>
          <input
            className="rounded-[12px] bg-[#D6E0EA] h-[48px] w-[340px] px-[12px]"
            type="text"
            placeholder="Enter lastname"
            required
            value={userState.lastName}
            onChange={(e) =>
              setUserState({ ...userState, lastName: e.target.value })
            }
          />
        </label>
      </span>
      <button
        onClick={() => {
          if (
            userState.firstName?.length > 0 &&
            userState.lastName?.length > 0
          ) {
            setUserInfo({ ...userInfo, ...userState });
          } else {
            if (userState.firstName?.length === 0) {
              toast.error("please enter your first name");
            } else if (userState.lastName?.length === 0) {
              toast.error("please enter your last name");
            }
          }
        }}
        className="black-btn text-white w-[340px] mt-[48px] h-[68px]"
      >
        Continue
      </button>
    </div>
  );
};

const BioPick = () => {
  return (
    <div className="flex flex-col w-[340px] items-center">
      <h1 className={"text-[48px] font-bold text-center"}>
        Add More to your profile
      </h1>
      <p className="text-center text-[16px] leading-6 mt-[12px] text-[#575A5C]">
        Update your Profile section with your information
      </p>
      <span className="flex flex-col mt-[48px]">
        <label htmlFor="">
          <p className="text-[14px] text-[#575A5C]">
            You can select up to 4 tags
          </p>
          <input
            className="rounded-[12px] bg-[#D6E0EA] h-[48px] w-[340px] px-[12px]"
            type="text"
            placeholder="Enter tags"
            required
          />
        </label>
        <div className="flex flex-wrap  mt-2 w-fullv gap-2">
          <Tag title={"Product Designer"} />
          <Tag title={"Graphic Designer"} />
          <Tag title={"Product Design Lead"} />
        </div>
        <label htmlFor="">
          <p className="text-[14px] text-[#575A5C]">Write a Bio</p>
          <textarea
            rows={3}
            className="rounded-[12px] bg-[#D6E0EA]  w-[340px] px-[12px]"
            placeholder="Start"
            required
          />
        </label>
      </span>
      <p className="text-[18px] text-[#575A5C]">Skip</p>
      <button className="black-btn text-white w-[340px] mt-[24px] h-[68px]">
        Continue
      </button>
    </div>
  );
};

const Tag = ({ title }: { title: String }) => {
  return (
    <span className="h-[39px] px-[10px] gap-2 flex border border-black rounded-[40px] justify-center items-center w-min">
      <p className="w-max">{title}</p>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="17"
        viewBox="0 0 16 17"
        fill="none"
      >
        <path
          d="M9.99967 6.5L5.99967 10.5M5.99967 6.5L9.99967 10.5M14.6663 8.5C14.6663 12.1819 11.6816 15.1667 7.99967 15.1667C4.31778 15.1667 1.33301 12.1819 1.33301 8.5C1.33301 4.8181 4.31778 1.83334 7.99967 1.83334C11.6816 1.83334 14.6663 4.8181 14.6663 8.5Z"
          stroke="black"
          stroke-width="1.33333"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
  );
};

export default UserOnBoard;
