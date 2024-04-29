import React from "react";
import Navbar from "../../components/layout/Navbar";
import Hero from "../../components/user/home/Hero";
import HomeStatistics from "../../components/user/home/HomeStatistics";

const UserHome = () => {
    return (
        <div className="flex flex-col items-center  w-full h-[2000px]  ">
            <Navbar />
            <Hero />
            <HomeStatistics />
        </div>
    );
};

export default UserHome;
