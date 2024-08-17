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
import { toast } from "react-toastify";

const Chat = () => {
    const [chat, setChat] = useState<string>("");
    const chatRef = useRef(chat);
    const [convo, setConvo] = useState("");
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

    const [search, setSearch] = useState("");

    const socket = useSocket();

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
                console.log("hiiii");

                const res = await getConversations(senderId);
                if (res?.data) {
                    setConversations(res.data);
                }
            }
        })();
    }, [messages, convo]);

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
    const updateMessage = (message) => {
        if (chatRef.current === message.conversationId) {
            setNewMessage(message);
        } else {
            setConvo(message._id);
        }
    };

    useEffect(() => {
        socket?.on("newMessageUser", (message) => {
            {
                if (message) {
                    updateMessage(message);
                }
            }
        });
    }, []);

    useEffect(() => {
        if (newMessage) {
            setMessages((m) => [...m, newMessage]);
        }
    }, [newMessage]);

    return (
        <div className="max-md:pt-8 pt-20 max-md:pb-0 pb-7 md:min-h-screen">
            <Grid
                templateColumns="repeat(3, 1fr)"
                gap={6}
                position={"relative"}
            >
                <GridItem w="100%" colSpan={{ base: 3, md: 1 }}>
                    <Flex
                        h={{ base: "92vh", md: "85vh" }}
                        w={"full"}
                        className=" bg-gray-200"
                        rounded={10}
                        overflow={"auto"}
                        boxShadow={"md"}
                        direction={"column"}
                    >
                        <Box px={6} mt={6}>
                            <InputGroup boxShadow={"md"}>
                                <InputLeftElement pointerEvents="none">
                                    <FiSearch color="gray.300" />
                                </InputLeftElement>
                                <Input
                                    type="search"
                                    placeholder="search..."
                                    bg={"white"}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                        chatRef={chatRef}
                                        chat={chat}
                                        conversation={conversation}
                                        senderId={senderId as string}
                                        setReceiverInfo={setReceiverInfo}
                                        search={search}
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
                        setChat={setChat}
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
