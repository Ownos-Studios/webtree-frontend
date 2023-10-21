import React, { useState } from 'react'

import Image from "next/image";
import { Inter, Familjen_Grotesk } from "next/font/google";
import { WebtreeLogo } from '@/assets';
import { useUserStore } from '@/store/user';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BE_URL } from '@/pages/_app';
import { useRouter } from 'next/router';
import useStore from '@/store/useStore';
import { useAccount } from 'wagmi';





const inter = Inter({ subsets: ["latin"] });
const grotesk = Familjen_Grotesk({ subsets: ["latin"] });
interface indexProps {

}



const UserOnBoard: React.FC<indexProps> = ({}) => {
    const router = useRouter()
   const { address } = useAccount()
        const { setUserInfo } = useUserStore()
        const userInfo = useStore(useUserStore, (state) => state.userInfo) as any
        
        const token = useStore(useUserStore, (state) => state.token) as string
        

        const [userState, setUserState] = useState<any>({
            firstName: '',
            lastName: '',
            email: '',
        })

        const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false)

        const userNameAvailablityCheck = async() => {
            try{
                const res = await axios.get(`${BE_URL}user/check?username=${userState.username}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if(res.status === 200){
                    setUsernameAvailable(true)
                    return true
                } else {
                    setUsernameAvailable(false)
                    return false
                }
            }
            catch(error){
                console.log(error)
                setUsernameAvailable(false)
                return false
            }
        }

        const updateUserInfo = async() => {
            try{
                const res = await axios.post(`${BE_URL}user/update`, {
                    firstName: userInfo.firstName,
                    lastName: userInfo.lastName,
                    username: userState.username,
                    bio: "",
                    tags: [],
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res)
                if(res.status === 200){
                    toast.success('user info updated')
                    router.push(`/`)
                }
            }
            catch(error){
                console.log(error)
            }   
        }

        return (
            <>
                <Toaster position='top-right' />

                {
                    userInfo?.firstName?.length > 0 && userInfo?.lastName.length > 0 
                 ? <>
                      <h1 className={`${grotesk.className} text-center  font-bold text-5xl text-gray-600 mt-12  
                    
                    `}>
                        Select a
                   <br/>
                    username
                    </h1>
                    <p className={`${inter.className} text-center text-gray-500 text-lg mt-4`}>
                    This uername will be used as <br/> your shareable webtree link
                    </p>
                    <div className="flex justify-center mt-12 
                        flex-col w-2/3 lg:w-1/3
                        mx-auto
                    ">
                    <label
                    className="text-gray-500
                        mb-2
                    "
                    >username</label>
                    <div className="flex flex-col w-full gap-2">
                    <input
                    required
                    placeholder='username'
                    onChange={(e) => {
                        setUserState({...userState, username: e.target.value})
                       userNameAvailablityCheck()
                    }}
                    value={userState.username}
                    type="text" className="border-2 border-gray-300 rounded-md px-4 py-4 mb-4 w-full"/>
                    {userState?.username?.length > 0
                    ?
                    usernameAvailable ? <p className="text-green-500">available</p> : <p className="text-red-500">not available</p> : ""}
                    </div>
                    </div>

                    <button 
                    onClick={() => {
                        if(userState.username?.length > 0 ){
                            if(usernameAvailable){
                                setUserInfo({...userInfo, ...userState})
                                updateUserInfo()
                            }
                            else {
                                toast.error('username not available')
                            }
                        }
                        else {
                            if(userState.username?.length === 0){
                                toast.error('please enter your username')
                            }
                        }
    
                    }}
                    className="flex justify-center items-center bg-black text-white rounded-full px-12 py-4 mt-12 
                        mx-auto  hover:bg-gray-800 transition duration-300 ease-in-out hover:border-gray-800 hover:border-2
                        border-2 border-white
                    ">
                        Continue
                    </button>
                
                 </> : 
                 <>

                <h1 className={`${grotesk.className} text-center  font-bold text-5xl text-gray-600 mt-12  
                    
                `}>
               Enter your
               <br/>
                name
                </h1>
                <p className={`${inter.className} text-center text-gray-500 text-lg mt-4`}>
                this just for some formality <br/> just to make sure you are not a bot
                </p>
                <div className="flex justify-center mt-12 
                    flex-col w-2/3 lg:w-1/3
                    mx-auto
                ">
                <label
                className="text-gray-500
                    mb-2
                "
                >First Name</label>
                <input
                required
                onChange={(e) => setUserState({...userState, firstName: e.target.value})}
                value={userState.firstName}
                type="text" className="border-2 border-gray-300 rounded-md px-4 py-4 mb-4"/>
                <label
                      className="text-gray-500
                      mb-2
                  "
                >Last Name</label>
                <input
                required
                onChange={(e) => setUserState({...userState, lastName: e.target.value})}
                type="text" className="border-2 border-gray-300 rounded-md px-4 py-4"/>

                </div>
                <button 
                onClick={() => {
                    if(userState.firstName?.length > 0 && userState.lastName?.length > 0){
                        setUserInfo({...userInfo, ...userState})
                    }
                    else {
                        if(userState.firstName?.length === 0){
                            toast.error('please enter your first name')
                        }
                        else if(userState.lastName?.length === 0){
                            toast.error('please enter your last name')
                        }
                    }

                }}
                className="flex justify-center items-center bg-black text-white rounded-full px-12 py-4 mt-12 
                    mx-auto  hover:bg-gray-800 transition duration-300 ease-in-out hover:border-gray-800 hover:border-2
                    border-2 border-white
                ">
                    Continue
                </button>
            </>
                }
            </>
        );
}

export default UserOnBoard