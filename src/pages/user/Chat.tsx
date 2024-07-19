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
import { useSocket } from "../../context/SocketProvider";

const Chat = () => {
    const [chat, setChat] = useState<string>("");
    const [conversations, setConversations] = useState<ConversationType[]>([]);
    const [searchParams] = useSearchParams();
    const user = searchParams.get("user") || null;
    const isTradesman = Boolean(searchParams.get("t")) || false;
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [senderId, setSenderId] = useState(userInfo?.userId);
    const [receiverInfo, setReceiverInfo] = useState<ReceiverType>(
        {} as ReceiverType
    );
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [newMessage, setNewMessage] = useState<MessageType>();
    const socket = useSocket()

    useEffect(() => {
        (async () => {
            if (user && senderId) {
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
        socket?.on("newMessageUser", (message) => {
            console.log(message,"new Message");
            
            setNewMessage(message);
        });
    }, []);

    useEffect(() => {
        if (newMessage) {
            setMessages((m) => [...m, newMessage]);
        }
    }, [newMessage]);

    return (
        <div className="max-md:pt-8 pt-20 max-md:pb-0 pb-7 min-h-screen">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <GridItem w="100%" colSpan={{ base: 3, md: 1 }}>
                    <Flex
                        h={{ base: "100vh", md: "85vh" }}
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
                        <VStack
                            spacing={0}
                            mt={3}
                            overflow={"auto"}
                            px={6}
                            divider={<StackDivider color={"gray.300"} />}
                        >
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
                        messages={messages}
                        setMessages={setMessages}
                        chat={chat}
                        senderId={senderId as string}
                    />
                ) : (
                    <Box
                        w="100%"
                        bg="gray.200"
                        h={"85vh"}
                        rounded={10}
                        className="flex flex-col col-span-2 justify-center items-center max-md:hidden"
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
