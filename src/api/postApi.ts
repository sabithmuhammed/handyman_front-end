import postEndpoints from "../services/endpoints/postEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";

export const getPosts = async () => {
    try {
        const response = await Api.get(postEndpoints.getPosts + `?postId=`);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addNewPost = async (data: FormData) => {
    try {
        const response = await Api.post(postEndpoints.addPost, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getPostsById = async (tradesmanId: string) => {
    try {
        const response = await Api.get(
            postEndpoints.getPostsById + `/${tradesmanId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const likePost = async (postId: string) => {
    try {
        const response = await Api.patch(postEndpoints.addLike + `/${postId}`);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const unlikePost = async (postId: string) => {
    try {
        const response = await Api.patch(
            postEndpoints.removeLike + `/${postId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getComments = async (postId: string) => {
    try {
        const response = await Api.get(
            postEndpoints.getComments + `/${postId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addComment = async (postId: string, comment: string) => {
    try {
        const response = await Api.post(postEndpoints.addComment, {
            postId,
            comment,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const deleteComment = async (postId: string, comment: string) => {
    try {
        const response = await Api.post(postEndpoints.addComment, {
            postId,
            comment,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const addReply = async (commentId: string, comment: string) => {
    try {
        const response = await Api.post(postEndpoints.addReply, {
            commentId,
            comment,
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const commentCount = async (postId: string) => {
    try {
        const response = await Api.get(postEndpoints.getCount + `/${postId}`);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const deletePost = async (postId: string) => {
    try {
        const response = await Api.delete(
            postEndpoints.deletePost + `/${postId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const editPost = async (postId: string, text: string) => {
    try {
        const response = await Api.patch(
            postEndpoints.editPost + `/${postId}`,
            { text }
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getAllPosts = async () => {
    try {
        const response = await Api.get(postEndpoints.getAllPosts);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
