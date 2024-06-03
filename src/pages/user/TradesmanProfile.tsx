import { Box, Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";
import PostCard from "../../components/user/common/PostCard";
import ProfileTile from "../../components/user/Tradesman/ProfileTile";

const TradesmanProfile = () => {
    return (
        <div className="pt-20 pb-7 min-h-screen">
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                <ProfileTile />
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
                        <PostCard />
                        <PostCard />
                        <PostCard />
                    </Grid>
                </GridItem>
            </Grid>
        </div>
    );
};

export default TradesmanProfile;
