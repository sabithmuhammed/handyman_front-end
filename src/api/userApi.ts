import userEndpoints from "../services/endpoints/userEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";

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