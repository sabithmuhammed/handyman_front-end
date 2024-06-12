import {
    Avatar,
    Box,
    Flex,
    GridItem,
    HStack,
    Input,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MessageType, ReceiverType } from "../../../types/stateTypes";
import { sendMessage } from "../../../api/chatApi";
import { Socket } from "socket.io-client";
import {format} from "timeago.js";

type PropType = {
    receiverInfo: ReceiverType;
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    chat: string;
    socket: Socket | undefined;
};

const ChatWindow = ({
    receiverInfo,
    messages,
    chat,
    setMessages,
    socket,
}: PropType) => {
    const [text, setText] = useState("");
    const handleMessageSend = async () => {
        if (!text.trim()) return;
        const res = await sendMessage({
            text: text.trim(),
            receiverId: receiverInfo.receiverId,
            conversationId: chat,
        });
        if (res?.data) {
            setText("");
            setMessages([...messages, res.data]);
            socket?.emit("sendMessage", res.data);
        }
    };

    return (
        <GridItem
            w="100%"
            bg="white"
            colSpan={2}
            h={"85vh"}
            rounded={10}
            className="flex flex-col"
            boxShadow={"md"}
        >
            <Box
                h={16}
                roundedTop={10}
                className="border-b-2 border-gray-500 flex items-center"
                px={5}
            >
                <Wrap bg={"white"} p={2} rounded={"md"} cursor={"pointer"}>
                    <WrapItem>
                        <Avatar
                            name={receiverInfo.name}
                            src={receiverInfo.image}
                            size={"sm"}
                        />
                    </WrapItem>
                    <WrapItem>
                        <Flex direction={"column"}>
                            <Flex direction={"column"}>
                                <Text fontSize={"sm"} fontWeight={"bold"}>
                                    {receiverInfo.name}
                                </Text>
                                <Text fontSize={"xs"} color={"gray.600"}>
                                    Online
                                </Text>
                            </Flex>
                        </Flex>
                    </WrapItem>
                </Wrap>
            </Box>
            <Box
                className="flex-grow flex flex-col"
                bg={"white"}
                overflow={"auto"}
                px={3}
            >
                {messages.length !== 0 &&
                    messages.map((message) =>
                        message.receiverId !== receiverInfo.receiverId ? (
                            <Box
                                my={3}
                                bg={"blue.200"}
                                w={"fit-content"}
                                px={3}
                                py={2}
                                rounded={"3xl"}
                                roundedTopLeft={0}
                                maxW={"80%"}
                                boxShadow={"md"}
                                key={message._id}
                            >
                                <Text>{message.message.content}</Text>
                                <Flex
                                    ps={2}
                                    w={"full"}
                                    justifyContent={"flex-end"}
                                >
                                    <Text fontSize={"xs"} me={2}>
                                        {format(message.updatedAt)}
                                    </Text>
                                </Flex>
                            </Box>
                        ) : (
                            <Box
                                my={3}
                                bg={"gray.300"}
                                w={"fit-content"}
                                px={3}
                                py={2}
                                rounded={"3xl"}
                                roundedTopRight={0}
                                alignSelf={"end"}
                                maxW={"80%"}
                                boxShadow={"md"}
                                key={message._id}
                            >
                                <Text>{message.message.content}</Text>
                                <Flex
                                    ps={2}
                                    w={"full"}
                                    justifyContent={"flex-end"}
                                >
                                    <Text fontSize={"xs"} me={2}>
                                    {format(message.updatedAt)}
                                    </Text>
                                    <IoCheckmarkOutline />
                                </Flex>
                            </Box>
                        )
                    )}
            </Box>
            <Box
                className="border-t-2 border-gray-500"
                h={20}
                roundedBottom={10}
                px={5}
                py={2}
            >
                <HStack w={"full"} h={"full"} spacing={3}>
                    <BsEmojiGrin size={24} color="gray.500" />
                    <GoPaperclip size={24} color="gray.500" />
                    <Input
                        placeholder="Type something..."
                        size="md"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleMessageSend();
                            }
                        }}
                    />

                    <AiOutlineSend
                        size={24}
                        color="gray.500"
                        onClick={handleMessageSend}
                    />
                </HStack>
            </Box>
        </GridItem>
    );
};

export default ChatWindow;
