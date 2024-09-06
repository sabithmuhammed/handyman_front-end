import { Image, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const StepsTile = () => {
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
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
                                Handyman will reach out to your location and fix
                                the issues
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
        </motion.div>
    );
};

export default StepsTile;
