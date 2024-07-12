import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getScheduledDates } from "../../api/bookingApi";
import { isSameDay } from "date-fns";
import { Badge } from "@chakra-ui/react";

type PropType = {
    selectedDates: Date[];
    setSelectedDates: React.Dispatch<React.SetStateAction<Date[]>>;
    tradesmanId: string;
    reschedule?: boolean;
};

const DatePickerCalendar = ({
    selectedDates,
    setSelectedDates,
    tradesmanId,
    reschedule = false,
}: PropType) => {
    const [disabledDates, setDisabledDates] = useState<Date[]>([]);
    const [maxDate, setMaxDate] = useState(() => {
        const twoMonthsLater = new Date();
        twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
        return twoMonthsLater.toISOString().split("T")[0];
    });

    useEffect(() => {
        (async () => {
            const res = await getScheduledDates(tradesmanId);
            if (res?.data) {
                let disableDate = res.data.map(
                    (date: string) => new Date(date)
                );

                if (reschedule) {
                    disableDate = disableDate.filter((date1) => {
                        return !selectedDates.some((date2) =>
                            isSameDay(date1, date2)
                        );
                    });
                }
                setDisabledDates(disableDate);
            }
        })();
    }, []);

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Check if a date should be disabled
    const isDisabled = (date: Date) => {
        return disabledDates.some(
            (disabledDate) =>
                date.getFullYear() === disabledDate.getFullYear() &&
                date.getMonth() === disabledDate.getMonth() &&
                date.getDate() === disabledDate.getDate()
        );
    };

    // Handle date change
    const handleDateChange = (date) => {
        if (
            selectedDates.some((selectedDate) => {
                return selectedDate.getMonth() === date.getMonth() &&
                    selectedDate.getDate() === date.getDate()
                    ? true
                    : false;
            })
        ) {
            // If date is already selected, remove it
            setSelectedDates(
                selectedDates.filter((selectedDate) => {
                    return selectedDate.getMonth() !== date.getMonth() ||
                        selectedDate.getDate() !== date.getDate()
                        ? true
                        : false;
                })
            );
        } else {
            // Add new date to the selected dates
            setSelectedDates([...selectedDates, date]);
        }
    };

    return (
        <div className="w-full flex items-center flex-col">
            <DatePicker
                inline
                selected={null} // This prop needs to be present, but can be null
                onChange={handleDateChange}
                highlightDates={selectedDates}
                excludeDates={disabledDates}
                minDate={tomorrow}
                isClearable
                maxDate={new Date(maxDate)}
            />
                <h3>Selected Dates:</h3>
            <div>
                <ul className="flex">
                    {selectedDates.map((date, index) => (
                        <li key={index}>
                            <Badge colorScheme="green" me={2} variant={"outline"} px={3} rounded={"full"}>
                                {date.toLocaleString("en-AU", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                })}
                            </Badge>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DatePickerCalendar;
