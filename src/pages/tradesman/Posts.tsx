import React, { useEffect, useState } from "react";
import PostCard from "../../components/user/common/PostCard";
import {
    Box,
    Button,
    Grid,
    Image,
    Textarea,
    useDisclosure,
} from "@chakra-ui/react";
import { GrFormUpload } from "react-icons/gr";
import ModalComponent from "../../components/common/ModalComponent";
import { PostType } from "../../types/stateTypes";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import NoPosts from "../../components/common/NoPosts";
import { addNewPost, deletePost, editPost, getPosts } from "../../api/postApi";

const Posts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [text, setText] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [posts, setPosts] = useState<PostType[]>([]);
    const { tradesmanInfo } = useSelector((state: RootState) => state.auth);
    const [postUploadLoading, setPostUploadLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getPosts();
            if (response?.data) {
                setPosts(response.data);
            }
        })();
    }, []);

    const addPost = async () => {
        let err = false;
        if (!text.trim()) {
            toast.error("Please type something.");
            err = true;
        }
        if (!image) {
            toast.error("Please select an Image");
            err = true;
        }
        if (err) {
            return;
        }
        const formData = new FormData();
        formData.append("text", text);

        formData.append("image", image as File);
        setPostUploadLoading(true);
        const response = await addNewPost(formData);
        if (response?.data) {
            toast.success("Successfully added new Post");
            setPosts([response.data as PostType, ...posts]);
            onClose();
            setText("");
            setImage(null);
        }
        setPostUploadLoading(false);
    };

    const removePost = async (postId: string) => {
        const res = await deletePost(postId);
        if (res?.data) {
            const newPosts = posts.filter((post) => post._id !== postId);
            setPosts(newPosts);
        }
    };

    const editText = async (postId: string, text: string) => {
        const res = await editPost(postId, text);
        if (res?.data) {
            const newPosts = posts.map((post) => {
                if (post._id == postId) {
                    post.text = text;
                }
                return post;
            });
            setPosts(newPosts);
        }
    };

    return (
        <Grid gap={3} position={"relative"} minH={"full"}>
            {posts.length == 0 ? (
                <NoPosts />
            ) : (
                posts.map(({ _id, ...post }) => (
                    <PostCard
                        key={_id}
                        {...post}
                        {...tradesmanInfo}
                        _id={_id}
                        isTradesman
                        removePost={removePost}
                        editText={editText}
                    />
                ))
            )}

            <ModalComponent
                isOpen={isOpen}
                onClose={onClose}
                title={""}
                action={{
                    text: "Post",
                    color: "blue",
                    onClick: addPost,
                    loading: postUploadLoading,
                }}
            >
                <div className="flex items-center justify-center flex-col max-w-[400px]  w-svw">
                    <Textarea
                        placeholder="What's on your mind?"
                        size="md"
                        mb={3}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    {image && (
                        <Box boxSize="sm" w={"full"}>
                            <Image
                                src={URL.createObjectURL(image)}
                                alt="Dan Abramov"
                                objectFit={"contain"}
                                w={"full"}
                                h={"full"}
                            />
                        </Box>
                    )}

                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-200 mt-3"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Click to upload
                                </span>{" "}
                                or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                                if (e.target.files && e.target.files.length > 0)
                                    setImage(e.target.files[0]);
                            }}
                        />
                    </label>
                </div>
            </ModalComponent>

            <Button
                position={"fixed"}
                bottom={12}
                right={12}
                colorScheme="blue"
                rounded={"full"}
                p={0}
                className="animate-bounce"
                onClick={onOpen}
            >
                <GrFormUpload size={25} />
            </Button>
        </Grid>
    );
};

export default Posts;
