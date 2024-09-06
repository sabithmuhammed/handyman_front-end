import { Avatar, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

type PropType = {
    profile: string;
    name: string;
    text: string;
};

const TestimonialCard = (testimonial: PropType) => {
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
            className="rounded-lg col-span-1 p-4 shadow-md"
        >
            <div className="flex items-center gap-2">
                <Avatar
                    src={testimonial.profile}
                    size={"md"}
                    name={testimonial.name}
                />
                <Text fontSize={"lg"}>{testimonial.name}</Text>
            </div>
            <hr className="my-2 border-yellow-300/80" />
            <Text className="text-balance opacity-80">{testimonial.text}</Text>
        </motion.div>
    );
};

export default TestimonialCard;
