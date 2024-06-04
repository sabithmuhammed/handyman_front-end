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
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { ImUser } from "react-icons/im";
import { FaHelmetSafety } from "react-icons/fa6";
import { FaSignOutAlt, FaTools, FaUserCheck, FaUsers } from "react-icons/fa";
import { logoutAdmin } from "../../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { logout } from "../../api/commonApi";
import { toast } from "react-toastify";

const AdminLayout = () => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logOut = async () => {
        const response = await logout();
        if (response) {
            toast.success(response?.data?.data?.message);
            dispatch(logoutAdmin());
            navigate("/login");
        }
    };

    const navLinkStyle = ({ isActive }) =>
        `${isActive ? `bg-gray-700` : ``} hover:bg-gray-700 rounded-md`;

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
                        <NavLink to="verify" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={4}
                                p={2}
                            >
                                <Icon as={FaUserCheck} boxSize={5} />
                                <Text fontWeight="semibold">
                                    Tradesman Verification
                                </Text>
                            </Stack>
                        </NavLink>
                        <NavLink to="users" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={4}
                                p={2}
                            >
                                <Icon as={FaUsers} boxSize={5} />
                                <Text fontWeight="semibold">
                                    User <br />
                                    Management
                                </Text>
                            </Stack>
                        </NavLink>
                        <NavLink to="tradesmen" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={4}
                                p={2}
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
                            onClick={logOut}
                            cursor={"pointer"}
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
                        h={20}
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
    );
};

export default AdminLayout;
