import React, { useEffect, useState } from "react";
import Hero from "../../components/user/home/Hero";
import Filter from "../../components/user/common/Filter";
import Card from "../../components/user/common/Card";
import { getAllTradesmen, getSkills } from "../../api/userApi";
import CardSkeleton from "../../components/skeletons/CardSkeleton";
import { Skeleton } from "@chakra-ui/react";
import SkillSkeleton from "../../components/skeletons/SkillSkeleton";
import { Tradesman } from "../../types/stateTypes";

const UserHome = () => {
    const [skills, setSkills] = useState<string[]>([]);
    const [selected, setSelected] = useState("");
    const [skillLoading, setSkillLoading] = useState(true);
    const [cardLoading, setCardLoading] = useState(true);
    const [tradesmen, setTradesmen] = useState<Tradesman []>([]);
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
    useEffect(() => {
        (async () => {
            const res = await getAllTradesmen({ category:selected },5);
            if (res?.data) {
                setTradesmen(res.data?.tradesmen);
                setCardLoading(false)
            }
        })();
    }, [selected]);
    return (
        <>
            <Filter>
                <Hero />
            </Filter>
            <div className="py-5 md:py-16 px-5 md:px-9">
                <h1 className="text-2xl md:text-3xl font-bold text-indigo-950">
                    Our Best Tradesmen
                </h1>
                <ul className="w-100 flex mt-3 md:mt-6 overflow-auto">
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
                                } me-2 px-5 rounded-full flex items-center py-1 select-none cursor-pointer flex-shrink-0`}
                                key={skill}
                                onClick={() => setSelected(skill)}
                            >
                                {skill}
                            </li>
                        ))
                    )}
                </ul>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-5 my-6 text-gray-900 max-md:place-items-center">
                {cardLoading ? (
                        <>
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                            <CardSkeleton />
                        </>
                    ) : tradesmen?.length != 0 ? (
                        tradesmen.map((tradesman) => (
                            <Card key={tradesman._id} {...tradesman} />
                        ))
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default UserHome;
