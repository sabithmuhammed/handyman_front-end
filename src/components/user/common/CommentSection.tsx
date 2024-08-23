import {
    Avatar,
    Box,
    Flex,
    HStack,
    Input,
    Text,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import EmojiPicker from "emoji-picker-react";
import React, { useEffect, useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiGrin } from "react-icons/bs";
import {
    addComment,
    addReply,
    deleteComment,
    deleteReply,
    getComments,
} from "../../../api/postApi";
import { CommentType } from "../../../types/stateTypes";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

type PropType = {
    postId: string;
    handeleCommentCount?: () => void;
};

const CommentSection = ({ postId, handeleCommentCount }: PropType) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [comment, setComment] = useState("");
    const [emojiOpen, setEmojiOpen] = useState(false);
    const [replyUser, setReplyUser] = useState<{
        name: string;
        commentId: string;
    } | null>(null);
    const { userInfo } = useSelector((state: RootState) => state.auth);

    const [showReply, setShowReply] = useState("");

    useEffect(() => {
        (async () => {
            const res = await getComments(postId);
            if (res?.data) {
                setComments(res.data);
            }
        })();
    }, []);

    const postComment = async () => {
        if (!comment.trim()) {
            return;
        }
        if (replyUser) {
            const res = await addReply(replyUser.commentId, comment.trim());
            if (res?.data) {
                const updated = comments.map((comment) => {
                    if (comment._id == replyUser.commentId) {
                        return res.data;
                    }
                    return comment;
                });
                setComments(updated);
                setReplyUser(null);
                setComment("");
            }
        } else {
            const res = await addComment(postId, comment.trim());
            if (res?.data) {
                const newComment = {
                    ...res.data,
                    userId: {
                        _id: res.data.userId,
                        name: userInfo?.name,
                        profile: userInfo?.profile,
                    },
                };
                setComments([...comments, newComment]);
                setComment("");
            }
        }
        if (handeleCommentCount) {
            handeleCommentCount();
        }
    };

    const removeComment = async (commentId: string) => {
        const res = await deleteComment(commentId);

        if (res?.data) {
            if (res.data.softDelete) {
                setComments((c) =>
                    c.map((comment) =>
                        comment._id === commentId ? res.data : comment
                    )
                );
            } else {
                setComments((c) =>
                    c.filter((comment) => comment._id !== commentId)
                );
            }
        }
        if (handeleCommentCount) {
            handeleCommentCount();
        }
    };

    const removeReply = async (commentId: string, replyId: string) => {
        const res = await deleteReply(commentId, replyId);

        if (res?.data) {

            if (res.data) {
                setComments((c) =>
                    c.map((comment) =>
                        comment._id === commentId ? res.data : comment
                    )
                );
            } 
            if(res.data.replies.length === 1 && res.data.softDelete) {
                setComments((c) =>
                    c.filter((comment) => comment._id !== commentId)
                );
            }
        }
        if (handeleCommentCount) {
            handeleCommentCount();
        }
    };

    return (
        <Flex bg={"gray.100"} p={3} direction={"column"} rounded={"md"}>
            <Text fontWeight={"bold"}>Comments</Text>
            <div className="max-h-[60vh] overflow-auto">
                {comments.length !== 0 ? (
                    comments.map((comment) => (
                        <Flex
                            justifyContent={"space-between"}
                            marginY={3}
                            key={comment._id}
                            className="border-b-[2px] border-gray-500 border-opacity-15"
                        >
                            <Flex w={"full"} gap={2}>
                                <WrapItem>
                                    <Avatar
                                        name={comment.userId.name}
                                        src={comment.userId.profile}
                                        size={"sm"}
                                    />
                                </WrapItem>
                                <WrapItem flexGrow={1}>
                                    <Flex direction={"column"} w={"full"}>
                                        <Flex direction={"row"}>
                                            <Text
                                                fontSize={"sm"}
                                                fontWeight={"bold"}
                                                me={2}
                                            >
                                                {comment.userId.name}
                                            </Text>
                                            <Text
                                                fontSize={"xs"}
                                                color={"gray.600"}
                                            >
                                                {new Date(
                                                    comment.createdAt
                                                ).toLocaleString("en-AU", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </Text>
                                        </Flex>
                                        {comment.softDelete ? (
                                            <Flex
                                                as={"i"}
                                                fontSize={"sm"}
                                                opacity={0.8}
                                            >
                                                {comment.comment}
                                            </Flex>
                                        ) : (
                                            <Flex>{comment.comment}</Flex>
                                        )}
                                        <Flex userSelect={"none"}>
                                            <Text
                                                fontSize={"xs"}
                                                me={5}
                                                cursor={"pointer"}
                                                onClick={() =>
                                                    setReplyUser({
                                                        name: comment.userId
                                                            .name,
                                                        commentId: comment._id,
                                                    })
                                                }
                                            >
                                                Reply
                                            </Text>
                                            {comment.replies.length !== 0 && (
                                                <Text
                                                    fontSize={"xs"}
                                                    cursor={"pointer"}
                                                    me={5}
                                                    onClick={() =>
                                                        setShowReply(
                                                            comment._id
                                                        )
                                                    }
                                                >
                                                    View replies
                                                </Text>
                                            )}
                                            {comment.userId._id ===
                                                userInfo?.userId &&
                                                !comment.softDelete && (
                                                    <Text
                                                        fontSize={"xs"}
                                                        me={5}
                                                        cursor={"pointer"}
                                                        color={"red.400"}
                                                        onClick={() =>
                                                            removeComment(
                                                                comment._id
                                                            )
                                                        }
                                                    >
                                                        Remove
                                                    </Text>
                                                )}
                                        </Flex>
                                        {comment._id == showReply && (
                                            <Flex
                                                maxH={"30vh"}
                                                my={2}
                                                overflow={"scroll"}
                                                direction={"column"}
                                                flexGrow={1}
                                                className="border-s-[2px] border-gray-500 border-opacity-15 ps-2"
                                            >
                                                {comment.replies.length !== 0 &&
                                                    comment.replies.map(
                                                        (reply) => (
                                                            <Flex
                                                                key={
                                                                    reply._id
                                                                }
                                                                className="border-t-[2px] border-gray-500 border-opacity-15 pt-2"
                                                            >
                                                                <Avatar
                                                                    name={
                                                                        reply
                                                                            .userId
                                                                            .name
                                                                    }
                                                                    src={
                                                                        reply
                                                                            .userId
                                                                            .profile
                                                                    }
                                                                    size={"sm"}
                                                                    me={2}
                                                                />
                                                                <Box>
                                                                    <Flex
                                                                        direction={
                                                                            "row"
                                                                        }
                                                                    >
                                                                        <Text
                                                                            fontSize={
                                                                                "sm"
                                                                            }
                                                                            fontWeight={
                                                                                "bold"
                                                                            }
                                                                            me={
                                                                                2
                                                                            }
                                                                        >
                                                                            {
                                                                                reply
                                                                                    .userId
                                                                                    .name
                                                                            }
                                                                        </Text>
                                                                        <Text
                                                                            fontSize={
                                                                                "xs"
                                                                            }
                                                                            color={
                                                                                "gray.600"
                                                                            }
                                                                        >
                                                                            {new Date(
                                                                                reply.createdAt
                                                                            ).toLocaleString(
                                                                                "en-AU",
                                                                                {
                                                                                    day: "2-digit",
                                                                                    month: "2-digit",
                                                                                    year: "numeric",
                                                                                    hour: "numeric",
                                                                                    minute: "numeric",
                                                                                    hour12: true,
                                                                                }
                                                                            )}
                                                                        </Text>
                                                                    </Flex>
                                                                    <Flex className="text-balance">
                                                                        {
                                                                            reply.comment
                                                                        }
                                                                    </Flex>
                                                                    {reply
                                                                        .userId
                                                                        ._id ===
                                                                        userInfo?.userId && (
                                                                        <Text
                                                                            fontSize={
                                                                                "xs"
                                                                            }
                                                                            me={
                                                                                5
                                                                            }
                                                                            cursor={
                                                                                "pointer"
                                                                            }
                                                                            color={
                                                                                "red.400"
                                                                            }
                                                                            onClick={() =>
                                                                                removeReply(
                                                                                    comment._id,
                                                                                    reply._id
                                                                                )
                                                                            }
                                                                        >
                                                                            Remove
                                                                        </Text>
                                                                    )}
                                                                </Box>
                                                            </Flex>
                                                        )
                                                    )}
                                            </Flex>
                                        )}
                                    </Flex>
                                </WrapItem>
                            </Flex>
                        </Flex>
                    ))
                ) : (
                    <Text textAlign={"center"} my={4}>
                        No comments yet
                    </Text>
                )}
            </div>
            <HStack w={"full"} h={"full"} spacing={3} position={"relative"}>
                {true ? (
                    <BsEmojiGrin
                        size={24}
                        color="gray.500"
                        onClick={() => setEmojiOpen(true)}
                    />
                ) : (
                    <div className="fixed bottom-4 z-10 border-gray-500 border-2">
                        <EmojiPicker
                            onEmojiClick={({ emoji }) => {
                                setComment(comment + emoji);
                                setEmojiOpen(false);
                            }}
                        />
                    </div>
                )}
                {replyUser && (
                    <div className=" opacity-90 absolute -top-full left-9 px-3 py-1 rounded-full bg-gray-700 text-white text-sm flex items-center">
                        <p className="me-3">Replying to {replyUser.name}</p>
                        <IoCloseCircleOutline
                            size={18}
                            className="cursor-pointer"
                            onClick={() => setReplyUser(null)}
                        />
                    </div>
                )}
                <Input
                    placeholder="Type something..."
                    size="md"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            postComment();
                        }
                    }}
                />

                <AiOutlineSend
                    size={24}
                    color="gray.500"
                    onClick={postComment}
                />
            </HStack>
            <Flex></Flex>
        </Flex>
    );
};

export default CommentSection;
