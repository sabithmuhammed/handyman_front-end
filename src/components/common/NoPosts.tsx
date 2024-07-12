import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { FaCamera } from "react-icons/fa";

const NoPosts = () => {
    return (
        <Flex
            w={"full"}
            h={"full"}
            flexDirection={"column"}
            justify={"center"}
            alignItems={"center"}
        >
            <FaCamera size={70} color="gray" />
            <Text fontSize={"2xl"} color={"gray"}>
                No Posts Yet
            </Text>
        </Flex>
    );
};

export default NoPosts;
