import {
    Avatar,
    Box,
    Flex,
    Grid,
    GridItem,
    HStack,
    Input,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PostCard from "../../components/user/common/PostCard";
import List from "../../components/user/chat/List";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { AiOutlineSend } from "react-icons/ai";
import { IoCheckmarkOutline } from "react-icons/io5";
import ChatWindow from "../../components/user/chat/ChatWindow";
import logo from "../../assets/logo.png"

const Chat = () => {
    const [chat, setChat] = useState("");



    return (
        <div className="pt-20 pb-7 min-h-screen">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <List setChat={setChat} chat={chat}/>
                {chat ? (
                    <ChatWindow />
                ) : (
                    <Box
                        w="100%"
                        bg="gray.200"
                        h={"85vh"}
                        rounded={10}
                        className="flex flex-col col-span-2 justify-center items-center"
                        boxShadow={"md"}
                    >
                        <img src={logo} alt="" width={200} className="mix-blend-multiply"/>
                        <Text fontSize={"2xl"} fontWeight={"bold"}>No chat selected</Text>
                    </Box>
                )}
            </Grid>
        </div>
    );
};

export default Chat;
