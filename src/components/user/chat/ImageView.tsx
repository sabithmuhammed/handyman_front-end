import React from "react";
import { SlClose } from "react-icons/sl";

const ImageView = ({
    image,
    onCloseHandler,
}: {
    image: string;
    onCloseHandler: () => void;
}) => {
    return (
        <div className="fixed top-0 w-dvw h-dvh bg-black/80 z-50 left-0 p-14">
            <button onClick={onCloseHandler} className="absolute right-8 top-4">
                <SlClose size={30} color="white" />
            </button>
            <div
                className="w-full h-full"
            >
                <img
                    src={image}
                    alt=""
                    className="object-contain w-full h-full rounded-md"
                />
            </div>
        </div>
    );
};

export default ImageView;
