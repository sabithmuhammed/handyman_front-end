import React from "react";
import heroImg from "../../../assets/hero.jpg";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
    return (
        <div className="w-full h-[500px] bg-indigo-950 rounded-3xl overflow-hidden">
            <img
                src={heroImg}
                className="w-full h-full object-cover rounded-b-3xl"
                alt=""
            />
        </div>
    );
};

export default Hero;
