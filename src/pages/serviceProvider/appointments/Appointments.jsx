import React, { useEffect, useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import Header from "@/components/header/Header";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Appointments.css";
import { useNavigate } from "react-router";

const localizer = dayjsLocalizer(dayjs);

const today = dayjs();
const tomorrow = dayjs().add(1, "day");
const nextWeekTuesday = dayjs().add(1, "week").day(2);

const createEvent = (date, hour, title) => ({
  title,
  start: new Date(new Date(date).setHours(hour, 0, 0)),
  end: new Date(new Date(date).setHours(hour + 1, 0, 0)),
});

const myEventsList = [
  {
    title: "Fitting | Elof Street | Jhb | 2130",
    allDay: false,
    start: new Date(2024, 3, 0, 10, 0),
    end: new Date(2024, 3, 0, 11, 30),
  },
  {
    title: "Geyser Repair | Tulisa Park | Heide Ave  | 2001",
    start: new Date(2024, 2, 7),
    end: new Date(2024, 2, 10),
  },

  // Today's events
  createEvent(today, 10, "Fitting | Tulisa Park | Heide Ave  | 2001"),
  createEvent(today, 11, "Toilet Repair | Braamfontein | 41 Juta | 2001"),
  createEvent(today, 12, "Lunch"),
  createEvent(today, 13, "Plumbing Request | JHB CBD | 05 Fox Street  | 2001"),
  createEvent(
    today,
    14,
    "Electrical Wiring Inspection | JHB Newtown | Building 9"
  ),

  // Tomorrow's events
  createEvent(
    tomorrow,
    10,
    "Air Conditioning Setup | Braamfontein | 41 Juta | 2001"
  ),
  createEvent(
    tomorrow,
    11,
    "Piping Installation |  Naturena | Main Street | Site B"
  ),
  createEvent(tomorrow, 12, "Lunch"),

  // Next week Tuesday's events
  createEvent(
    nextWeekTuesday,
    10,
    "Air Conditioning Repair | Hillbrow | 51 Highpoint | 2154"
  ),
  createEvent(
    nextWeekTuesday,
    11,
    "Geyser Repair | Tulisa Park | Heide Ave  | 2001"
  ),
  createEvent(nextWeekTuesday, 12, "Lunch"),
  createEvent(
    nextWeekTuesday,
    13,
    "Electrical Wiring Installation | JHB Newtown | Building 2"
  ),
];

export const eventStyleGetter = (event, start, end, isSelected) => {
  const style = {
    backgroundColor: "var(--color-tertiary-opaque)",
    borderRadius: "0px",
    opacity: 0.8,
    color: "black",
    border: 0,
    display: "block",
  };

  return {
    style: style,
  };
};

const Appointments = () => {
  const [ServiceRequest, setServiceRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found");
        }

        const response = await fetch(
          "http://localhost:8081/api/v1/service/serviceRequests",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized access");
          } else {
            throw new Error("Failed to fetch data");
          }
        }

        const data = await response.json();
        createCalendarEvents(data);
      } catch (error) {
        console.error("Error fetching service requests:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, []);

  const handleSelectEvent = (event) => {
    navigate(`/customer-profile/${event.id}/${event.customerId}/${event.customerUsername}/${event.requestStatus}`);
  };

  const createCalendarEvents = (ServiceRequestData) => {
    const calendarEvents = ServiceRequestData.map((event) => ({
      id: event.serviceId,
      title:
        event.category.name +
        " | " +
        event.address.city +
        ", " +
        event.address.streetName +
        ",  " +
        event.address.zipCode,
      start: new Date(new Date(event.appointmentDate).setHours(0, 0, 0)),
      end: new Date(new Date(event.appointmentDate).setHours(1, 0, 0)),
      customerId:event.customer.userId,
      customerUsername:event.customer.username,
      requestStatus:event.status,
    }));
    setServiceRequest(calendarEvents);
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center min-h-screen">
        <div style={{ width: "90%" }}>
            <Calendar
              localizer={localizer}
              events={ServiceRequest}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 800 }}
              eventPropGetter={eventStyleGetter}
              onSelectEvent={handleSelectEvent}
            />
          
        </div>
      </div>
    </div>
  );
};

export default Appointments;
