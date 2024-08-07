import errorHandler from "../middleware/ErrorHandler";
import Api from "../services/api";
import reviewEndpoints from "../services/endpoints/reviewEndpoint";

export const getReviewForBooking = async (bookingId: string) => {
    try {
        const response = await Api.get(
            reviewEndpoints.getReviewForBooking + `/${bookingId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const postReview = async (data: {
    bookingId: string;
    tradesmanId: string;
    rating: number;
    review: string;
}) => {
    try {
        const response = await Api.post(reviewEndpoints.postReview, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const editReview = async (
    reviewId: string,
    data: {
        rating: number;
        review: string;
    }
) => {
    try {
        const response = await Api.patch(
            reviewEndpoints.editReview + `/${reviewId}`,
            data
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getTradesmanReviews = async (
    tradesmanId: string,
    page: number
) => {
    try {
        const response = await Api.get(reviewEndpoints.getReviewForTradesman, {
            params: {
                tradesmanId,
                page,
                limit: 4,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getReviewStats = async (tradesmanId: string) => {
    try {
        const response = await Api.get(
            reviewEndpoints.getDetails + `/${tradesmanId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
