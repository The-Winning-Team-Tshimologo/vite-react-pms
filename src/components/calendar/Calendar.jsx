import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Calendar = ({getSelectedDate}) => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const maxDate = dayjs("2030-12-31");

  const theme = createTheme({
    palette: {
      primary: {
        // Directly using the color value of --color-primary
        main: "#5E8D83",
      },
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <DateCalendar
          value={selectedDate}
          onChange={(newValue) => {
            setSelectedDate(newValue);
            getSelectedDate(newValue);
          }}
          views={["year", "month", "day"]}
          showDaysOutsideCurrentMonth
          maxDate={maxDate}
          disablePast
          disableFuture={false}
          // shouldDisableDate={(date) => date.day() === 0 || date.day() === 6}
          readOnly={false}
        />
      </ThemeProvider>

      {/* <h3 className="w-fit ">
        <div className="text-center w-fit">
          {selectedDate && <p>Selected Date: {selectedDate.toString()}</p>}
        </div>
      </h3> */}
    </>
  );
};

export default Calendar;
