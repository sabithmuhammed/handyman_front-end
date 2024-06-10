import {
    Avatar,
    Box,
    Flex,
    GridItem,
    HStack,
    Input,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";

const ChatWindow = () => {
    return (
        <GridItem
            w="100%"
            bg="white"
            colSpan={2}
            h={"85vh"}
            rounded={10}
            className="flex flex-col"
            boxShadow={"md"}
        >
            <Box
                h={16}
                roundedTop={10}
                className="border-b-2 border-gray-500 flex items-center"
                px={5}
            >
                <Wrap bg={"white"} p={2} rounded={"md"} cursor={"pointer"}>
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
                                    Online
                                </Text>
                            </Flex>
                        </Flex>
                    </WrapItem>
                </Wrap>
            </Box>
            <Box
                className="flex-grow flex flex-col"
                bg={"white"}
                overflow={"auto"}
                px={3}
            >
                <Box
                    my={3}
                    bg={"blue.200"}
                    w={"fit-content"}
                    px={3}
                    py={2}
                    rounded={"3xl"}
                    roundedTopLeft={0}
                    maxW={"80%"}
                    boxShadow={"md"}
                >
                    <Text>Hiiiii</Text>
                    <Flex ps={2} w={"full"} justifyContent={"flex-end"}>
                        <Text fontSize={"xs"} me={2}>
                            10:30PM
                        </Text>
                    </Flex>
                </Box>

                <Box
                    my={3}
                    bg={"gray.300"}
                    w={"fit-content"}
                    px={3}
                    py={2}
                    rounded={"3xl"}
                    roundedTopRight={0}
                    alignSelf={"end"}
                    maxW={"80%"}
                    boxShadow={"md"}

                >
                    <Text>
                        Hiiiii dshds hdskjahjad hdsjkskhfash dfisfhdsf
                        fdsjgfhdsg gfhdgfhs fdjshgfdshk dfjsgfkds fjdsgfhks
                        hjdsfsk dshfsk hjdshfks
                    </Text>
                    <Flex ps={2} w={"full"} justifyContent={"flex-end"}>
                        <Text fontSize={"xs"} me={2}>
                            10:30PM
                        </Text>
                        <IoCheckmarkOutline />
                    </Flex>
                </Box>
            </Box>
            <Box
                className="border-t-2 border-gray-500"
                h={20}
                roundedBottom={10}
                px={5}
                py={2}
            >
                <HStack w={"full"} h={"full"} spacing={3}>
                    <BsEmojiGrin size={24} color="gray.500" />
                    <GoPaperclip size={24} color="gray.500" />
                    <Input placeholder="small size" size="md" />

                    <AiOutlineSend size={24} color="gray.500" />
                </HStack>
            </Box>
        </GridItem>
    );
};

export default ChatWindow;
