import { Box, Flex, GridItem, Image, Text } from "@chakra-ui/react";
import React from "react";
import { IoMdChatbubbles } from "react-icons/io";
import { Link } from "react-router-dom";
import { Tradesman } from "../../../types/stateTypes";

const ProfileTile = ({
    _id,
    name,
    profile,
    wage,
    experience,
    rating,
    skills,
}: Tradesman) => {
    return (
        <GridItem w="100%" colSpan={1}>
            <Flex
                h={"400px"}
                w={"full"}
                bg={"white"}
                rounded={10}
                direction={"column"}
                alignItems={"center"}
                p="10"
                pb="5"
                position={"sticky"}
                top={"105px"}
                overflow={"hidden"}
                boxShadow={"xl"}
            >
                <Box
                    position={"absolute"}
                    w={"full"}
                    h={"100px"}
                    className="bg-indigo-950"
                    top={0}
                ></Box>
                <Flex
                    w={"150px"}
                    h={"150px"}
                    bg={"white"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    rounded={6}
                    zIndex={10}
                    pt={2}
                >
                    <Image
                        boxSize="135px"
                        objectFit="cover"
                        src={profile}
                        alt={name}
                        rounded={6}
                    />
                </Flex>
                <Text fontSize={"xl"} fontWeight={"bold"}>
                    {name}
                </Text>
                <Box className="bg-indigo-400 w-full h-24 flex justify-around text-white mt-3 rounded  items-center">
                    <Box className="flex flex-col items-center">
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            {experience}+Yrs
                        </Text>
                        <Text fontSize={"sm"}>Experience</Text>
                    </Box>
                    <Box className="flex flex-col items-center">
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            4.5
                        </Text>
                        <Text fontSize={"sm"}>Rating</Text>
                    </Box>
                </Box>
                <Flex
                    marginTop={3}
                    w={"full"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                >
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        ₹ {wage.amount}/
                        <span className="text-base">{wage.type}*</span>
                    </Text>
                    <Link
                        to={`/chat/${_id}`}
                        className="bg-indigo-950 px-3  py-2 flex items-center rounded text-white hover:bg-indigo-900"
                    >
                        <Text paddingRight={3} fontSize={"md"}>
                            Chat
                        </Text>
                        <IoMdChatbubbles size={20} />
                    </Link>
                </Flex>
                <Text marginTop={3} color={"gray.400"}>
                    *Approximate wage
                </Text>
            </Flex>
        </GridItem>
    );
};

export default ProfileTile;
