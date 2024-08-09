import React from "react";
import gearLoading from "../../assets/animation/gearLoading.json";
import Lottie from "lottie-react";

export const GearLoading = () => {
    return (
        <div className="flex w-[200px]">
            <Lottie animationData={gearLoading} loop={true} className="" />
        </div>
    );
};
