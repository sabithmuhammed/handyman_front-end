import {
    Avatar,
    Box,
    Button,
    Center,
    Flex,
    Input,
    Stack,
    Text,
    Textarea,
    Wrap,
    WrapItem,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiComment, BiLike, BiLink, BiSolidLike } from "react-icons/bi";
import { Link } from "react-router-dom";
import CommentSection from "./CommentSection";
import { PostType } from "../../../types/stateTypes";
import { commentCount, likePost, unlikePost } from "../../../api/postApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toast } from "react-toastify";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import ModalComponent from "../../common/ModalComponent";

const PostCard = ({
    _id,
    text,
    image,
    date,
    name,
    profile,
    tradesmanId,
    likes,
    isTradesman = false,
    removePost,
    editText,
}: PostType & {
    name?: string | undefined;
    profile?: string | undefined;
    isTradesman?: boolean;
    removePost?: (postId: string) => void;
    editText?: (postId: string, text: string) => void;
}) => {
    const { userInfo } = useSelector((state: RootState) => state.auth);
    const [commentOpen, setCommentOpen] = useState(false);
    const [liked, setLiked] = useState(
        likes?.includes(userInfo?.userId as string)
    );
    const [commentCountChange, setCommentCountChange] = useState(true);
    const [likeCount, setLikeCount] = useState(likes?.length ?? 0);
    const [commentsCount, setCommentsCount] = useState(0);
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleString("en-AU", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
    });
    const {
        isOpen: isOpenE,
        onOpen: onOpenE,
        onClose: onCloseE,
    } = useDisclosure();
    const {
        isOpen: isOpenD,
        onOpen: onOpenD,
        onClose: onCloseD,
    } = useDisclosure();

    const [textEdit, setTextEdit] = useState(text);
    if (tradesmanId && typeof tradesmanId !== "string") {
        name = tradesmanId.name;
        profile = tradesmanId.profile;
    }

    useEffect(() => {
        (async () => {
            const res = await commentCount(_id);
            if (res?.data) {
                setCommentsCount(res.data);
            }
            console.log("comment change", res?.data);
        })();
    }, [commentCountChange]);
    const toggleLike = async () => {
        if (!userInfo) {
            toast.error("Please login to continue");
            return;
        }

        if (liked) {
            let res = await unlikePost(_id);
            if (res?.data) {
                setLikeCount((c) => res.data?.likeCount ?? c);
            }
        } else {
            let res = await likePost(_id);
            if (res?.data) {
                setLikeCount((c) => res.data?.likeCount ?? c);
            }
        }
        setLiked((l) => !l);
    };

    const deletePost = async () => {
        if (removePost) {
            await removePost(_id);
        }
        onCloseD();
    };

    const editPost = async () => {
        if (!textEdit?.trim()) {
            toast.error("Field can't be empty");
            return;
        }
        if (editText) {
            await editText(_id, textEdit.trim());
        }
        onCloseE();
    };

    return (
        <Box
            w={"full"}
            bg={"white"}
            boxShadow={"xl"}
            rounded={6}
            p={6}
            h={"fit-content"}
        >
            <Flex justifyContent={"space-between"}>
                <Wrap>
                    <WrapItem>
                        <Avatar name={name} src={profile} borderRadius={"5px"}/>
                    </WrapItem>
                    <WrapItem>
                        <Flex direction={"column"}>
                            <Text fontSize={"md"} fontWeight={"bold"}>
                                {name}
                            </Text>
                            <Text fontSize={"sm"} color={"gray.600"}>
                                {formattedDate}
                            </Text>
                        </Flex>
                    </WrapItem>
                </Wrap>
                {isTradesman && (
                    <Flex>
                        <Button colorScheme="blue" mx={3} onClick={onOpenE}>
                            <MdOutlineModeEditOutline size={20} />
                        </Button>
                        <Button colorScheme="red" onClick={onOpenD}>
                            <MdDeleteOutline size={20} />
                        </Button>
                    </Flex>
                )}
            </Flex>
            <Text noOfLines={[1, 2, 3]} py={3}>
                {text}
            </Text>
            <Box w={"full"} bg={"gray.200"} h={{ base: "200px", sm: "400px" }}>
                <img
                    src={image}
                    alt=""
                    className="object-contain w-full h-full"
                />
            </Box>
            <Stack direction="row" spacing={4} py={3}>
                <Flex>
                    <button className="mx-2" onClick={toggleLike}>
                        {liked ? (
                            <BiSolidLike
                                size={20}
                                className="text-indigo-950"
                            />
                        ) : (
                            <BiLike size={20} className="text-indigo-950" />
                        )}
                    </button>
                    <Text fontSize={"sm"}>{likeCount}</Text>
                </Flex>
                <Flex>
                    <button
                        className="mx-2"
                        onClick={() => {
                            if (!userInfo) {
                                toast.error("Please login to continue");
                                return;
                            }
                            setCommentOpen((c) => !c);
                        }}
                    >
                        <BiComment size={20} />
                    </button>
                    <Text fontSize={"sm"}>{commentsCount || 0}</Text>
                </Flex>
                {/* <Flex>
                    <button className="mx-2">
                        <BiLink size={20} />
                    </button>
                </Flex> */}
            </Stack>
            {commentOpen && (
                <CommentSection
                    postId={_id}
                    handeleCommentCount={() => setCommentCountChange((c) => !c)}
                />
            )}
            <ModalComponent
                isOpen={isOpenD}
                onClose={onCloseD}
                title={"Confirm your action"}
                action={{
                    text: "Delete",
                    color: "red",
                    onClick: deletePost,
                }}
            >
                <Text>Delete this post?</Text>
            </ModalComponent>

            <ModalComponent
                isOpen={isOpenE}
                onClose={onCloseE}
                title={"Edit description"}
                action={{
                    text: "Edit",
                    color: "blue",
                    onClick: editPost,
                }}
            >
                <Textarea
                    value={textEdit}
                    onChange={(e) => setTextEdit(e.target.value)}
                    placeholder="Type something..."
                    size="sm"
                    minW={"300px"}
                />
            </ModalComponent>
        </Box>
    );
};

export default PostCard;
