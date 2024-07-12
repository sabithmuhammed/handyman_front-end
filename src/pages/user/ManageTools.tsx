import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {  IoIosAddCircle } from "react-icons/io";
import { ToolType } from "../../types/stateTypes";
import { getMyTools } from "../../api/userApi";

const ManageTools = () => {
    const [tools,setTools] = useState<ToolType []>([])

    useEffect(()=>{
        (async()=>{
            const res = await getMyTools();
            if(res?.data){
                setTools(res.data);
            }
        })()
    },[])
    return (
        <div className="pt-20 px-9">
            <Flex justifyContent={"end"}>
                <Link to="/add-tool">
                    <Button colorScheme="green" 
                    rightIcon={<IoIosAddCircle/>}>Add tools</Button>
                </Link>
            </Flex>
            <Flex alignItems={"center"} w={"full"} bg={"red.200"} direction={"column"} mt={3}>
                {tools.length !==0 ? tools.map((tool)=><div>

                </div>): <Text fontSize={"lg"}>
                    No tools yet
                </Text>
                }
            </Flex>
        </div>
    );
};

export default ManageTools;
