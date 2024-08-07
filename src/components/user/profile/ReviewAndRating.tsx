import { Text, Textarea } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";

type PropType = {
    review: {
        rating: number;
        review: string;
    };
    setReview: React.Dispatch<
        React.SetStateAction<{
            rating: number;
            review: string;
        }>
    >;
};

export default function ReviewAndRating({ review, setReview }: PropType) {
    
    return (
        <div className="flex flex-col items-center ">
            <div className=" w-[200px]">
                <div className="flex">
                    {[...Array(5)].map((_, index) => (
                        <TiStarFullOutline
                            size={35}
                            onClick={() => {
                                setReview((p) => ({ ...p, rating: index + 1 }));
                            }}
                            className={`${
                                review.rating >= index + 1
                                    ? `text-yellow-400`
                                    : `text-gray-400`
                            } mx-auto`}
                        />
                    ))}
                </div>
                <div className="flex justify-between px-2 text-gray-400">
                    <Text fontSize={"xs"}>Bad</Text>
                    <Text fontSize={"xs"}>Excellent</Text>
                </div>
            </div>
            <div className=" w-full mt-4">
                <Textarea
                    placeholder="Type something..."
                    value={review.review}
                    onChange={(e) => {
                        setReview((p) => ({ ...p, review: e.target.value }));
                    }}
                />
            </div>
        </div>
    );
}
