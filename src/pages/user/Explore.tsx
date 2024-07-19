import React, { useEffect, useState } from "react";
import { PostType } from "../../types/stateTypes";
import PostCard from "../../components/user/common/PostCard";
import NoPosts from "../../components/common/NoPosts";
import { getAllPosts } from "../../api/postApi";

const Explore = () => {
    const [posts, setPosts] = useState<PostType[]>([]);
    useEffect(() => {
        (async () => {
            const res = await getAllPosts();
            if (res?.data) {
                setPosts(res.data);
            }
        })();
    }, []);
    return (
        <div className="pt-20 w-full  min-h-dvh flex justify-center">
            <div className="max-w-[550px] h-full w-full">
                {posts.length !== 0 ? (
                    posts.map((post) => <PostCard key={post._id} {...post} />)
                ) : (
                    <NoPosts />
                )}
            </div>
        </div>
    );
};

export default Explore;
