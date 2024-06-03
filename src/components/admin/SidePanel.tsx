import { Button, VStack } from "@chakra-ui/react";
import React from "react";
import { BsMailbox2Flag } from "react-icons/bs";
import { GrUserWorker } from "react-icons/gr";
import { RiUser6Fill } from "react-icons/ri";
import { TbLogout2 } from "react-icons/tb";
import { NavLink } from "react-router-dom";
import { logout } from "../../api/commonApi";
import { toast } from "react-toastify";
import { UseDispatch, useDispatch } from "react-redux";
import { logoutAdmin } from "../../redux/slice/authSlice";

const SidePanel = () => {
  const dispatch = useDispatch()
    return (
        <VStack
            spacing={4}
            align="start"
            pl={10}
            pt={10}
            bg="teal.600"
            minW="250px"
            w="250px"
            minH="100vh"
        >
            <NavLink
                to="verify"
                className={({ isActive, isPending }) =>
                    `cursor-pointer w-full rounded-s-full hover:bg-teal-700 ${
                        isPending
                            ? ""
                            : isActive
                            ? "bg-white hover:bg-white"
                            : "text-white"
                    }`
                }
            >
                <Button variant={""} leftIcon={<BsMailbox2Flag />}>
                    Verification
                </Button>
            </NavLink>
            <NavLink
                to="tradesmen"
                className={({ isActive, isPending }) =>
                    `cursor-pointer w-full rounded-s-full hover:bg-teal-700 ${
                        isPending
                            ? ""
                            : isActive
                            ? "bg-white hover:bg-white"
                            : "text-white"
                    }`
                }
            >
                <Button variant={""} leftIcon={<GrUserWorker />}>
                    Tradesmen
                </Button>
            </NavLink>
            <NavLink
                to="users"
                className={({ isActive, isPending }) =>
                    `cursor-pointer w-full rounded-s-full hover:bg-teal-700 ${
                        isPending
                            ? ""
                            : isActive
                            ? "bg-white hover:bg-white"
                            : "text-white"
                    }`
                }
            >
                <Button variant={""} leftIcon={<RiUser6Fill />}>
                    Users
                </Button>
            </NavLink>

            <Button
                colorScheme={"red"}
                leftIcon={<TbLogout2 width={"full"} />}
                onClick={async () => {
                    const response = await logout();
                    if (response) {
                        toast.success(response?.data?.data?.message);
                        dispatch(logoutAdmin());
                    }
                }}
            >
                Logout
            </Button>
        </VStack>
    );
};

export default SidePanel;
