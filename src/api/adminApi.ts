import adminEndpoints from "../services/endpoints/adminEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";


export const adminGetPendingVerification = async () => {
    try {
        const response = await Api.get(adminEndpoints.getPendingVerification);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
