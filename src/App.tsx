import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Calendar from "./components/Calendar";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

function App() {
  const handleDateRangeChange = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    console.log("Date Range:", { startDate, endDate });
  };

  const handleTimeRangeChange = (
    startTime: Date | null,
    endTime: Date | null
  ) => {
    console.log("Time Range:", { startTime, endTime });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="App">
        <Calendar
          onDateRangeChange={handleDateRangeChange}
          onTimeRangeChange={handleTimeRangeChange}
        />
      </div>
    </ThemeProvider>
  );
}

export default App;
