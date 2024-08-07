import React, { useCallback, useEffect } from "react";
import { ReviewCard } from "./ReviewCard";
import { ReviewType } from "../../../types/stateTypes";
import {
    InfiniteScrollCallback,
    useInfiniteScroll,
} from "../../../hooks/useInifiniteScroll";
import { useParams } from "react-router-dom";
import { getTradesmanReviews } from "../../../api/reviewApi";
import { Infinityloading } from "../../common/Infinityloading";
import { ReviewStatsTile } from "./ReviewStatsTile";

export const ReviewContainer = () => {
    const { tradesmanId } = useParams();

    const fetchMoreData = useCallback(
        async (page: number) => {
            const res = await getTradesmanReviews(tradesmanId as string, page);
            const result: InfiniteScrollCallback<ReviewType> = {
                data: [],
                hasMore: false,
            };
            if (res?.data) {
                result.data = res.data.data;
                result.hasMore = res.data.hasMore;
            }
            return result;
        },
        [tradesmanId]
    );

    const {
        data: reviews,
        setData: setReviews,
        isLoading,
        containerRef,
    } = useInfiniteScroll<ReviewType>(fetchMoreData);


    return (
        <div className="md:px-4">
            <ReviewStatsTile />
            <div ref={containerRef}>
                {reviews.length !== 0 ? (
                    <>
                        {reviews.map((review) => (
                            <ReviewCard key={review._id} {...review} />
                        ))}
                        {isLoading && <Infinityloading />}
                    </>
                ) : (
                    " No reviews yet"
                )}
            </div>
        </div>
    );
};
