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
import { motion } from "framer-motion";
import FeatureCard from "../../components/user/home/FeatureCard";
import StepsTile from "../../components/user/home/StepsTile";
import TestimonialCard from "../../components/user/home/TestimonialCard";

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
                            <FeatureCard {...feature} key={feature.title} />
                        ))}
                </div>
            </div>

            <div className="py-5 md:py-12 px-5 md:px-9">
                <h1 className="text-2xl md:text-2xl mb-3 text-center font-bold text-indigo-950/90">
                    How does this work?
                </h1>
                <StepsTile />
            </div>

            <div className="py-5 md:py-12 px-5 md:px-9">
                <h1 className="text-2xl md:text-2xl mb-3 text-center font-bold text-indigo-950/90">
                    Testimonials
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.length !== 0 &&
                        testimonials.map((testimonial) => (
                            <TestimonialCard {...testimonial} key={testimonial.name}  />
                        ))}
                </div>
            </div>
        </>
    );
};

export default UserHome;
