import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/animation/beatLoader.json";

export const Infinityloading = () => {
    return (
        <div className=" relative h-[40px] flex justify-center items-center overflow-hidden">
            <Lottie
                animationData={loading}
                loop={true}
                className="h-[200px] w-[200px] absolute top-auto left-auto right-auto bottom-auto"
            />
        </div>
    );
};
