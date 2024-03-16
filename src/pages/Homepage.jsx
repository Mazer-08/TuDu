import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Task from "../components/Task";
// import { baseURL } from "../utils/constant.js";
import axios from "axios";
import Popup from "../components/Popup.jsx";
import { motion } from "framer-motion"


const Homepage = () => {
  const navigate = useNavigate();

  const [task, setTask] = useState([""]);
  const [inVal, setInVal] = useState("");
  const [chg, setChg] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({});

  const token = localStorage.getItem("SavedToken");

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/get`,{ headers:{ Authorization:token }})
    .then((res)=>{
        if(res){
            setTask((prevTask)=>{
                return res.data;
            });
        }
    })
    .catch((error)=>{
        console.log(error);
    })
  }, [chg]);

  const addTask = async () => {
    event.preventDefault();
    const data = { toDo : inVal};
    try {
        let response = await axios.post(`${import.meta.env.VITE_BASE_URL}/save`, data, {headers : { Authorization : token }})
        if(response.status === 200){
            setInVal("");
            setChg((prevState)=>!prevState);
        }
    } catch (error) {
        console.log(error);
    }
  };

  const handleUserLogout = ()=>{
    localStorage.removeItem("SavedToken");
    console.log("User Logged Out");
    navigate('/');
  }

  return ( token ?
    <div className="wrapper mt-3 grid grid-cols-1 contents-center">
      {token && <motion.button whileHover={{scale:1.2, transition:{duration:0.1}}} onClick={handleUserLogout} className="absolute right-10 w-[7vw] mx-auto text-white bg-[#D63484] font-medium rounded-lg text-sm text-center p-2 mt-2">Log Out</motion.button>}
      <motion.h1 className="w-full text-center text-xl text-[#F8F4EC] font-semibold mb-1"
        initial={{opacity:0, y: "-10vh"}}
        animate={{opacity:1, scale:1, y: 0}}
        transition={{duration:1}}
      >
        TODO App
      </motion.h1>
      <motion.p className="w-full text-center text-xs text-[#FF9BD2] font-thin"
        initial={{opacity:0, y: "-10vh"}}
        animate={{opacity:1, scale:1, y: 0}}
        transition={{duration:1}}
      >
        Brought to you by{" "}
        <motion.span className=" font-medium text-[#F8F4EC]"
          initial={{opacity:0, y: "-10vh"}}
          animate={{opacity:1, scale:1, y: 0}}
          transition={{duration:1}}
        >
          M4Z3R
        </motion.span>
      </motion.p>

      <div className="addTask w-2/3 mx-auto mt-5">
        <form className="w-full max-w-md mx-auto flex gap-1 justify-between">
          <motion.input
            whileHover={{
							scale:1.1,
							transition:{duration:0.1}
						}}
						whileFocus={{ scale: 1.1 }}
            type="text"
            value={inVal}
            onChange={(e) => setInVal(e.target.value)}
            placeholder="Add a task"
            className="mr-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-5/6 justify-self-start"
            required
          ></motion.input>
          <motion.button
            whileHover={{
              scale:1.2,
              transition:{duration:0.1}
            }}
            type="submit"
            onClick={addTask}
            className="w-[7vw] mx-auto text-white bg-[#D63484] font-medium rounded-lg text-sm text-center ml-2 p-2"
          >
            Submit
          </motion.button>
        </form>
      </div>

      <div className="taskEntries">
        {task.map((el, index) => (
          <Task
            key={index}
            taskVal={el.toDo}
            setChg={setChg}
            id={el._id}
            setShowPopup={setShowPopup}
            setPopupContent={setPopupContent}
          />
        ))}
      </div>

      <div className="updates mx-auto">
        {showPopup && (
          <Popup
            initial={{opacity:0}}
            animate={{opacity:1, scale:1.1}}
            transition={{duration:1.5}}
            setShowPopup={setShowPopup}
            popupContent={popupContent}
            setChg={setChg}
          />
        )}
      </div>
    </div>
  : <Link to="/">
      <div className="w-full flex">
        <motion.button className="mx-auto align-items-center mt-20 text-white bg-[#D63484] font-medium rounded-lg text-sm text-center p-2"
          whileHover={{
            scale:1.2,
            transition:{duration:0.1}
          }}
        >
        Sign In to continue....
        </motion.button>
      </div>
    </Link>);
};

export default Homepage;
