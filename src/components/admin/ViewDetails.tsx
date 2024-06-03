import React from "react";
import { IoCloseOutline } from "react-icons/io5";
import ButtonAdmin from "./ButtonAdmin";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Tradesman } from "../../types/stateTypes";
const ViewDetails = ({ name, skills, idProof, profile, wage, experience }:Tradesman) => {
    
    return (
        <Flex direction={"column"}>
            <Flex direction={"row"}>
                <Image
                    src={profile}
                    alt="Dan Abramov"
                    objectFit={"cover"}
                    boxSize={"150px"}
                    fallbackSrc="https://via.placeholder.com/150"
                />
                <Box ms={"4"}>
                    <Heading size="xs" textTransform="uppercase">
                        {name}
                    </Heading>
                    <Text py="1" fontSize="md">
                        {skills.reduce((acc, cur) => acc + ", " + cur)}
                    </Text>
                    <Text py="1" fontSize="md">
                        Wage:{wage.amount +"/"+ wage.type}
                    </Text>
                    <Text py="1" fontSize="md">
                        Experience: {experience}yrs
                    </Text>
                </Box>
            </Flex>
            <Box w={"400px"}>
                <img
                    src={idProof}
                    alt=""
                    className="object-contain w-full h-full my-5"
                />
            </Box>

        </Flex>
    );
};

export default ViewDetails;
