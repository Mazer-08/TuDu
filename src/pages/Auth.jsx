import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"
// import { baseURL } from "../utils/constant";
import axios from 'axios'

const Auth = () => {
	//login
	const [userName, setUserName] = useState("");
	const [pw, setPw] = useState("");
	const navigate = useNavigate();

	const handleUserLogin = async ()=>{
		event.preventDefault();
		const userData = {
			"username": userName,
			"password": pw
		}
		try {
			let user = await axios.post(`${import.meta.env.VITE_BASE_URL}/login`, userData);
			if(user && user.status===200){
				localStorage.setItem("SavedToken", user.data.token);
				console.log(user.data.msg);
			}
			setUserName("");
			setPw("");
			navigate(`/homepage`)
		} catch (error) {
			console.log(error);
			if(error.response.data.loginErr==1){
				window.alert(error.response.data.msg);
				setUserName("");
				setPw("");
			}
			if(error.response.data.loginErr==2){
				window.alert(error.response.data.msg);
				setPw("");
			}
		}
	}

	//register
	const [regUserName, setRegUserName] = useState("");
	const [regPw, setRegPw] = useState("");
	const [regRePw, setRegRePw] = useState("");

	const handleUserRegister = async ()=>{
		event.preventDefault();
		if(regPw === regRePw){
			const userData = {
				"username": regUserName,
				"password": regPw
			}
			try {
				let res = await axios.post(`${import.meta.env.VITE_BASE_URL}/register`, userData);
				console.log(res.data.msg);
				window.alert("Login to Continue :)")
			} catch (error) {
				console.log(error.response.data);
				window.alert(error.response.data.error)
			}
			setRegUserName("");
		}
		else{
			window.alert("Passwords do not match.")
		}
		setRegPw("");
		setRegRePw("");
	}

	return (
		<>
		<motion.div className="wrapper h-screen flex gap-12 justify-center items-center"
			initial={{opacity:0, x: "-100vw"}}
			animate={{opacity:1, scale:1, x: 0}}
			transition={{duration:1.5}}
		>
			<form className="login grid grid-cols-1 gap-4">
				<h1 className="text-[2vw] font-bold text-center text-[#F8F4EC] mb-4">Login</h1>
				<div className="username grid grid-cols-2">
					<label htmlFor="username" className="text-[#ffffff]">Username</label>
					<motion.input
						whileHover={{
							scale:1.1,
							transition:{duration:0.1}
						}}
						whileFocus={{ scale: 1.1 }}
						value={userName}
						onChange={(e) => {setUserName(e.target.value);}}
						type="text"
						name="username"
						className="rounded-sm px-2 py-1 focus:outline-none"
					/>
				</div>
				<div className="pw grid grid-cols-2">
					<label htmlFor="pw" className="text-[#ffffff]">Password</label>
					<motion.input 
						whileHover={{
							scale:1.1,
							transition:{duration:0.1}
						}}
						whileFocus={{ scale: 1.1 }}
						value={pw} 
						onChange={(e)=>{setPw(e.target.value);}} 
						type="password" 
						name="pw" 
						className="rounded-sm px-2 py-1 focus:outline-none"
					/>
				</div>	
				<motion.button
					whileHover={{
						scale:1.2,
						transition:{duration:0.1}
					}}
					type="submit"
					onClick={handleUserLogin}
					className="w-[7vw] mx-auto text-white bg-[#D63484] font-medium rounded-lg text-sm text-center p-2 mt-2"
				>
					Login
				</motion.button>
			</form>
			<form className="register grid grid-cols-1 gap-4">
				<h1 className="text-[2vw] font-bold text-center text-[#F8F4EC] mb-2">Register</h1>
				<div className="username grid grid-cols-2">
					<label htmlFor="username" className="text-[#FFffff]">Username</label>
					<motion.input
						whileHover={{
							scale:1.1,
							transition:{duration:0.1}
						}}
						whileFocus={{ scale: 1.1 }}
						value={regUserName}
						onChange={(e)=>{setRegUserName(e.target.value)}}
						type="text" 
						name="username" 
						className="rounded-sm px-2 py-1 focus:outline-none" 
						required>
					</motion.input>
				</div>
				<div className="pw grid grid-cols-2">
					<label htmlFor="regPw" className="text-[#FFffff]">Password</label>
					<motion.input 
						whileHover={{
							scale:1.1,
							transition:{duration:0.1}
						}}
						whileFocus={{ scale: 1.1 }}
						value={regPw} 
						onChange={(e)=>{setRegPw(e.target.value)}}
						type="password" 
						name="regPw" 
						className="rounded-sm px-2 py-1 focus:outline-none"
						required >
					</motion.input>
				</div>
				<div className="repw grid grid-cols-2">
					<label htmlFor="regRePw" className="text-[#FFffff]">Re-enter Password</label>
					<motion.input 
						whileHover={{
							scale:1.1,
							transition:{duration:0.1}
						}}
						whileFocus={{ scale: 1.1 }}
						value={regRePw}
						onChange={(e)=>{setRegRePw(e.target.value)}}
						type="password" 
						name="regRePw" 
						className="rounded-sm px-2 py-1 focus:outline-none"
						required>
					</motion.input>
				</div>
				<motion.button
					whileHover={{
						scale:1.1,
						transition:{duration:0.1}
					}}
					type="submit"
					onClick={handleUserRegister}
					className="w-[7vw] mx-auto text-white bg-[#D63484] font-medium rounded-lg text-sm text-center p-2 mt-2"
				>
					Register
				</motion.button>
			</form>
		</motion.div>
		</>
	);
	};

	export default Auth;
