import React from "react";
import { SlClose } from "react-icons/sl";
import { AnimatePresence, motion } from "framer-motion";

const ImageView = ({
    image,
    onCloseHandler,
}: {
    image: string;
    onCloseHandler: () => void;
}) => {
    return (
        <AnimatePresence>
            <motion.div
                className="fixed top-0 w-dvw h-dvh bg-black/50 z-50 left-0 p-14"
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 50 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
                <button
                    onClick={onCloseHandler}
                    className="absolute right-8 top-4"
                >
                    <SlClose size={30} color="white" />
                </button>
                <div className="w-full h-full">
                    <img
                        src={image}
                        alt=""
                        className="object-contain w-full h-full rounded-md"
                    />
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ImageView;

