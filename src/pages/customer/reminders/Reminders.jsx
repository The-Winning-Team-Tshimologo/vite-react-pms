import Header from "@/components/header/Header";
import React from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import { eventStyleGetter } from "../../serviceProvider/appointments/Appointments";
import dayjs from "dayjs";

const Reminders = () => {
  const localizer = dayjsLocalizer(dayjs);

  const today = dayjs();
  const tomorrow = dayjs().add(1, "day");
  const nextWeekTuesday = dayjs().add(1, "week").day(2);

  const createEvent = (date, hour, title) => ({
    title,
    start: new Date(new Date(date).setHours(hour, 0, 0)),
    end: new Date(new Date(date).setHours(hour + 1, 0, 0)),
  });

  const myEventsList = [];

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div style={{ width: "90%" }}>
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 800 }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>
    </div>
  );
};

export default Reminders;
