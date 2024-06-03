import { Skeleton } from "@chakra-ui/react";
import React from "react";

const SkillSkeleton = () => {
    const skeleton: React.JSX.Element[] = [];
    for (let i = 0; i < 5; i++) {
        skeleton.push(
            <Skeleton
                className=" me-2 px-5 rounded-full flex items-center py-1"
                rounded={"full"}
                key={i}
            >
                <li
                    
                >
                    {'a'.repeat(Math.random() * (20 - 7) + 7)}
                </li>
            </Skeleton>
        );
    }
    return skeleton;
};

export default SkillSkeleton;
