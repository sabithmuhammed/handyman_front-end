import commonEndpoints from "../services/endpoints/commonEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";

export const login = async (
    user: Object,
) => {
    try {
        const response = await Api.post(commonEndpoints.login, user);
        return response;
        
    } catch (error) {
        console.log(error);
        errorHandler(error);
    }
};

export const logout = async () => {
    try {
        const response = await Api.get(commonEndpoints.logout);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};