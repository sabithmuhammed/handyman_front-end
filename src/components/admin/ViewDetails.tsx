import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import ButtonAdmin from "./ButtonAdmin";
const ViewDetails = ({name,skills,idProof,profile,wage,experience,setShowDetails}) => {
    return (
        <div className="absolute z-10 w-full h-dvh bg-opacity-35 bg-slate-400 top-0 left-0 flex items-center justify-center">
            <div className="text-black w-[650px] bg-white min-h-[300px] p-6 rounded-lg flex flex-col">
                <div className="self-end mb-4" onClick={()=>setShowDetails(false)}>
                    <IoCloseOutline size={30} />
                </div>
                <div className="flex justify-center">
                    <div className="w-[150px] h-[150px] bg-slate-200 me-5">
                        <img src={profile} alt="" className="object-contain w-full h-full"/>
                    </div>
                    <div className="w-[400px] h-[250px] bg-slate-200">
                        <img src={idProof} alt="" className="object-contain w-full h-full"/>
                    </div>
                </div>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="name"
                        value={name}
                        readOnly
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Full name
                    </label>
                </div>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="name"
                        value={skills.reduce((acc, cur) => acc + ", " + cur)}
                        readOnly
                    />
                    <label
                        htmlFor="Skills"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Skills
                    </label>
                </div>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="name"
                        value={experience+" yrs"}
                        readOnly
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Experience
                    </label>
                </div>
                <div className=" w-full my-5 relative">
                    <input
                        type="text"
                        className=" border-gray-400 h-9 w-full border-b-2 focus:outline-none indent-2 peer"
                        placeholder=""
                        id="name"
                        value={wage.amount+ " / "+wage.type}
                        readOnly
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm left-0 -top-3 px-2 rounded-md text-indigo-950 peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-[6px] peer-placeholder-shown:text-base peer-placeholder-shown:bg-transparent peer-focus:text-sm peer-focus:left-0 peer-focus:-top-3 peer-focus:rounded-md peer-focus:text-indigo-950  transition-all ease-in"
                    >
                        Wage
                    </label>
                </div>
                <div className=" self-center">
                    <ButtonAdmin text="close" color="bg-gray-500" onClick={()=>setShowDetails(false)}/>
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;
