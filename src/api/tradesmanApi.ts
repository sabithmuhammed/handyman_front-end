import tradesmanEndpoints from "../services/endpoints/tradesmanEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";

export const tradesmanRegister = async (user: object) => {
    try {
        const response = await Api.post(tradesmanEndpoints.register, user);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
export const tradesmanStatusCheck = async () => {
    try {
        const response = await Api.get(tradesmanEndpoints.checkStatus);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getPosts = async () => {
    try {
        const response = await Api.get(
            tradesmanEndpoints.getPosts + `?tradesmanId=`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addNewPost = async (data: FormData) => {
    try {
        const response = await Api.post(tradesmanEndpoints.addPost, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getProfileMinimum = async (id: string) => {
    try {
        const response = await Api.get(
            tradesmanEndpoints.getProfile + `/${id}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getPostsById = async (tradesmanId: string) => {
    try {
        const response = await Api.get(
            tradesmanEndpoints.getPostsById + `/${tradesmanId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
