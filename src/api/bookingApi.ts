import bookingEndpoints from "../services/endpoints/bookingEndpoints";
import Api from "../services/api";
import errorHandler from "../middleware/ErrorHandler";
import { PAGE_LIMIT } from "../constants/pagesConstants";

export const addNewBooking = async (data: Object) => {
    try {
        const response = await Api.post(bookingEndpoints.newBooking, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const pendingBookings = async () => {
    try {
        const response = await Api.get(bookingEndpoints.pendingBookings);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const scheduleBooking = async (
    bookingId: string,
    scheduledDate: Date[]
) => {
    try {
        const response = await Api.patch(
            bookingEndpoints.scheduleBooking + `/${bookingId}`,
            { scheduledDate }
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getScheduledDates = async (tradesmanId: string) => {
    try {
        const response = await Api.get(
            bookingEndpoints.getScheduledDates + `/${tradesmanId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const cancelBooking = async (bookingId: string) => {
    try {
        const response = await Api.patch(
            bookingEndpoints.cancelBooking + `/${bookingId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getSchedules = async (date: string, page: number) => {
    try {
        const response = await Api.get(bookingEndpoints.getScheduledBooking, {
            params: {
                date,
                page,
                pageSize: 4,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const jobCompleted = async (bookingId: string) => {
    try {
        const response = await Api.patch(
            bookingEndpoints.jobCompleted + `/${bookingId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getCompleted = async (date: string,page:number) => {
    try {
        const response = await Api.get(bookingEndpoints.getCompleted, {
            params: {
                date,
                page,
                pageSize:4
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getUserBooking = async (page: number) => {
    try {
        const response = await Api.get(bookingEndpoints.getUserBooking, {
            params: {
                page,
                limit: 4,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const createInvoice = async (data: object) => {
    try {
        const response = await Api.post(bookingEndpoints.createInvoice, data);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const changeToPaid = async (id: string) => {
    try {
        const response = await Api.patch(
            bookingEndpoints.changeToPaid + `/${id}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getUnavailable = async (tradesmanId: string, date: string) => {
    try {
        const response = await Api.get(bookingEndpoints.getUnavailable, {
            params: {
                tradesmanId,
                date,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const paymentSuccess = async (bookingId: string) => {
    try {
        console.log();

        const response = await Api.patch(
            bookingEndpoints.paymentSuccess + `/${bookingId}`
        );
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getBookingsCount = async () => {
    try {
        const response = await Api.get(bookingEndpoints.bookingsCount);
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getServiceCount = async (filter: string) => {
    try {
        const response = await Api.get(bookingEndpoints.serviceCount, {
            params: {
                filter,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const getAmountAggregation = async (filter: string) => {
    try {
        const response = await Api.get(bookingEndpoints.amountAggregation, {
            params: {
                filter,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};

export const bookingDatesCheck = async (leaves: string[] | Date[]) => {
    try {
        const response = await Api.get(bookingEndpoints.bookingDatesCheck, {
            params: {
                leaves,
            },
        });
        return response;
    } catch (error) {
        errorHandler(error);
    }
};
