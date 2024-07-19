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
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MessageType, ReceiverType } from "../../../types/stateTypes";
import { sendMessage } from "../../../api/chatApi";
import { Socket } from "socket.io-client";
import { format } from "timeago.js";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "../../../context/SocketProvider";

type PropType = {
    receiverInfo: ReceiverType;
    senderId: string;
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    chat: string;
    tradesman?:boolean
};

const ChatWindow = ({
    receiverInfo,
    senderId,
    messages,
    chat,
    setMessages,
    tradesman = false
}: PropType) => {
    const socket = useSocket()
    
    const [text, setText] = useState("");
    const handleMessageSend = async () => {
        if (!text.trim()) return;
        const res = await sendMessage({
            text: text.trim(),
            receiverId: receiverInfo.receiverId,
            conversationId: chat,
            senderId,
        });
        if (res?.data) {
            setText("");
            setMessages([...messages, res.data]);
            
            socket?.emit("sendMessage", {message:res.data,toTradesman:!tradesman});
        }
    };
    const [emojiOpen, setEmojiOpen] = useState(false);
    const divRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTo({
                top: divRef.current.scrollHeight + 5,
                behavior: 'smooth',
              });
          }
        
    }, [messages]);
    return (
        <GridItem 
            w="100%"
            bg="white"
            colSpan={2}
            h={"85vh"}
            rounded={10}
            className="flex flex-col max-md:hidden"
            boxShadow={"md"}
        >
            <Box
                h={16}
                roundedTop={10}
                className="bg-gray-200 border-b-2 border-gray-500 flex items-center"
                px={5}
            >
                <Wrap bg={"gray.200"} p={2} rounded={"md"} cursor={"pointer"}>
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
                                <Text
                                    fontSize={"xs"}
                                    color={"gray.600"}
                                    as={"b"}
                                >
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
                ref={divRef}
            >
                {messages.length !== 0 &&
                    messages.map((message) => (
                        <Flex key={message._id}
                            my={1}
                            {...(message.receiverId !== receiverInfo.receiverId
                                ? {
                                      alignSelf: "start",
                                  }
                                : { alignSelf: "end" })}
                        >
                            <div
                                className={
                                    message.receiverId !==
                                    receiverInfo.receiverId
                                        ? `inline-block w-0 h-0 border-solid border-t-0 border-r-[10px] border-l-0 border-b-[10px] border-l-transparent border-r-blue-300 border-t-transparent border-b-transparent order-0`
                                        : `inline-block w-0 h-0 border-solid border-t-[10px] border-r-[10px] border-l-0 border-b-0 border-l-transparent border-r-transparent border-t-gray-300 border-b-transparent order-2`
                                }
                            ></div>
                            <Flex
                                rounded={"md"}
                                px={3}
                                overflow={"hidden"}
                                {...(message.receiverId !==
                                receiverInfo.receiverId
                                    ? {
                                          bg: "blue.200",
                                          borderTopLeftRadius: 0,
                                      }
                                    : { bg: "gray.300",
                                        borderTopRightRadius:0
                                     })}
                            >
                                <Text my={2} color={"gray.700"}>
                                    {message.message.content}
                                </Text>
                                <Flex
                                    h={"full"}
                                    alignItems={"flex-end"}
                                    ms={2}
                                    pb={1}
                                    color={"gray.600"}
                                >
                                    <Text fontSize={"12px"} me={2}>
                                        {format(message.updatedAt, "twitter")}
                                    </Text>
                                </Flex>
                            </Flex>
                        </Flex>
                    ))}
            </Box>
            <Box
                className="border-t-2 border-gray-500"
                h={20}
                roundedBottom={10}
                px={5}
                py={2}
                bg={"gray.200"}
            >
                <HStack w={"full"} h={"full"} spacing={3}>
                    {!emojiOpen ? (
                        <BsEmojiGrin
                            size={24}
                            color="gray.500"
                            onClick={() => setEmojiOpen(true)}
                        />
                    ) : (
                        <div className="fixed bottom-4 z-10 border-gray-500 border-2">
                            <EmojiPicker
                                onEmojiClick={({ emoji }) => {
                                    setText(text + emoji);
                                    setEmojiOpen(false);
                                }}
                            />
                        </div>
                    )}
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
