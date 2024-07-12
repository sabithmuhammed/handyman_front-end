import Lottie from "lottie-react";
import React from "react";
import notFound from "../assets/animation/404.json";
import { Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
    return (
        <div className="h-screen w-screen grid place-items-center">
            <div className="h-[300px] w-[300px] flex flex-col ">
                <Lottie animationData={notFound} loop={true} className="" />
                <Text fontSize={"xl"} fontWeight={"bold"} align={"center"} color={"gray.700"}>
                    Page Not Found
                </Text>
                <button
                    type="button"
                    className="bg-white text-center w-48 rounded-2xl h-14 relative font-sans text-gray-700 text-xl font-semibold group mx-auto"
                    onClick={()=>navigate(-1)}
                >
                    <div className="bg-indigo-950 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500">
                        <svg
                            width="25px"
                            height="25px"
                            viewBox="0 0 1024 1024"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill="#fff"
                                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            ></path>
                            <path
                                fill="#fff"
                                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            ></path>
                        </svg>
                    </div>
                    <p className="translate-x-2">Go Back</p>
                </button>
            </div>
        </div>
    );
};

export default NotFound;
