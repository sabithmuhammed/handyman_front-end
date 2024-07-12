import chatEndpoints from "../services/endpoints/chatEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";
import { PAGE_LIMIT } from "../constants/pagesConstants";

export const addConversation = async (data: object) => {
    try {
        const response = await Api.post(chatEndpoints.addConversation, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getConversations = async (senderId:string) => {
    try {
        const response = await Api.get(chatEndpoints.getConversations+`/${senderId}`);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getMessages = async (conversationId:string) => {
    try {
        const response = await Api.get(chatEndpoints.getMessages+`/${conversationId}`);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const sendMessage = async (data:object) => {
    try {
        const response = await Api.post(chatEndpoints.saveMessage,data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
