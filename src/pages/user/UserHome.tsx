import React, { useEffect, useState } from "react";
import Hero from "../../components/user/home/Hero";
import Filter from "../../components/user/common/Filter";
import Card from "../../components/user/common/Card";
import { getAllTradesmen, getSkills } from "../../api/userApi";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { Skeleton, Text } from "@chakra-ui/react";
import SkillSkeleton from "../../components/skeletons/SkillSkeleton";
import { Tradesman } from "../../types/stateTypes";
import { RxClock } from "react-icons/rx";
import { BsChatLeftText } from "react-icons/bs";
import { IconType } from "react-icons/lib";
import { TfiWallet } from "react-icons/tfi";

const UserHome = () => {
    const ourFeatures: {
        Icon: IconType;
        title: string;
        description: string;
    }[] = [
        {
            Icon: RxClock,
            title: "Saves you time",
            description:
                "Let us take care of your problems efficiently and effectively, giving you valuable time to focus on what matters most.",
        },
        {
            Icon: BsChatLeftText,
            title: "Seamless Communication",
            description:
                "We believe in clear and open lines of communication. We listen to your specific service requirements, ensuring that we understand and meet your expectations.",
        },
        {
            Icon: TfiWallet,
            title: "Cash Free Payment",
            description:
                "Say goodbye to the hassle of cash payments options for a smooth and hassle-free transaction experience.",
        },
    ];
    return (
        <>
            <Filter>
                <Hero />
            </Filter>
            <div className="py-5 md:py-12 px-5 md:px-9">
                <h1 className="text-2xl md:text-2xl mb-3 text-center font-bold text-indigo-950/90">
                    What makes us{" "}
                    <span className="text-yellow-400">unique?</span>
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-20">
                    {ourFeatures &&
                        ourFeatures.map((feature) => (
                            <div className="shadow-md rounded-md flex p-4">
                                <div className="">
                                    <feature.Icon
                                        size={36}
                                        className="text-yellow-400"
                                    />
                                </div>
                                <div className="pt-2 ms-3">
                                    <Text fontSize={"lg"} as={"b"}>
                                        {feature.title}
                                    </Text>
                                    <div className=" rounded-md h-[2px] w-14 bg-indigo-950/90 my-2"></div>
                                    <Text
                                        fontSize={"sm"}
                                        className="text-balance text-indigo-950/80"
                                    >
                                        {feature.description}
                                    </Text>
                                </div>
                            </div>
                        ))}
                </div>
            </div>

            {/* <div className="bg-indigo-950 mb-10 rounded-md py-5 text-white">
                <h1 className="text-2xl md:text-2xl mb-3 text-center font-bold text-white">
                    How does it work?
                </h1>
                <div className="grid grid-cols-1  gap-6 lg:px-28">
                    
                </div>
            </div> */}
        </>
    );
};

export default UserHome;
