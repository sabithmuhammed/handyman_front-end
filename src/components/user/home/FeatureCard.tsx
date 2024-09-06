import { Text } from "@chakra-ui/react";
import React from "react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type PropType = {
    Icon: IconType;
    title: string;
    description: string;
};

const FeatureCard = (feature: PropType) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2, // Adjust the threshold as needed
    });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }} // Start invisible and moved down
            animate={inView ? { opacity: 1, y: 0 } : {}} // Animate when in view
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="shadow-md rounded-md flex p-4"
        >
            <div className="">
                <feature.Icon size={36} className="text-yellow-400" />
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
        </motion.div>
    );
};

export default FeatureCard;
