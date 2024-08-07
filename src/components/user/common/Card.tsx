import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, profile, category,_id }) => {
    const bgColors = [
        "bg-blue-200",
        "bg-green-200",
        "bg-yellow-200",
        "bg-red-200",
        "bg-indigo-200",
        "bg-orange-200",
        "bg-lime-200",
    ];
    const textColors = [
        "text-blue-200",
        "text-green-200",
        "text-yellow-200",
        "text-red-200",
        "text-indigo-200",
        "text-orange-200",
        "text-lime-200",
    ];
    const color = Math.floor(Math.random() * bgColors.length);

    return (
        <div className="h-[400px] md:h-[350px] max-md:w-[300px] bg-blue-100 rounded-2xl flex flex-col items-center">
            <div className="w-[calc(100%-40px)] h-[230px] md:h-[180px] mt-[15px]">
                <img
                    src={profile}
                    alt=""
                    className=" rounded-t-lg object-cover object-top w-full h-full"
                />
            </div>
            <div
                className={`h-[140px] w-[calc(100%-20px)] ${bgColors[color]} rounded-xl flex flex-col items-center justify-between py-2`}
            >
                <h2 className="text-xl font-bold">{name}</h2>
                {typeof category == "number" ? (
                    <p className="text-xl font-bold">₹{category}/-</p>
                ) : (
                    category
                )}

                {typeof category == "number" ? (
                    <button
                        className={`rounded-full px-3 w-[170px] bg-gray-900 py-1 ${textColors[color]}`}
                    >
                        {" "}
                        View details
                    </button>
                ) : (
                    <Link to={`/tradesman-profile/${_id}`}
                        className={`rounded-full px-3 w-[170px] bg-gray-900 py-1 ${textColors[color]} text-center`}
                    >
                        Go to profile
                    </Link>
                )}

            </div>
        </div>
    );
};

export default Card;
