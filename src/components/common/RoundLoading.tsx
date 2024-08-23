import React from "react";
import Lottie from "lottie-react";
import loading from "../../assets/animation/roundLoading.json";

const RoundLoading = () => {
    return (
        <div className="relative h-[60px] flex justify-center items-center bg-red-500">
            <Lottie
                animationData={loading}
                loop={true}
                className="h-[200px] w-[200px] absolute top-auto left-auto right-auto bottom-auto"
            />
        </div>
    );
};

export default RoundLoading;
