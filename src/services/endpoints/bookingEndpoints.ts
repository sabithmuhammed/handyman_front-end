const bookingEndpoints = {
    newBooking: "/booking/new-booking",
    pendingBookings: "/booking/pending-bookings",
    scheduleBooking: "/booking/schedule-booking",
    getScheduledDates: "/booking/get-scheduled-dates",
    cancelBooking: "/booking/cancel-booking",
    getScheduledBooking: "/booking/get-scheduled-booking",
    jobCompleted: "/booking/job-complete",
    getCompleted: "/booking/get-completed",
    getUserBooking: "/booking/get-user-bookings",
    createInvoice: "/booking/create-invoice",
    changeToPaid: "/booking//invoice-to-paid",
    getUnavailable: "/booking/get-unavailable-slots",
    paymentSuccess: "/booking/payment-successful",
};

export default bookingEndpoints;
