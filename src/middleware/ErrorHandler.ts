import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { ErrorResponse } from "react-router-dom";

const errorHandler = (err: AxiosError<ErrorResponse>) => {
    console.log(err);
    if (err.status !== 401) {
        const errorMessage =
            err.response?.data || "Something went wrong! Please try again";
        toast.error(errorMessage as string);
    }
};

export default errorHandler;
