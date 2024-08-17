import {
    Avatar,
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Flex,
    Grid,
    Heading,
    Icon,
    Show,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { GrSchedules } from "react-icons/gr";
import { PiChatsBold } from "react-icons/pi";
import { MdOutlinePermMedia,MdOutlineSettings } from "react-icons/md";
import { IoIosHome } from "react-icons/io";
import { GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import logo from "../../assets/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const TradesmanLayout = () => {
    const { tradesmanInfo } = useSelector((state: RootState) => state.auth);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navLinkStyle = ({ isActive }) =>
        `${
            isActive ? `bg-gray-700 text-white` : ``
        } hover:bg-gray-500 hover:text-white rounded-md`;
    return (
        <>
            <Box display="flex" h="100vh">
                <Box
                    p={6}
                    pt={3}
                    h="100vh"
                    color="gray.900"
                    w="260px"
                    className="max-md:hidden"
                >
                    <Box mb={10} p={3}>
                        <Box h={"50px"} ps={0} w={"130px"}>
                            <img
                                src={logo}
                                alt=""
                                className="object-contain w-full h-full mix-blend-multiply"
                            />
                        </Box>
                    </Box>
                    <Stack spacing={2}>
                        <NavLink to="dashboard" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={3}
                                p={3}
                            >
                                <Icon as={LuLayoutDashboard} boxSize={5} />
                                <Text>Dashboard</Text>
                            </Stack>
                        </NavLink>

                        <NavLink to="schedules" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={3}
                                p={3}
                            >
                                <Icon as={GrSchedules} boxSize={5} />
                                <Text>Schedules</Text>
                            </Stack>
                        </NavLink>
                        <NavLink to="chats" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={3}
                                p={3}
                            >
                                <Icon as={PiChatsBold} boxSize={5} />
                                <Text>Chats</Text>
                            </Stack>
                        </NavLink>
                        <NavLink to="posts" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={3}
                                p={3}
                            >
                                <Icon as={MdOutlinePermMedia} boxSize={5} />
                                <Text>Posts</Text>
                            </Stack>
                        </NavLink>

                        <NavLink to="settings" className={navLinkStyle}>
                            <Stack
                                direction="row"
                                align="center"
                                spacing={3}
                                p={3}
                            >
                                <Icon as={MdOutlineSettings} boxSize={5} />
                                <Text>Settings</Text>
                            </Stack>
                        </NavLink>

                        <Link to="/">
                            <Stack
                                direction="row"
                                align="center"
                                spacing={3}
                                p={3}
                                borderRadius="md"
                                bg="red.500"
                                color="white"
                                _hover={{ bg: "red.600" }}
                                mt="auto"
                                cursor={"pointer"}
                            >
                                <Icon as={IoIosHome} boxSize={5} />
                                <Text>Go back</Text>
                            </Stack>
                        </Link>
                    </Stack>
                </Box>
                <Show below="md">
                    <Drawer
                        placement="left"
                        onClose={onClose}
                        isOpen={isOpen}
                        size={"xs"}
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerHeader
                                borderBottomWidth="1px"
                                className="flex justify-between"
                            >
                                <Box h={"50px"} ps={0} w={"130px"}>
                                    <img
                                        src={logo}
                                        alt=""
                                        className="object-contain w-full h-full mix-blend-multiply"
                                    />
                                </Box>
                                <button onClick={onClose} className="md:hidden">
                                    <GoSidebarExpand size={20} />
                                </button>
                            </DrawerHeader>
                            <DrawerBody>
                                <Stack spacing={2}>
                                    <NavLink
                                        to="dashboard"
                                        className={navLinkStyle}
                                    >
                                        <Stack
                                            direction="row"
                                            align="center"
                                            spacing={3}
                                            p={3}
                                        >
                                            <Icon
                                                as={LuLayoutDashboard}
                                                boxSize={5}
                                            />
                                            <Text>Dashboard</Text>
                                        </Stack>
                                    </NavLink>

                                    <NavLink
                                        to="schedules"
                                        className={navLinkStyle}
                                    >
                                        <Stack
                                            direction="row"
                                            align="center"
                                            spacing={3}
                                            p={3}
                                        >
                                            <Icon
                                                as={GrSchedules}
                                                boxSize={5}
                                            />
                                            <Text>Schedules</Text>
                                        </Stack>
                                    </NavLink>
                                    <NavLink
                                        to="chats"
                                        className={navLinkStyle}
                                    >
                                        <Stack
                                            direction="row"
                                            align="center"
                                            spacing={3}
                                            p={3}
                                        >
                                            <Icon
                                                as={PiChatsBold}
                                                boxSize={5}
                                            />
                                            <Text>Chats</Text>
                                        </Stack>
                                    </NavLink>
                                    <NavLink
                                        to="posts"
                                        className={navLinkStyle}
                                    >
                                        <Stack
                                            direction="row"
                                            align="center"
                                            spacing={3}
                                            p={3}
                                        >
                                            <Icon
                                                as={MdOutlinePermMedia}
                                                boxSize={5}
                                            />
                                            <Text>Posts</Text>
                                        </Stack>
                                    </NavLink>

                                    <NavLink
                                        to="settings"
                                        className={navLinkStyle}
                                    >
                                        <Stack
                                            direction="row"
                                            align="center"
                                            spacing={3}
                                            p={3}
                                        >
                                            <Icon
                                                as={MdOutlineSettings}
                                                boxSize={5}
                                            />
                                            <Text>Settings</Text>
                                        </Stack>
                                    </NavLink>
                                    <Link to="/">
                                        <Stack
                                            direction="row"
                                            align="center"
                                            spacing={3}
                                            p={3}
                                            borderRadius="md"
                                            bg="red.500"
                                            color="white"
                                            _hover={{ bg: "red.600" }}
                                            mt="auto"
                                            cursor={"pointer"}
                                        >
                                            <Icon as={IoIosHome} boxSize={5} />
                                            <Text>Go back</Text>
                                        </Stack>
                                    </Link>
                                </Stack>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </Show>
                <Flex
                    bg="gray.100"
                    p={0}
                    h="100vh"
                    w={"full"}
                    direction={"column"}
                >
                    <Box bg="white" p={6} borderRadius="md" h={{base:9,md:20}}>
                        <Flex align="center" justify="space-between" h={"full"}>
                            <button onClick={onOpen} className="md:hidden">
                                <GoSidebarCollapse size={20} />
                            </button>
                            <Heading size={{base:"sm",md:"md"}}>
                                Hi, {tradesmanInfo?.name}
                            </Heading>
                            <Avatar
                                name={tradesmanInfo?.name}
                                src={tradesmanInfo?.profile}
                                size={{base:"sm",md:"md"}}
                            />
                        </Flex>
                    </Box>
                    <Box
                        overflow={"auto"}
                        minW={"full"}
                        mt={3}
                        px={3}
                        flexGrow={1}
                    >
                        <Outlet />
                    </Box>
                </Flex>
            </Box>
        </>
    );
};

export default TradesmanLayout;
