import tradesmanEndpoints from "../services/endpoints/tradesmanEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";
import { ConfigurationType } from "../types/stateTypes";

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

export const getProfileFull = async () => {
    try {
        const response = await Api.get(tradesmanEndpoints.getProfileFull);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const updateConfiguration = async (data:ConfigurationType) => {
    try {
        const response = await Api.patch(tradesmanEndpoints.updateConfiguration,data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
