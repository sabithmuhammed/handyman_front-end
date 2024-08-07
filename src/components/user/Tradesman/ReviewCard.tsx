import { Avatar, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { RatingStars } from "./RatingStars";
import { ReviewType } from "../../../types/stateTypes";

export const ReviewCard = ({
    userId,
    rating,
    review,
    createdAt,
}: ReviewType) => {
    return (
        <div className="">
            <Divider my={3} />
            <div className="flex">
                <Avatar
                    borderRadius={"5px"}
                    src={typeof userId!=="string"?userId.profile:""}
                    name={typeof userId !== "string" ? userId.name : ""}
                />
                <div className=" ms-2">
                    <Text as={"b"}>
                        {typeof userId !== "string" ? userId.name : ""}
                    </Text>
                    <div className="flex">
                        <RatingStars rating={rating} />
                        <Text fontSize={"xs"} ms={2}>
                            {new Date(createdAt).toLocaleString("en-GB", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            }).split('/').join('-')}
                        </Text>
                    </div>
                    <div className="">
                        <Divider my={2} />
                        <Text fontSize={"sm"}>
                            {review}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
