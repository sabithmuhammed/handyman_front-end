import { Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { ImBlocked } from "react-icons/im";
import { Link, useSearchParams } from "react-router-dom";
import { logout } from "../api/commonApi";
import { useDispatch } from "react-redux";
import { logoutUser, removeTradesman } from "../redux/slice/authSlice";

const Block = () => {
    const [params, setParams] = useSearchParams();
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const response = await logout();
            if (response) {
                if (!params.get("tradesman")) {
                    dispatch(logoutUser());
                }
                dispatch(removeTradesman());
            }
        })();
    }, []);
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
            <div className="flex items-center">
                <ImBlocked size={40} className="text-red-500" />
                <div className="h-12 w-1 bg-black/50 mx-2 rounded-full"></div>
                <div className="flex flex-col">
                    <Text fontSize={"xl"} as={"b"}>
                        You have been blocked
                    </Text>
                    <Text fontSize={"md"} as={"i"}>
                        Your {params.get("tradesman") && <span className="font-semibold">tradesman</span>} account has been
                        blocked by admin
                    </Text>
                </div>
            </div>
            {params.get("tradesman") && <div className="mt-7 fixed bottom-10 flex flex-col items-center">
                <Text opacity={.5}>Note: You can use our services even after tradesman account is being blocked</Text>
                <Link to={"/"} className="text-blue-500 opacity-50 hover:opacity-100"> Back to home</Link>
            </div> }
        </div>
    );
};

export default Block;
