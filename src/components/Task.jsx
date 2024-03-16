import React from 'react'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
// import {baseURL} from '../utils/constant'
import axios from 'axios'
import { motion } from "framer-motion"
const Task = ({taskVal, setChg, id, setShowPopup, setPopupContent}) => { 

    const deleteTodo = async () => {
            try {
                let data = await axios.delete(`${import.meta.env.VITE_BASE_URL}/delete/${id}`)
                if(data){
                    setChg((prevState)=>!prevState);
                }
            } catch (error) {
                console.log(error);
            }
    } 
    
    const updateKaro = () => {
        setShowPopup(true);
        setPopupContent({taskVal, id});
    }

  return (
    <>
        <motion.div className='mx-12 md:mx-[100px] lg:mx-[200px] bg-[#374151] text-white text-xs sm:text-base md:text-lg font-light rounded-md mt-2 py-1 px-2 flex justify-between'
            initial={{opacity:0}}
            animate={{opacity:1, scale:1}}
            transition={{duration:0.5}}
        >
            <div className="w-5/6 task overflow-auto">{taskVal}</div>
            <div className="options flex gap-1 self-center">
                <MdEdit className='hover:cursor-pointer' onClick={updateKaro}/>
                <MdDelete className='hover:cursor-pointer' onClick={deleteTodo}/>
            </div>
        </motion.div>
    </>
  )
}

export default Task