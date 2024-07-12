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

export const getTradesmen = async (filters: Object) => {
    try {
        console.log(filters);
        
        const response = await Api.get(userEndpoints.getTradesmen, {
            params: {
                ...filters,
                pageSize: PAGE_LIMIT,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getAllTradesmen = async (filters: Object,limit?:number) => {
    try {
        console.log(filters);
        
        const response = await Api.get(userEndpoints.getAllTradesmen, {
            params: {
                ...filters,
                pageSize:limit || PAGE_LIMIT,
            },
        });
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

export const getMyTools = async () => {
    try {
        const response = await Api.get(userEndpoints.getMyTools);
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

export const getUserDetails = async (userId: string) => {
    try {
        const response = await Api.get(
            userEndpoints.getUserInfo + `/${userId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const forgotVerifyMail = async (email: string) => {
    try {
        const response = await Api.post(userEndpoints.verifyMail, { email });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const forgotVerifyOtp = async (data: { email: string; otp: string }) => {
    try {
        const response = await Api.post(userEndpoints.forgotOtpVerify, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const forgotChangePassword = async (data: {
    email: string;
    otp: string;
    password: string;
}) => {
    try {
        const response = await Api.post(
            userEndpoints.forgotPasswordChange,
            data
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const updateUser = async (data: FormData) => {
    try {
        const response = await Api.patch(userEndpoints.userUpdate, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};


