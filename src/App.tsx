import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Calendar from "./components/Calendar";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2196f3",
      light: "#64b5f6",
      dark: "#1976d2",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
      letterSpacing: "0.5px",
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: "0.15px",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#2196f3",
          },
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
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
