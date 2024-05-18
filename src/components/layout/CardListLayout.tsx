import React from "react";
import Search from "../user/common/Search";
import { Outlet } from "react-router-dom";
import Button from "../user/common/Button";
import { TbCurrentLocation } from "react-icons/tb";
import { FaMapLocationDot } from "react-icons/fa6";

const CardListLayout = () => {
    return (
        <div className="max-w-7xl md:px-3 w-full h-dvh md:pt-28 pt-20 relative flex flex-col pb-5">
            <form className="grid md:grid-cols-3 h-12 gap-x-3 mt-2 md:mt-0 sticky md:top-28 top-20">
                <Search />
                <div className="grid md:grid-cols-3 h-full gap-x-3">
                    <Button text="Search" />
                    <Button
                        text="Current location"
                        icon={<TbCurrentLocation size={25} />}
                    />
                    <Button
                        text="Select location"
                        icon={<FaMapLocationDot size={25} />}
                    />
                </div>
                <div className="">sort filter</div>
            </form>
            <div className="w-full h-full bg-slate-300 mt-3 rounded-md">
                <Outlet />
            </div>
        </div>
    );
};

export default CardListLayout;
