import { Avatar, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";
import React from "react";

const CommentSection = () => {
    return (
        <Flex
            maxH={"80vh"}
            bg={"gray.100"}
            p={3}
            direction={"column"}
            rounded={"md"}
        >
            <Text fontWeight={"bold"}>Comments</Text>
            <Flex justifyContent={"space-between"} marginY={3}>
                <Wrap>
                    <WrapItem>
                        <Avatar
                            name="Dan Abrahmov"
                            src="https://bit.ly/dan-abramov"
                            size={"sm"}
                        />
                    </WrapItem>
                    <WrapItem>
                        <Flex direction={"column"}>
                            <Flex direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"}>
                                    Sabith Muhammed
                                </Text>
                                <Text fontSize={"xs"} color={"gray.600"}>
                                    12/4/4000
                                </Text>
                            </Flex>
                            <Flex>fdsjkfjsdj</Flex>
                        </Flex>
                    </WrapItem>
                </Wrap>
            </Flex>
            <Flex>
                
            </Flex>
        </Flex>
    );
};

export default CommentSection;
