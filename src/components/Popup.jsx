import React, { useState } from 'react'
import { MdClose } from "react-icons/md";
import axios from 'axios'
// import { baseURL } from '../utils/constant'
import { motion } from "framer-motion"
const Popup = ({setShowPopup, popupContent, setChg}) => {
    const [updateVal, setUpdateVal] = useState(popupContent.taskVal);
    const updateTodo = async ()=>{
        try{
            let data = await axios.put(`${import.meta.env.VITE_BASE_URL}/update/${popupContent.id}`, {"toDo": updateVal})
            if(data){
                setShowPopup(false);
                setChg((prevState)=>!prevState);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    const close = ()=>{
        setShowPopup(false);
    }

    return (
        <>
            <motion.div className='h-full w-80 wrapper backdrop-blur-sm mx-12 md:mx-[100px] bg-[#374151] lg:mx-[200px] text-white text-xs sm:text-base md:text-lg font-light rounded-md py-1 px-8 mt-8'
                initial={{opacity:0}}
                animate={{opacity:1, scale:1}}
                transition={{duration:1}}
            >
                <div className="cross flex justify-end"><MdClose onClick={close} className='mt-1 hover:cursor-pointer'/></div>
                <div className="input flex justify-center">
                    <motion.input type="text" value={updateVal}onChange={(e)=>setUpdateVal(e.target.value)}
                        placeholder="Add a task" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 justify-self-center mt-2"
                        required
                        whileHover={{
                            scale:1.1,
                            transition:{duration:0.1}
                        }}
                        whileFocus={{ scale: 1.1 }}
                    >
                    </motion.input>
                </div>
                <div className="submit flex justify-end">
                    <motion.button type="submit" onClick={updateTodo}
                    className="ml-8 text-white bg-[#D63484] font-medium rounded-lg text-sm text-center p-2 mt-2"
                    whileHover={{
                        scale:1.2,
                        transition:{duration:0.1}
                      }}
                    >
                    Update
                    </motion.button>
                </div>
            </motion.div>
        </>
    )
}

export default Popup