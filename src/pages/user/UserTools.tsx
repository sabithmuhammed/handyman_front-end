import React, { useEffect, useState } from "react";
import Filter from "../../components/user/common/Filter";
import { Button, Flex } from "@chakra-ui/react";
import { LuListChecks } from "react-icons/lu";
import { Link } from "react-router-dom";
import { getTools } from "../../api/userApi";
import Card from "../../components/user/common/Card";
import { ToolType } from "../../types/stateTypes";
import Skills from "../../components/user/common/Skills";

const UserTools = () => {
    const [tools, setTools] = useState<ToolType[]>([] as ToolType[]);
    useEffect(() => {
        (async () => {
            const res = await getTools();
            if (res?.data) {
                setTools(res.data);
            }
        })();
    }, []);
    return (
        <>
            <Filter></Filter>
            <div className="py-16 px-9">
                <Flex justify={"end"}>
                    <Link to="/manage-tools">
                        <Button
                            bg={"rgb(30 27 75)"}
                            color={"white"}
                            fontWeight={"sm"}
                            _hover={{ bg: "rgb(50 57 80 )" }}
                            leftIcon={<LuListChecks />}
                        >
                            Manage Your tools
                        </Button>
                    </Link>
                </Flex>
                <h1 className="text-3xl font-bold text-indigo-950">
                    All tools
                </h1>
                <div className="grid grid-cols-5 gap-x-5 my-6 text-gray-900">
                    {tools &&
                        tools.length > 0 &&
                        tools.map((item) => (
                            <Card
                                key={item._id}
                                name={item?.name}
                                profile={item.images[0]}
                                skills={item.rent}
                            />
                        ))}
                </div>
            </div>
        </>
    );
};

export default UserTools;
