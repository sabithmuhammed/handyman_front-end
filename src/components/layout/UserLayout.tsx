import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../user/common/Navbar";
import Footer from "../user/common/Footer";
const UserLayout = () => {
    return (
        <div className="w-full xl:w-[1280px] mx-auto relative pt-6">
            <Navbar />
            <main className="min-h-dvh ">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
