import React, { useCallback, useEffect, useState } from "react";
import { PostType } from "../../types/stateTypes";
import PostCard from "../../components/user/common/PostCard";
import NoPosts from "../../components/common/NoPosts";
import { getAllPosts } from "../../api/postApi";
import {
    InfiniteScrollCallback,
    useInfiniteScroll,
} from "../../hooks/useInifiniteScroll";
import { Infinityloading } from "../../components/common/Infinityloading";

const Explore = () => {
    const fetchMoreData = useCallback(async (page: number) => {
        const res = await getAllPosts(page);
        const result: InfiniteScrollCallback<PostType> = {
            data: [],
            hasMore: false,
        };
        if (res?.data) {
            result.data = res.data.data;
            result.hasMore = res.data.hasMore;
        }
        return result;
    }, []);

    const {
        data: posts,
        setData: setPosts,
        isLoading,
        containerRef,
    } = useInfiniteScroll<PostType>(fetchMoreData);

    return (
        <div className="pt-8 lg:pt-20 w-full  min-h-dvh flex justify-center">
            <div
                className="h-screen overflow-auto w-full"
                ref={containerRef}
            >
                {posts.length !== 0 ? (
                    <>
                        {posts.map((post) => (
                            <div className="max-w-[550px] mx-auto" key={post._id}>
                                <PostCard key={post._id} {...post} />
                            </div>
                        ))}
                        {isLoading && <Infinityloading />}
                    </>
                ) : (
                    <NoPosts />
                )}
            </div>
        </div>
    );
};

export default Explore;
