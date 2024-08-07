import { Progress, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RatingStars } from "./RatingStars";
import { TiStarFullOutline } from "react-icons/ti";
import { getReviewStats } from "../../../api/reviewApi";
import { useParams } from "react-router-dom";

export const ReviewStatsTile = () => {
    const colors = ["blue", "green", "yellow", "orange", "red"];
    const [reviewData, setReviewData] = useState<{
        totalCount: number;
        avarage: number;
        starBarData: number[];
    } | null>(null);

    const { tradesmanId } = useParams();

    useEffect(() => {
        (async () => {
            const res = await getReviewStats(tradesmanId as string);
            if (res?.data) {
                setReviewData({
                    ...res.data,
                    starBarData: res.data.starBarData.reverse(),
                });
            }
        })();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="">
                <Text>Average Rating</Text>
                <div className="flex px-5 items-center">
                    <Text fontSize={"4xl"}>
                        {Math.round(reviewData?.avarage ?? 0)}
                    </Text>
                    <div className="h-7 w-[2px] bg-gray-400 rounded-full  mx-2"></div>
                    <div className="flex flex-col items-center">
                        <RatingStars
                            rating={Math.round(reviewData?.avarage ?? 0)}
                            size={25}
                        />
                        <Text fontSize={"sm"} color={"gray.500"}>
                            Based on {reviewData?.totalCount ?? 0} reviews
                        </Text>
                    </div>
                </div>
            </div>
            <div className=" flex">
                <div className="h-full w-[2px] bg-gray-400  mx-2 rounded-full max-md:hidden"></div>
                <div className="w-full max-w-[400px] ">
                    {reviewData ? (
                        reviewData.starBarData.map((data, index) => (
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
                                        value={data}
                                        colorScheme={colors[index]}
                                        rounded={"full"}
                                        h={"6px"}
                                    />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex  justify-center min-h-8 h-full items-center text-gray-500">
                            <Text>No data available</Text>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
