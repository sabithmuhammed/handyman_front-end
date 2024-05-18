import React from "react";
import PaginationButton from "../../components/user/common/PaginationButton";
import Card from "../../components/user/common/Card";
import Filter from "../../components/user/common/Filter";

const UserTradesmen = () => {
    return (
        <>
            <Filter />
            <div className="py-16 px-9">
                <h1 className="text-3xl font-bold text-indigo-950">
                    Our Best Tradesmen
                </h1>
                <ul className="w-100 flex mt-6">
                    <li className="me-2 text-indigo-950 bg-blue-100 px-5 rounded-full flex items-center py-1">
                        Plumber
                    </li>
                    <li className="mx-2 bg-indigo-950 text-white px-5 rounded-full items-center py-1">
                        Electrician
                    </li>
                    <li className="mx-2 text-indigo-950 bg-blue-100 px-5 rounded-full flex items-center py-1">
                        Mason
                    </li>
                    <li className="mx-2 text-indigo-950 bg-blue-100 px-5 rounded-full flex items-center py-1">
                        Welder
                    </li>
                </ul>
                <div className="grid grid-cols-5 gap-x-5 my-6 text-gray-900">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </>
    );
};

export default UserTradesmen;
