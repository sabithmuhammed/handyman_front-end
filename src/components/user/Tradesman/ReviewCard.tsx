import { Avatar, Divider, Text } from "@chakra-ui/react";
import React from "react";
import { RatingStars } from "./RatingStars";

export const ReviewCard = () => {
    return (
        <div className="">
            <Divider my={3} />
            <div className="flex">
                <Avatar borderRadius={"5px"} />
                <div className=" ms-2">
                    <Text as={"b"}>Sonali</Text>
                    <div className="flex">
                        <RatingStars rating={3} />
                        <Text fontSize={"xs"} ms={2}>
                            4-5-2024
                        </Text>
                    </div>
                    <div className="">
                        <Divider my={2} />
                        <Text fontSize={"sm"}>
                            hjdfjdsla jkdfhgdfslf hgdfjsg ghfsdhjgk ghjdfsh
                            kjshg jdsgl hjsdkh sfjksja fhasjh hajs hfajsk
                            hjfdsadkh jfsafh hjfdsa jdsskah haskdf{" "}
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    );
};
