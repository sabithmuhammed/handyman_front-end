import {
    Box,
    Flex,
    GridItem,
    Skeleton,
    SkeletonText,
    Text,
} from "@chakra-ui/react";
import React from "react";

const TradesmanTileSkeleton = () => {
    return (
        <GridItem w="full" colSpan={1}>
            <Flex
                minH={"400px"}
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
                    <Skeleton boxSize="135px" objectFit="cover" rounded={6} />
                </Flex>
                <SkeletonText
                    mt="1"
                    noOfLines={1}
                    skeletonHeight="6"
                    w={"200px"}
                />

                <Box className="bg-indigo-400 w-full h-24 flex justify-around text-white mt-3 rounded  items-center">
                    <Box className="flex flex-col items-center">
                        <SkeletonText
                            noOfLines={1}
                            skeletonHeight="6"
                            w={"50px"}
                            mb={2}
                        />

                        <Text fontSize={"sm"}>Experience</Text>
                    </Box>
                    <Box className="flex flex-col items-center">
                        <SkeletonText
                            noOfLines={1}
                            skeletonHeight="6"
                            w={"50px"}
                            mb={2}
                        />

                        <Text fontSize={"sm"}>Rating</Text>
                    </Box>
                </Box>
                <Flex
                    marginTop={3}
                    w={"full"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                >
                    <SkeletonText
                        noOfLines={1}
                        skeletonHeight="6"
                        w={"100px"}
                        mb={2}
                    />
                    <Skeleton w={"80px"} h={"35px"} />
                </Flex>
                <Text marginTop={3} color={"gray.700"}>
                    Services
                </Text>
                <SkeletonText
                    noOfLines={2}
                    skeletonHeight="6"
                    w={"full"}
                    mb={2}
                />
            </Flex>
        </GridItem>
    );
};

export default TradesmanTileSkeleton;
