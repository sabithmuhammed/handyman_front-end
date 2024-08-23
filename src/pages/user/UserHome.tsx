import React, { useEffect, useState } from "react";
import Hero from "../../components/user/home/Hero";
import Filter from "../../components/user/common/Filter";
import Card from "../../components/user/common/Card";
import { getAllTradesmen, getSkills } from "../../api/userApi";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { Avatar, Image, Skeleton, Text } from "@chakra-ui/react";
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

    const testimonials: { profile: string; name: string; text: string }[] = [
        {
            profile:
                "https://st3.depositphotos.com/1037987/15097/i/450/depositphotos_150975580-stock-photo-portrait-of-businesswoman-in-office.jpg",
            name: "Sarah M",
            text: "I was struggling to find a reliable plumber for an emergency repair, but this site made it so easy! Within minutes, I had multiple options, and the tradesman I chose was at my door the next day. The service was professional, affordable, and hassle-free. I highly recommend it!",
        },
        {
            profile:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLamOmRluPgxknGDU-O_Wx_cdlX6TPnebzCQ&s",
            name: "James R",
            text: "Running a small business means I don't have time to waste, especially when something goes wrong. This website has been a lifesaver! I've booked electricians, carpenters, and more—all top-notch professionals who got the job done right. It's my go-to for any maintenance needs.",
        },
        {
            profile:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDmSFgSRa7LzJvvN5b9X8nD-ElhMy9nb7RsQ&s",
            name: "Emily T",
            text: "After moving into my new home, I needed help with several renovations. This platform connected me with skilled tradesmen who were not only experts but also punctual and polite. The whole process was smooth, and I love the results. I'll definitely be using this service again!",
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
                            <div
                                className="shadow-md rounded-md flex p-4"
                                key={feature.title}
                            >
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

            <div className="py-5 md:py-12 px-5 md:px-9">
                <h1 className="text-2xl md:text-2xl mb-3 text-center font-bold text-indigo-950/90">
                    How does this work?
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="h-[350px]">
                        <Image
                            rounded={"lg"}
                            objectFit={"cover"}
                            width={"100%"}
                            height={"100%"}
                            src="https://images.squarespace-cdn.com/content/v1/611b3a86fb6a226aadffcf79/0d2be701-5381-46bc-9543-d46a4a46a89a/Can+A+Handyman+Do+Plumbing.png"
                        />
                    </div>
                    <ul className="flex flex-col justify-center">
                        <li className="mt-8">
                            <div className="flex">
                                <div className="font-mono flex-shrink-0 w-8 h-8 bg-yellow-300 text-white text-xl flex justify-center items-center rounded-sm font-semibold">
                                    1
                                </div>
                                <div className="flex flex-col ms-3">
                                    <Text fontSize={"xl"} as="b">
                                        Book a service
                                    </Text>
                                    <Text className="text-indigo-950/80">
                                        Search and book a service you want
                                    </Text>
                                </div>
                            </div>
                        </li>
                        <li className="mt-8">
                            <div className="flex">
                                <div className="font-mono flex-shrink-0 w-8 h-8 bg-yellow-300 text-white text-xl flex justify-center items-center rounded-sm font-semibold">
                                    2
                                </div>
                                <div className="flex flex-col ms-3">
                                    <Text fontSize={"xl"} as="b">
                                        Relax while we fix it
                                    </Text>
                                    <Text className="text-indigo-950/80">
                                        Handyman will reach out to your location
                                        and fix the issues
                                    </Text>
                                </div>
                            </div>
                        </li>
                        <li className="mt-8">
                            <div className="flex">
                                <div className="font-mono flex-shrink-0 w-8 h-8 bg-yellow-300 text-white text-xl flex justify-center items-center rounded-sm font-semibold">
                                    3
                                </div>
                                <div className="flex flex-col ms-3">
                                    <Text fontSize={"xl"} as="b">
                                        Payment
                                    </Text>
                                    <Text className="text-indigo-950/80">
                                        Pay after the work is done
                                    </Text>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="py-5 md:py-12 px-5 md:px-9">
                <h1 className="text-2xl md:text-2xl mb-3 text-center font-bold text-indigo-950/90">
                    Testimonials
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.length !== 0 &&
                        testimonials.map((testimonial) => (
                            <div
                                className="rounded-lg col-span-1 p-4 shadow-md"
                                key={testimonial.name}
                            >
                                <div className="flex items-center gap-2">
                                    <Avatar
                                        src={testimonial.profile}
                                        size={"md"}
                                        name={testimonial.name}
                                    />
                                    <Text fontSize={"lg"}>
                                        {testimonial.name}
                                    </Text>
                                </div>
                                <hr className="my-2 border-yellow-300/80" />
                                <Text className="text-balance opacity-80">
                                    {testimonial.text}
                                </Text>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default UserHome;
