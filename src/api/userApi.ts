import userEndpoints from "../services/endpoints/userEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";
import { PAGE_LIMIT } from "../constants/pagesConstants";

export const signup = async (user: object) => {
    try {
        const response = await Api.post(userEndpoints.signup, user);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const verifyOtp = async (user: object) => {
    try {
        const response = await Api.post(userEndpoints.verifyOtp, user);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const signupGoogle = async (user: Object) => {
    try {
        const response = await Api.post(userEndpoints.googleSignUp, user);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const resentOtp = async (user: Object) => {
    try {
        const response = await Api.post(userEndpoints.resentOtp, user);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getTradesmen = async ({ page }) => {
    try {
        const response = await Api.get(
            userEndpoints.getTradesmen +
                `?pageSize=${PAGE_LIMIT}&page=${page || 1}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addTool = async (tool: object) => {
    try {
        const response = await Api.post(userEndpoints.addTool, tool);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getTools = async () => {
    try {
        const response = await Api.get(userEndpoints.getTools);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getSkills = async () => {
    try {
        const response = await Api.get(userEndpoints.getSkills);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};