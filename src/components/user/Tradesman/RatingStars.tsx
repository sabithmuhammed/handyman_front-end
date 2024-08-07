import React from "react";
import { TiStarFullOutline } from "react-icons/ti";

type PropType = {
    rating: number;
    size?: number;
};

export const RatingStars = ({ rating , size=16}: PropType) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, index) => (
                <TiStarFullOutline key={index}
                    size={size}
                    className={`${
                        rating >= index + 1
                            ? `text-yellow-400`
                            : `text-gray-400`
                    } mx-auto`}
                />
            ))}
        </div>
    );
};
