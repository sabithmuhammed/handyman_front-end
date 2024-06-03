import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import {  IoIosAddCircle } from "react-icons/io";

const ManageTools = () => {
    return (
        <div className="pt-20 px-9">
            <Flex justifyContent={"end"}>
                <Link to="/add-tool">
                    <Button colorScheme="green" 
                    rightIcon={<IoIosAddCircle/>}>Add tools</Button>
                </Link>
            </Flex>
        </div>
    );
};

export default ManageTools;
