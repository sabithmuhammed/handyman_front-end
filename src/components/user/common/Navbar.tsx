import React, { useEffect, useRef, useState } from "react";
import logo from "../../../assets/logo.png";
import logoSmall from "../../../assets/logo_small.png";
import { navItems } from "../../../constants/pagesConstants";
import { Link, NavLink } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import {
    RiArrowUpSLine,
    RiArrowDownSLine,
    RiLogoutCircleLine,
} from "react-icons/ri";
import { logout } from "../../../api/commonApi";
import { toast } from "react-toastify";
import { logoutUser, removeTradesman } from "../../../redux/slice/authSlice";
import { IoMdChatbubbles } from "react-icons/io";
import {
    Avatar,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    Grid,
    StackDivider,
    Text,
    VStack,
    useBoolean,
    useDisclosure,
} from "@chakra-ui/react";
import { IoPersonCircleOutline } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";
import { AiOutlineClose } from "react-icons/ai";

const Navbar = () => {
    const [profileToggle, setProfileToggle] = useBoolean();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const profileRef = useRef<HTMLDivElement | null>(null);
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [currentNav, setCurrentNav] = useState("/home");

    const dispatch = useDispatch();

    useEffect(() => {
        onClose();
    }, [currentNav]);

    useEffect(() => {
        const profileHandler = (e: MouseEvent) => {
            if (profileToggle) {

                if (!profileRef.current?.contains(e.target as Node)) {
                    setProfileToggle.off();
                }
            }
        };
        document.addEventListener("click", profileHandler);
        return () => {
            document.removeEventListener("click", profileHandler);
        };
    });

    const logOut = async () => {
        const response = await logout();
        if (response) {
            toast.success(response?.data?.data?.message);
            dispatch(logoutUser());
            dispatch(removeTradesman());
        }
    };
    return (
        <header className=" w-full xl:w-[1280px] h-14 lg:h-20 mx-auto bg-white fixed top-0 xl:rounded-b-3xl z-40">
            <nav className="w-full h-full flex items-center px-4 justify-between xl:rounded-3xl bg-white shadow-xl">
                <div className="flex items-center ">
                    <LuMenu size={24} className="lg:hidden" onClick={onOpen} />
                    <Link to="/" className="logo">
                        <img
                            src={logo}
                            width="140"
                            className="max-md:hidden"
                            alt=""
                        />
                        <img
                            src={logoSmall}
                            width="40"
                            className="md:hidden ms-2"
                            alt=""
                        />
                    </Link>
                </div>
                <Link
                    to={
                        userInfo?.isTradesman
                            ? "/tradesman/dashboard"
                            : "/tradesman/register"
                    }
                    className="max-lg:text-sm rounded-full bg-yellow-200 px-3"
                >
                    {userInfo?.isTradesman
                        ? "Go to your dashboard"
                        : "Register as a tradesman"}
                </Link>
                <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader
                            borderBottomWidth="1px"
                            className="flex justify-between items-center"
                        >
                            <Link to="/" className="logo">
                                <img
                                    src={logo}
                                    width="100"
                                    className=""
                                    alt=""
                                />
                            </Link>
                            <AiOutlineClose onClick={onClose} />
                        </DrawerHeader>
                        <DrawerBody>
                            <ul className="flex flex-col text-indigo-950 select-none">
                                {navItems.map((item) => (
                                    <li key={item.title} className="my-3">
                                        <NavLink
                                            to={item.link}
                                            onClick={() =>
                                                setCurrentNav(item.link)
                                            }
                                            className={({
                                                isActive,
                                                isPending,
                                            }) =>
                                                `cursor-pointer ${
                                                    isPending
                                                        ? "underline"
                                                        : isActive
                                                        ? "underline"
                                                        : "no-underline"
                                                }`
                                            }
                                        >
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                <ul className="flex text-indigo-950 select-none">
                    {navItems.map((item) => (
                        <li key={item.title} className="mx-4 max-lg:hidden">
                            <NavLink
                                to={item.link}
                                className={({ isActive, isPending }) =>
                                    `cursor-pointer ${
                                        isPending
                                            ? "underline"
                                            : isActive
                                            ? "underline"
                                            : "no-underline"
                                    }`
                                }
                            >
                                {item.title}
                            </NavLink>
                        </li>
                    ))}

                    {!userInfo ? (
                        <li className="mx-4 rounded-full bg-indigo-950 text-white px-3">
                            <Link to="/login">Login</Link>
                        </li>
                    ) : (
                        <div
                            className=" flex lg:mx-4 items-center"
                            onClick={(e) => {
                                e.stopPropagation();
                                setProfileToggle.toggle();
                            }}
                        >
                            <Avatar
                                size={"xs"}
                                src={userInfo.profile}
                                name={userInfo.name}
                            />

                            <div className="flex items-center cursor-pointer relative ">
                                <div className="max-md:hidden ms-2">
                                    {userInfo.name}
                                </div>
                                {profileToggle ? (
                                    <RiArrowUpSLine />
                                ) : (
                                    <RiArrowDownSLine />
                                )}
                                {profileToggle && (
                                    <VStack
                                        ref={profileRef}
                                        divider={<StackDivider />}
                                        className="absolute top-full mt-2 right-0 w-32 bg-white rounded-md shadow-md flex flex-col items-center justify-between py-2 border-2 border-gray-200"
                                    >
                                        <Link
                                            to="/profile"
                                            className=" text-indigo-950 font-normal flex items-center"
                                        >
                                            <div className="grid grid-cols-3 gap-3">
                                                <IoPersonCircleOutline
                                                    className="col-span-1"
                                                    size={20}
                                                />
                                                <Text className="col-span-2">
                                                    Profile
                                                </Text>
                                            </div>
                                        </Link>
                                        <Link
                                            to="/chat"
                                            className=" text-indigo-950 font-normal flex items-center"
                                        >
                                            <div className="grid grid-cols-3 gap-3">
                                                <IoMdChatbubbles size={20} />
                                                <Text className="col-span-2">
                                                    Chat
                                                </Text>
                                            </div>
                                        </Link>
                                        <div
                                            className="text-red-500 font-normal flex items-center"
                                            onClick={logOut}
                                        >
                                            <div className="grid grid-cols-3 gap-3">
                                                <RiLogoutCircleLine size={20} />
                                                <Text className="col-span-2">
                                                    Logout
                                                </Text>
                                            </div>
                                        </div>
                                    </VStack>
                                )}
                            </div>
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
