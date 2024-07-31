import { Avatar, Divider, Progress, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { RatingStars } from "./RatingStars";
import { TiStarFullOutline } from "react-icons/ti";
import { ReviewCard } from "./ReviewCard";
import { ReviewType } from "../../../types/stateTypes";

export const ReviewContainer = () => {
    const colors = ["blue", "green", "yellow", "orange", "red"];

    const [reviews, setReview] = useState<ReviewType[]>([]);

    return (
        <div className="md:px-4">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="">
                    <Text>Average Rating</Text>
                    <div className="flex px-5 items-center">
                        <Text fontSize={"4xl"}>4.0</Text>
                        <div className="h-7 w-[2px] bg-gray-400 rounded-full  mx-2"></div>
                        <div className="flex flex-col items-center">
                            <RatingStars rating={4} size={25} />
                            <Text fontSize={"sm"} color={"gray.500"}>
                                Based on 10 reviews
                            </Text>
                        </div>
                    </div>
                </div>
                <div className=" flex">
                    <div className="h-full w-[2px] bg-gray-400  mx-2 rounded-full max-md:hidden"></div>
                    <div className="w-full max-w-[400px] ">
                        {colors.map((color, index) => (
                            <div
                                className=" flex items-center my-1"
                                key={index}
                            >
                                <TiStarFullOutline className="text-yellow-400" />
                                <Text fontSize={"xs"} mx={1}>
                                    {5 - index}
                                </Text>
                                <div className=" flex-grow">
                                    <Progress
                                        bg={"gray.200"}
                                        value={50}
                                        colorScheme={color}
                                        rounded={"full"}
                                        h={"6px"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {reviews.map(() => (
                <ReviewCard />
            ))}
        </div>
    );
};
