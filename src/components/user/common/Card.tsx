import React from "react";
import workerImg from "../../../assets/workerImg.png";
import Skills from "./Skills";
import { FaStar } from "react-icons/fa";
import { Tradesman } from "../../../types/stateTypes";
type CardType = {
    name: string;
    experience: number;
    skills: string[];
    wage: {
        amount: string;
        type: string;
    };
    distance: number;
};

const Card = ({ name, profile, skills }: Tradesman) => {
    const bgColors = [
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-red-200",
        "bg-indigo-200",
        "bg-orange-200",
        "bg-lime-200",
    ];
    const textColors = [
        "text-blue-200",
        "text-green-200",
        "text-yellow-200",
        "text-red-200",
        "text-indigo-200",
        "text-orange-200",
        "text-lime-200",
    ];
    const color = Math.floor(Math.random() * bgColors.length);

    return (
        <div className="h-[350px] bg-blue-100 rounded-2xl flex flex-col items-center">
            <div className="w-[calc(100%-40px)] h-[180px] mt-[15px]">
                <img src={profile} alt="" className=" rounded-t-lg object-cover w-full h-full"/>
            </div>
            <div
                className={`h-[140px] w-[calc(100%-20px)] ${bgColors[color]} rounded-xl flex flex-col items-center justify-between py-2`}
            >
                <h2 className="text-xl font-bold">{name}</h2>
                {skills.map((skill,index)=><p className="text-sm" key={index}>{skill}</p>)}
                
                <button
                    className={`rounded-full px-3 w-[calc(100%-30px)] bg-gray-900 py-1 ${textColors[color]}`}
                >
                    Go to profile
                </button>
            </div>
        </div>
    );
};

export default Card;
