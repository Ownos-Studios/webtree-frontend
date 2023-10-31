import React from 'react'
import LinkBtn from '../LinkBtn';

interface indexProps {
    state: boolean;
    setState: (state: boolean) => void;
    providers: any[];
    links: any;
}



const Modal: React.FC<indexProps> = ({state,setState,providers,links}) => {
    
        if(!state) return null
        return (
            <>
                <div
      id="default-modal"
    
      aria-hidden="true"
        className="fixed inset-0 z-50 flex w-full h-full  bg-[#00000080] overflow-x-hidden overflow-y-auto outline-none focus:outline-none 
        backdrop-blur
        "
    >

     <div className='w-3/4 md:w-1/2
        mx-auto my-auto mt-12
     h-full  
        items-center justify-center
    '> <button onClick={()=>setState(false)} className='mt-12 bg-white text-black px-4 py-2 rounded-md mr-auto mb-12
    float-right
 '>
     X
    </button>
        
      
      {links}

      
        {
            providers?.length > 0 && 
            <h1
            className='text-md text-white font-bold
            text-center mt-12
            '
         >

            Availabe providers (more coming soon)
         </h1>
        
        }
        {
            providers?.length === 0 &&
            <h1
            className='text-md text-white font-bold
            text-center mt-12
            '
            >
                More providers coming soon
            </h1>

        }
       
        </div>
        
    </div>
    
            </>
        );
}

export default Modal