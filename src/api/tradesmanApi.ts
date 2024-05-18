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
