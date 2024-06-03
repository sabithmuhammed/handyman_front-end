import React, { useEffect, useState } from "react";
import Hero from "../../components/user/home/Hero";
import Filter from "../../components/user/common/Filter";
import Card from "../../components/user/common/Card";
import { getSkills } from "../../api/userApi";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { Skeleton } from "@chakra-ui/react";
import SkillSkeleton from "../../components/skeletons/SkillSkeleton";

const UserHome = () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [selected, setSelected] = useState("");
    const [skillLoading, setSkillLoading] = useState(true);
    const [cardLoading, setCardLoading] = useState(true);
    useEffect(() => {
        (async () => {
            const res = await getSkills();
            if (res?.data) {
                setSkills(res.data);
                setSelected(res.data[0]);
                setSkillLoading(false);
            }
        })();
    }, []);
    return (
        <>
            <Filter>
                <Hero />
            </Filter>
            <div className="py-16 px-9">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Our Best Tradesmen
                </h1>
                <ul className="w-100 flex mt-6">
                    {skillLoading ? (
                        <SkillSkeleton />
                    ) : (
                        skills.length > 0 &&
                        skills.map((skill) => (
                            <li
                                className={`${
                                    selected == skill
                                        ? `bg-indigo-950 text-white`
                                        : `text-indigo-950 bg-blue-100`
                                } me-2 px-5 rounded-full flex items-center py-1 select-none cursor-pointer`}
                                key={skill}
                                onClick={() => setSelected(skill)}
                            >
                                {skill}
                            </li>
                        ))
                    )}
                </ul>
                <div className="grid grid-cols-5 gap-x-5 my-6 text-gray-900">
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                    <CardSkeleton />
                </div>
            </div>
        </>
    );
};

export default UserHome;
