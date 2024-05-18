import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import {
    RiArrowUpSLine,
    RiArrowDownSLine,
} from "react-icons/ri";
import { MdOutlineHandyman } from "react-icons/md";
import { LuCalendarDays } from "react-icons/lu";
import { FiSearch } from "react-icons/fi";
import { FaArrowRight } from "react-icons/fa";
type PropType = {
    children?:React.JSX.Element
}
const Filter = ({ children }:PropType) => {
    return (
        <div className="w-full pb-5 bg-indigo-950 rounded-3xl">
            {children && children}
            <div className={`w-full ${children ?'mt-5':'pt-20' } items-center flex justify-center `}>
                <div className="px-5 h-14 bg-white flex items-center rounded-md text-gray-900 mx-3">
                    <div className=""><IoLocationOutline size={20}/></div>
                    <p className="mx-3">Select location</p>
                    <div className=""><RiArrowDownSLine size={20} /></div>
                </div>
                <div className="px-5 h-14 bg-white flex items-center rounded-md text-gray-900 mx-3">
                    <div className=""><MdOutlineHandyman size={20}/></div>
                    <p className="mx-3">Select category</p>
                    <div className=""><RiArrowDownSLine size={20} /></div>
                </div>
                <div className="px-5 h-14 bg-white flex items-center rounded-md text-gray-900 mx-3">
                    <p className="mx-3">Pick a date</p>
                    <div className=""><LuCalendarDays size={20}/></div>
                </div>
                <div className="px-5 h-14 bg-yellow-300 flex items-center rounded-md text-black mx-3">
                    <p className="mx-3">Find tradesman</p>
                    <div className=""><FaArrowRight /></div>
                </div>
            </div>
        </div>
    );
};

export default Filter;
