import React, { useState } from "react";
import {
    format,
    startOfWeek,
    addDays,
    startOfMonth,
    endOfMonth,
    endOfWeek,
    isSameMonth,
    isSameDay,
    subMonths,
    addMonths,
    isBefore,
    isAfter,
    parseISO,
} from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Grid } from "@chakra-ui/react";

const Calendar = ({ specialDates }) => {
    const [activeDate, setActiveDate] = useState(new Date());

    const maxDate = addMonths(new Date(), 2);
    const minDate = new Date();

    const getHeader = () => {
        return (
            <div className="flex items-center p-3">
                <div
                    className="rounded-md px-4 py-2 cursor-pointer me-2 border-2 border-gray-600 max-lg:text-sm hover:bg-gray-400"
                    onClick={() => {
                        setActiveDate(new Date());
                    }}
                >
                    Today
                </div>
                <AiOutlineLeft
                    size={20}
                    className={`cursor-pointer ${
                        isBefore(activeDate, startOfMonth(minDate)) ? "pointer-events-none opacity-50" : ""
                    }`}
                    onClick={() => {
                        if (activeDate > startOfMonth(minDate)) {
                            setActiveDate(subMonths(activeDate, 1));
                        }
                    }}
                />
                <AiOutlineRight
                    size={20}
                    className={`cursor-pointer ${
                        isAfter(activeDate, startOfMonth(maxDate)) ? "pointer-events-none opacity-50" : ""
                    }`}
                    onClick={() => {
                        if (activeDate < startOfMonth(maxDate)) {
                            setActiveDate(addMonths(activeDate, 1));
                        }
                    }}
                />
                <h2 className="lg:text-2xl ms-6">
                    {format(activeDate, "MMMM yyyy")}
                </h2>
            </div>
        );
    };

    const getWeekDaysNames = () => {
        const weekStartDate = startOfWeek(activeDate);
        const weekDays: JSX.Element[] = [];
        for (let day = 0; day < 7; day++) {
            weekDays.push(
                <div key={day} className="m-3 cursor-pointer flex justify-center items-center rounded-full text-indigo-950">
                    {format(addDays(weekStartDate, day), "E")}
                </div>
            );
        }
        return <Grid templateColumns="repeat(7, 1fr)">{weekDays}</Grid>;
    };

    const isSpecialDate = (date) => {
        return specialDates.some(specialDate => isSameDay(parseISO(specialDate), date));
    };

    const generateDatesForCurrentWeek = (date, activeDate) => {
        let currentDate = date;
        const week: JSX.Element[] = [];
        for (let day = 0; day < 7; day++) {
            const cloneDate = currentDate;
            const isDisabled =
                isBefore(cloneDate, minDate) || isAfter(cloneDate, maxDate);
            const specialDate = isSpecialDate(cloneDate);
            week.push(
                <div
                    key={cloneDate}
                    className={`m-3 cursor-pointer flex justify-center items-center rounded-full ${
                        isSameMonth(currentDate, activeDate)
                            ? ""
                            : "text-gray-400"
                    } 
                     ${specialDate ? "rounded-full text-white bg-gray-500" : ""} ${
                        isDisabled ? "pointer-events-none opacity-50" : ""
                    }`}
                >
                    {format(currentDate, "d")}
                </div>
            );
            currentDate = addDays(currentDate, 1);
        }
        return <React.Fragment key={date}>{week}</React.Fragment>;
    };

    const getDates = () => {
        const startOfTheSelectedMonth = startOfMonth(activeDate);
        const endOfTheSelectedMonth = endOfMonth(activeDate);
        const startDate = startOfWeek(startOfTheSelectedMonth);
        const endDate = endOfWeek(endOfTheSelectedMonth);

        let currentDate = startDate;
        const allWeeks: JSX.Element[] = [];

        while (currentDate <= endDate) {
            allWeeks.push(generateDatesForCurrentWeek(currentDate, activeDate));
            currentDate = addDays(currentDate, 7);
        }

        return <Grid templateColumns="repeat(7, 1fr)">{allWeeks}</Grid>;
    };

    return (
        <section>
            {getHeader()}
            {getWeekDaysNames()}
            {getDates()}
        </section>
    );
};

export default Calendar;
