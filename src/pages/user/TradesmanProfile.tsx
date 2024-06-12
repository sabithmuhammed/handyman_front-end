import { Box, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import PostCard from "../../components/user/common/PostCard";
import ProfileTile from "../../components/user/Tradesman/ProfileTile";
import { PostType, Tradesman } from "../../types/stateTypes";
import { getPostsById, getProfileMinimum } from "../../api/tradesmanApi";

const TradesmanProfile = () => {
    const [tradesman, setTradesman] = useState<Tradesman>();
    const [posts, setPosts] = useState<PostType[]>([]);
    const { tradesmanId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            if (tradesmanId) {
                const res = await getProfileMinimum(tradesmanId);
                if (res?.data) {
                    setTradesman(res.data);
                    return;
                }
            }
            navigate(-1);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (tradesmanId) {
                const res = await getPostsById(tradesmanId);
                if (res?.data) {
                    setPosts(res.data);
                    
                    return;
                }
            }
            navigate(-1);
        })();
    }, []);

    return (
        <div className="pt-20 pb-7 min-h-screen">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                {tradesman && <ProfileTile {...tradesman} />}
                <GridItem w="100%" bg="" colSpan={2}>
                    <Grid gap={4}>
                        <Box
                            h={"400px"}
                            w={"full"}
                            bg={"white"}
                            boxShadow={"xl"}
                            rounded={6}
                        ></Box>
                        <Box
                            h={"50px"}
                            w={"full"}
                            bg={"white"}
                            boxShadow={"xl"}
                            rounded={6}
                        >
                            <NavLink to="./abc">Posts</NavLink>
                            <NavLink to="./abc">Reviews</NavLink>
                        </Box>
                        {posts.length !== 0 && tradesman &&
                            posts.map((post) => (
                                <PostCard key={post._id} {...post} {...tradesman}/>
                            ))}
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    );
};

export default TradesmanProfile;
