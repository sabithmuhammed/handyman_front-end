import {
    Avatar,
    Box,
    Flex,
    Grid,
    GridItem,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Stack,
    StackDivider,
    Text,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import PostCard from "../../components/user/common/PostCard";
import List from "../../components/user/chat/List";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { AiOutlineSend } from "react-icons/ai";
import { IoCheckmarkOutline } from "react-icons/io5";
import ChatWindow from "../../components/user/chat/ChatWindow";
import logo from "../../assets/logo.png";
import {
    addConversation,
    getConversations,
    getMessages,
} from "../../api/chatApi";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
    ConversationType,
    MessageType,
    ReceiverType,
} from "../../types/stateTypes";
import { io, Socket } from "socket.io-client";

const Chat = () => {
    const [chat, setChat] = useState<string>("");
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const [searchParams] = useSearchParams();
    const user = searchParams.get("user") || null;
    const isTradesman = Boolean(searchParams.get("t")) || false;
    const { tradesmanInfo } = useSelector((state: RootState) => state.auth);
    const [senderId, setSenderId] = useState(tradesmanInfo?.tradesmanId);
    const [receiverInfo, setReceiverInfo] = useState<ReceiverType>(
        {} as ReceiverType
    );
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState<MessageType>();
    const socket = useRef<Socket | undefined>();

    useEffect(() => {
        console.log(user, senderId, "hiiii");
        (async () => {
            if (user && senderId) {
                console.log(user, senderId);

                const res = await addConversation({
                    user1: user,
                    user2: senderId,
                    tradesman: isTradesman ? user : null,
                });
                if (res?.data) {
                    setChat(res.data._id);
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (senderId) {
                const res = await getConversations(senderId);
                if (res?.data) {
                    setConversations(res.data);
                }
            }
        })();
    }, [messages]);

    useEffect(() => {
        (async () => {
            if (chat) {
                const res = await getMessages(chat);
                if (res?.data) {
                    setMessages(res.data);
                }
            }
        })();
    }, [chat]);

    useEffect(() => {
        socket.current = io(import.meta.env.VITE_CHAT_URL);
        socket.current.emit("addUser", { userId: senderId });

        socket.current.on("newMessage", (message) => {
            console.log(message, "hhhhhh");

            setNewMessage(message);
        });

        return () => {
            socket.current?.close();
        };
    }, []);

    useEffect(() => {
        if (newMessage) {
            setMessages((m) => [...m, newMessage]);
        }
    }, [newMessage]);

    return (
        <div className="">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem w="100%" colSpan={1}>
                    <Flex
                        // h={"85vh"}
                        // w={"full"}
                        // className="bg-indigo-200"
                        // rounded={10}
                        // py={6}
                        // overflow={"auto"}
                        // boxShadow={"md"}
                        // direction={"column"}

                        h={{base:"100vh",md:"85vh"}}
                        w={"full"}
                        className="max-md:bg-white bg-gray-200"
                        
                        rounded={10}
                        py={6}
                        overflow={"auto"}
                        boxShadow={"md"}
                        direction={"column"}
                    >
                        <Box px={6}>
                            <InputGroup boxShadow={"md"}>
                                <InputLeftElement pointerEvents="none">
                                    <FiSearch color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="search"
                                    placeholder="search..."
                                    bg={"white"}
                                />
                            </InputGroup>
                        </Box>
                        <VStack spacing={0} mt={3} overflow={"auto"} px={6} divider={<StackDivider color={"gray.300"}/>} >
                            {conversations.length !== 0 &&
                                conversations.map((conversation) => (
                                    <List
                                        key={conversation._id}
                                        setChat={setChat}
                                        chat={chat}
                                        conversation={conversation}
                                        senderId={senderId as string}
                                        setReceiverInfo={setReceiverInfo}
                                    />
                                ))}
                        </VStack>
                    </Flex>
                </GridItem>

                {chat ? (
                    <ChatWindow
                        receiverInfo={receiverInfo}
                        senderId={senderId as string}
                        messages={messages}
                        setMessages={setMessages}
                        chat={chat}
                    />
                ) : (
                    <Box
                        w="100%"
                        bg="gray.200"
                        h={"85vh"}
                        rounded={10}
                        className="flex flex-col col-span-2 justify-center items-center"
                        boxShadow={"md"}
                    >
                        <img
                            src={logo}
                            alt=""
                            width={200}
                            className="mix-blend-multiply"
                        />
                        <Text fontSize={"2xl"} fontWeight={"bold"}>
                            No chat selected
                        </Text>
                    </Box>
                )}
            </Grid>
        </div>
    );
};

export default Chat;
