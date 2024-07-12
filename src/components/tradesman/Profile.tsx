import { Avatar, Box, Flex, Input } from "@chakra-ui/react";
import React from "react";
import { PiCameraBold } from "react-icons/pi";

const Profile = () => {
    return (
        <div className="w-full max-w-[500px] ">
            <Flex alignItems={"center"}>
                <Box className="relative flex">
                    <Avatar
                        position={"relative"}
                        src=""
                        name={"sam jackson"}
                        size={"xl"}
                    ></Avatar>
                    <div className="absolute bottom-3 -right-2 rounded-full bg-white w-[30px] h-[30px] flex justify-center items-center">
                        <PiCameraBold size={18} className="text-blue-800" />
                    </div>
                    <input type="file" name="" id="image" hidden />
                </Box>
                <Input type="text" placeholder="fdsfds" bg={"white"} ms={4} readOnly/>
            </Flex>
        </div>
    );
};

export default Profile;
