import adminEndpoints from "../services/endpoints/adminEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";
import { PAGE_LIMIT } from "../constants/pagesConstants";

export const adminGetPendingVerification = async (page: number) => {
    try {
        const response = await Api.get(adminEndpoints.getPendingVerification, {
            params: {
                pageSize: PAGE_LIMIT,
                page: page || 1,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const verify = async (tradesmanId: string) => {
    try {
        const response = await Api.patch(adminEndpoints.verifyTradesman, {
            tradesmanId,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const reject = async (tradesmanId: string) => {
    try {
        const response = await Api.patch(adminEndpoints.verifyTradesman, {
            tradesmanId,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getTradesmen = async ({ category, page }) => {
    try {
        const response = await Api.get(adminEndpoints.getTradesmen, {
            params: {
                pageSize: PAGE_LIMIT,
                page: page || 1,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const blockTradesmen = async (tradesmanId: string) => {
    try {
        const response = await Api.patch(adminEndpoints.blockTradesman, {
            tradesmanId,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const unblockTradesmen = async (tradesmanId: string) => {
    try {
        const response = await Api.patch(adminEndpoints.unblockTradesman, {
            tradesmanId,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getUsers = async ({ page }) => {
    try {
        const response = await Api.get(adminEndpoints.getUsers, {
            params: {
                pageSize: PAGE_LIMIT,
                page: page || 1,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const blockUser = async (userId: string) => {
    try {
        const response = await Api.patch(adminEndpoints.blockUser, { userId });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const unblockUser = async (userId: string) => {
    try {
        const response = await Api.patch(adminEndpoints.unblockUser, {
            userId,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
