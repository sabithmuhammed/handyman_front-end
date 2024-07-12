import { Flex, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const BookingLayout = () => {
    return (
        <div>
            <Text mb={2} fontWeight={"bold"} color={"gray.800"}>
                Quick Stats
            </Text>
            <Grid
                templateColumns={{
                    base: "repeat(2, 1fr)",
                    md: "repeat(3,1fr)",
                    lg: "repeat(5, 1fr)",
                }}
                gap={6}
            >
                <Flex
                    bg={"white"}
                    direction={"column"}
                    p={4}
                    borderRadius={5}
                    h={"fit-content"}
                    boxShadow={"md"}
                >
                    <Text
                        color={"gray.700"}
                        fontSize={{ base: "xs", md: "md" }}
                    >
                        {" "}
                        Total Bookings
                    </Text>
                    <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight={"bold"}
                        color={"gray.700"}
                    >
                        30
                    </Text>
                </Flex>
                <Flex
                    bg={"white"}
                    direction={"column"}
                    p={4}
                    borderRadius={5}
                    h={"fit-content"}
                    boxShadow={"md"}
                >
                    <Text
                        color={"gray.700"}
                        fontSize={{ base: "xs", md: "md" }}
                    >
                        {" "}
                        Pending Approval
                    </Text>
                    <Text
                        fontSize={{ base: "2xl", md: "3xl" }}
                        fontWeight={"bold"}
                        color={"red.400"}
                    >
                        30
                    </Text>
                </Flex>
            </Grid>
            {/* <Flex my={5} borderBottom={"2px"} borderColor={"gray.300"}>
                <NavLink to="." end className={({isActive})=>`${isActive?`text-gray-700`:`text-gray-400`} me-10 my-3`}>
                    {" "}
                    <Text
                        fontSize={"lg"}
                        fontWeight={"bold"}
                    >
                        Bookings
                    </Text>{" "}
                </NavLink>
                <NavLink to="settings" className={({isActive})=>`${isActive?`text-gray-700`:`text-gray-400`} me-10 my-3`}>
                    <Text
                        fontSize={"lg"}
                        fontWeight={"bold"}
                    >
                        Settings
                    </Text>{" "}
                </NavLink>
            </Flex> */}
            <Outlet></Outlet>
        </div>
    );
};

export default BookingLayout;
