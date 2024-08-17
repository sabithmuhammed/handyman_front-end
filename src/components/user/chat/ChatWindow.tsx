import {
    Avatar,
    Box,
    Flex,
    GridItem,
    HStack,
    Image,
    Input,
    StackDivider,
    Text,
    useBoolean,
    VStack,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiGrin } from "react-icons/bs";
import { GoPaperclip } from "react-icons/go";
import { IoCheckmarkOutline } from "react-icons/io5";
import { MessageType, ReceiverType } from "../../../types/stateTypes";
import { removeUnreadMessage, sendMessage } from "../../../api/chatApi";
import { Socket } from "socket.io-client";
import { format } from "timeago.js";
import EmojiPicker from "emoji-picker-react";
import { useSocket } from "../../../context/SocketProvider";
import { FaRegImage } from "react-icons/fa6";
import Lottie from "lottie-react";
import roundLoader from "../../../assets/animation/roundLoading.json";
import ImageView from "./ImageView";
import { IoIosArrowBack } from "react-icons/io";

type PropType = {
    receiverInfo: ReceiverType;
    senderId: string;
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    chat: string;
    setChat: React.Dispatch<React.SetStateAction<string>>;
    tradesman?: boolean;
};

const ChatWindow = ({
    receiverInfo,
    senderId,
    messages,
    chat,
    setChat,
    setMessages,
    tradesman = false,
}: PropType) => {
    const socket = useSocket();

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

            socket?.emit("sendMessage", {
                message: res.data,
                toTradesman: !tradesman,
            });
        }
    };
    const [lastSeen, setLastSeen] = useState("");
    const [emojiOpen, setEmojiOpen] = useBoolean(false);
    const emojiRef = useRef<HTMLDivElement>(null);
    const [attachmentOpen, setAttachmentOpen] = useBoolean(false);
    const attachmentRef = useRef<HTMLDivElement>(null);
    const [selectedImage, setSelectedImage] = useState("");
    const [imageViewOpen, setImageViewOpen] = useBoolean(false);
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (divRef.current) {
            divRef.current.scrollTo({
                top: divRef.current.scrollHeight + 5,
                behavior: "smooth",
            });
        }
    }, [messages]);

    useEffect(() => {
        socket?.on("userOnline", (userId) => {
            if (userId === receiverInfo.receiverId) {
                setLastSeen("Online");
            }
        });
        socket?.on("userOffline", (data) => {
            if (data.userId === receiverInfo.receiverId) {
                setLastSeen(data.lastSeen);
            }
        });
        socket?.emit("getLastSeen", receiverInfo.receiverId, (user) => {
            if (user) {
                console.log(user);

                if (user.online) {
                    setLastSeen("Online");
                } else {
                    setLastSeen(user.lastSeen);
                }
            }
        });
    }, []);

    useEffect(() => {
        (async () => {
            const res = await removeUnreadMessage(chat, senderId);
        })();
    }, [messages]);

    useEffect(() => {
        const profileHandler = (e: MouseEvent) => {
            if (emojiOpen) {
                if (!emojiRef.current?.contains(e.target as Node)) {
                    setEmojiOpen.off();
                }
            }
            if (attachmentOpen) {
                if (!attachmentRef.current?.contains(e.target as Node)) {
                    setAttachmentOpen.off();
                }
            }
        };
        document.addEventListener("click", profileHandler);
        return () => {
            document.removeEventListener("click", profileHandler);
        };
    });

    const handleImageClick = (imageSrc: string) => {
        setSelectedImage(imageSrc);
        setImageViewOpen.on();
    };

    const [isChatOpen, setIsChatOpen] = useState(false);
    useEffect(() => {
        if (chat) {
            setIsChatOpen(true);
        }
    }, [chat]);

    return (
        <GridItem
            w="100%"
            bg="white"
            colSpan={2}
            rounded={{ md: 10 }}
            className={`flex flex-col max-md:absolute h-[92vh] md:h-[85vh] ${
                !isChatOpen ? "max-md:hidden" : "max-md:animate-slideIn"
            }`}
            boxShadow={"md"}
        >
            <Box
                h={16}
                roundedTop={{ md: 10 }}
                className="bg-gray-200 border-b-2 border-gray-500 flex items-center"
                px={{ sm: "2", md: "5" }}
            >
                <Wrap bg={"gray.200"} p={2} rounded={"md"} cursor={"pointer"}>
                    <div
                        className="md:hidden flex items-center w-6"
                        onClick={() => {
                            setIsChatOpen(false);
                            setChat("");
                        }}
                    >
                        <IoIosArrowBack size={20} />
                    </div>

                    <WrapItem>
                        <Avatar
                            name={receiverInfo.name}
                            src={receiverInfo.image}
                            size={"sm"}
                        />
                    </WrapItem>
                    <WrapItem>
                        <Flex direction={"column"} alignSelf={"center"}>
                            <Flex direction={"column"} transitionDelay={"400"}>
                                <Text fontSize={"sm"} fontWeight={"bold"}>
                                    {receiverInfo.name}
                                </Text>
                                {lastSeen && (
                                    <Text
                                        fontSize={"xs"}
                                        color={"gray.600"}
                                        as={"b"}
                                    >
                                        {lastSeen == "Online"
                                            ? lastSeen
                                            : "Last seen "+format(lastSeen, "twitter")}
                                    </Text>
                                )}
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
                        <Flex
                            key={message._id}
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
                                px={2}
                                overflow={"hidden"}
                                {...(message.receiverId !==
                                receiverInfo.receiverId
                                    ? {
                                          bg: "blue.200",
                                          borderTopLeftRadius: 0,
                                      }
                                    : {
                                          bg: "gray.300",
                                          borderTopRightRadius: 0,
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
                position={"relative"}
            >
                <HStack w={"full"} h={"full"} spacing={3}>
                    <BsEmojiGrin
                        size={24}
                        className={
                            emojiOpen ? `text-indigo-950` : `text-gray-700`
                        }
                        cursor={"pointer"}
                        onClick={(e) => {
                            e.stopPropagation();
                            setEmojiOpen.toggle();
                            setAttachmentOpen.off();
                        }}
                    />
                    {emojiOpen && (
                        <div
                            className="absolute bottom-full mb-2 z-10 shadow-md"
                            ref={emojiRef}
                        >
                            <EmojiPicker
                                onEmojiClick={({ emoji }) => {
                                    setText(text + emoji);
                                }}
                            />
                        </div>
                    )}

                    <GoPaperclip
                        size={24}
                        className={
                            attachmentOpen ? `text-indigo-950` : `text-gray-700`
                        }
                        onClick={(e) => {
                            e.stopPropagation();
                            setAttachmentOpen.toggle();
                            setEmojiOpen.off();
                        }}
                    />
                    {attachmentOpen && (
                        <VStack
                            divider={<StackDivider />}
                            className="absolute  bottom-full mb-2 z-10 bg-white rounded-md shadow-md border-2 border-gray-200 flex flex-col items-center justify-between py-2"
                        >
                            <div
                                className="grid grid-cols-3 gap-3 px-3 place-items-center cursor-pointer"
                                ref={attachmentRef}
                            >
                                <FaRegImage
                                    className="col-span-1 text-violet-600"
                                    size={18}
                                />
                                <Text className="col-span-2">Image</Text>
                            </div>
                        </VStack>
                    )}

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
            {imageViewOpen && (
                <ImageView
                    image={selectedImage}
                    onCloseHandler={() => setImageViewOpen.off()}
                />
            )}
        </GridItem>
    );
};

export default ChatWindow;
