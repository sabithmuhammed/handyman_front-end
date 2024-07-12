import { Skeleton, SkeletonText } from "@chakra-ui/react";
import React from "react";

const CardSkeleton = () => {
    return (
        <div className="h-[400px] md:h-[350px] max-md:w-[300px] bg-blue-100 rounded-2xl flex flex-col items-center">
            <Skeleton className="w-[calc(100%-40px)] h-[230px] md:h-[180px] mt-[15px]" roundedTop={"lg"}></Skeleton>
            <div
                className={`h-[140px] w-[calc(100%-20px)] rounded-xl flex flex-col items-center justify-between py-2`}
            >
                <SkeletonText
                    mt="2"
                    noOfLines={1}
                    skeletonHeight="6"
                    w={"170px"}
                ></SkeletonText>
                <SkeletonText
                    mt="2"
                    noOfLines={2}
                    skeletonHeight="2"
                    w={"170px"}
                ></SkeletonText>

                <Skeleton rounded={"full"} w={"170px"}>
                    <button
                        className={`rounded-full px-3 w-[calc(100%-30px)] bg-gray-900 py-1 `}
                    >
                        hi
                    </button>
                </Skeleton>
            </div>
        </div>
    );
};

export default CardSkeleton;
