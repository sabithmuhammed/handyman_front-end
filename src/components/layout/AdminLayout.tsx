import React from "react";
import SidePanel from "../admin/SidePanel";
import {
    Box,
    Container,
    Flex,
    Text,
    HStack,
    Center,
    Heading,
    Avatar,
    Stack,
    Icon,
    Grid,
} from "@chakra-ui/react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ImUser } from "react-icons/im";
import { FaHelmetSafety } from "react-icons/fa6";
import { FaSignOutAlt, FaTools, FaUserCheck, FaUsers } from "react-icons/fa";

const AdminLayout = () => {
    const navLinkStyle = ({ isActive }) => ({
        color: isActive ? "teal.300" : "inherit",
        fontWeight: isActive ? "bold" : "normal",
        backgroundColor: isActive ? "gray.700" : "inherit",
      });
    return (
        <>
            <Box display="flex" h="100vh">
                <Box bg="gray.800" p={4} h="100vh" color="white" w="300px">
                    <Box mb={8}>
                        <Heading size="md" mb={2}>
                            Admin Panel
                        </Heading>
                        <Text fontSize="sm" color="gray.400">
                            Manage your tradesmen and users
                        </Text>
                    </Box>
                    <Stack spacing={6}>
                        <NavLink to="verify" style={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={4}
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.700" }}
                            >
                                <Icon as={FaUserCheck} boxSize={5} />
                                <Text fontWeight="semibold">
                                    Tradesman Verification
                                </Text>
                            </Stack>
                        </NavLink>
                        <NavLink to="users" style={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={4}
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.700" }}
                            >
                                <Icon as={FaUsers} boxSize={5} />
                                <Text fontWeight="semibold">
                                    User Management
                                </Text>
                            </Stack>
                        </NavLink>
                        <NavLink to="tradesmen" style={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={4}
                                p={2}
                                borderRadius="md"
                                _hover={{ bg: "gray.700" }}
                            >
                                <Icon as={FaTools} boxSize={5} />
                                <Text fontWeight="semibold">
                                    Tradesman Management
                                </Text>
                            </Stack>
                        </NavLink>
                        <Stack
                            direction="row"
                            align="center"
                            spacing={4}
                            p={2}
                            borderRadius="md"
                            _hover={{ bg: "gray.700" }}
                            mt="auto"
                        >
                            <Icon as={FaSignOutAlt} boxSize={5} />
                            <Text fontWeight="semibold">Logout</Text>
                        </Stack>
                    </Stack>
                </Box>
                <Grid bg="gray.100" p={4} h="100vh" w={"full"}>
                    <Box
                        bg="white"
                        p={4}
                        mb={4}
                        borderRadius="md"
                        boxShadow="md"
                    >
                        <Flex align="center" justify="space-between">
                            <Heading size="md">Admin Panel</Heading>
                            <Avatar
                                name="John Doe"
                                src="https://bit.ly/broken-link"
                            />
                        </Flex>
                    </Box>
                    <Container overflow={"auto"} minW={"full"}>
                        <Outlet />
                    </Container>
                </Grid>
            </Box>
        </>
        // <Container maxW="100vw" bg="gray.100" minH={"100vh"} overflow={"auto"}>
        //     <Container bg={""} maxW="container.lg" h="100vh" px="0" position={"relative"}>
        //         <Flex
        //             bg={"green.400"}
        //             h="70px"
        //             justify={"space-between"}
        //             px="5"
        //             borderBottomRadius={"10px"}
        //             position={"fixed"}
        //             zIndex={"100"}
        //             w={"container.lg"}
        //             top={"0"}
        //         >
        //             <HStack spacing="50px" textColor={"white"}>
        //                 <NavLink to="/verify">
        //                     <Flex direction={"column"} alignItems={"center"}>
        //                         <RiVerifiedBadgeFill size={30} />
        //                         <Text fontSize="xs">Verification</Text>
        //                     </Flex>
        //                 </NavLink>
        //             </HStack>
        //             <HStack spacing="50px" textColor={"white"}>
        //                 <NavLink to="/verify">
        //                     <Flex direction={"column"} alignItems={"center"}>
        //                         <RiVerifiedBadgeFill size={30} />
        //                         <Text fontSize="xs">Verification</Text>
        //                     </Flex>
        //                 </NavLink>
        //                 <NavLink to="tradesmen">
        //                     <Flex direction={"column"} alignItems={"center"}>
        //                         <FaHelmetSafety size={30} />
        //                         <Text fontSize="xs">Tradesmen</Text>
        //                     </Flex>
        //                 </NavLink>
        //                 <NavLink to="users">
        //                     <Flex direction={"column"} alignItems={"center"}>
        //                         <ImUser size={30} />
        //                         <Text fontSize="xs">Users</Text>
        //                     </Flex>
        //                 </NavLink>
        //             </HStack>
        //             <HStack spacing="50px" textColor={"white"}>
        //                 <NavLink to="/verify">
        //                     <Flex direction={"column"} alignItems={"center"}>
        //                         <RiVerifiedBadgeFill size={30} />
        //                         <Text fontSize="xs">Verification</Text>
        //                     </Flex>
        //                 </NavLink>
        //                 <NavLink to="/verify">
        //                     <Flex direction={"column"} alignItems={"center"}>
        //                         <FaHelmetSafety size={30} />
        //                         <Text fontSize="xs">Tradesmen</Text>
        //                     </Flex>
        //                 </NavLink>
        //             </HStack>
        //         </Flex>
        //     <Container mt="80px"  maxW={"full"} position={"relative"}>
        //         <Outlet></Outlet>
        //     </Container>
        //     </Container>
        //     {/* //{" "}
        //     <Flex direction="column" minHeight="100vh">
        //         //{" "}
        //         <Box bg="teal.600" p={4}>
        //             //{" "}
        //             <Text fontSize="xl" fontWeight="bold" color="white">
        //                 // Admin Panel //{" "}
        //             </Text>
        //             //{" "}
        //         </Box>
        //         //{" "}
        //         <Flex>
        //             // <SidePanel />
        //             // <Outlet />
        //             //{" "}
        //         </Flex>
        //         //{" "}
        //     </Flex> */}
        // </Container>
    );
};

export default AdminLayout;
