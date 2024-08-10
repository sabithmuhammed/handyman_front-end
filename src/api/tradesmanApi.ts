import tradesmanEndpoints from "../services/endpoints/tradesmanEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";
import {
    ConfigurationType,
    ServiceType,
    WorkingDayType,
} from "../types/stateTypes";

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

export const updateWorkingTime = async (data: {
    workingDays: WorkingDayType[];
    slotSize: number;
    bufferTime: number;
}) => {
    try {
        const response = await Api.patch(
            tradesmanEndpoints.updateWorkingTime,
            data
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const updateConfiguration = async (data: ConfigurationType) => {
    try {
        const response = await Api.patch(
            tradesmanEndpoints.updateConfiguration,
            data
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addService = async (service: {
    description: string;
    amount: number;
    slots: number;
}) => {
    try {
        const response = await Api.patch(tradesmanEndpoints.addService, {
            service,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const deleteService = async (serviceId: string) => {
    try {
        const response = await Api.delete(
            tradesmanEndpoints.deleteService + `/${serviceId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const updateService = async (
    serviceId: string,
    service: { description: string; amount: number; slots: number }
) => {
    try {
        const response = await Api.patch(
            tradesmanEndpoints.updateService + `/${serviceId}`,
            { service }
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addLeave = async (leaves: string | Date[], reason: string) => {
    try {
        const response = await Api.patch(tradesmanEndpoints.addLeave, {
            leaves,
            reason,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const removeLeave = async (date: string | Date) => {
    try {
        const response = await Api.delete(tradesmanEndpoints.removeLeave+`/${date}`);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
