import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { enUS } from "date-fns/locale";

interface CalendarProps {
  onDateRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
  onTimeRangeChange?: (startTime: Date | null, endTime: Date | null) => void;
}

const Calendar: React.FC<CalendarProps> = ({
  onDateRangeChange,
  onTimeRangeChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (onDateRangeChange) {
      onDateRangeChange(start, end);
    }
  };

  const handleTimeChange = (time: Date | null, isStart: boolean) => {
    if (isStart) {
      setStartTime(time);
      if (onTimeRangeChange) {
        onTimeRangeChange(time, endTime);
      }
    } else {
      setEndTime(time);
      if (onTimeRangeChange) {
        onTimeRangeChange(startTime, time);
      }
    }
  };

  return (
    <Container maxWidth={isMobile ? false : "sm"} sx={{ px: isMobile ? 1 : 2 }}>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Date and Time Selection
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Select date range:
          </Typography>
          <Box
            sx={{
              "& .react-datepicker": {
                width: isMobile ? "100%" : "auto",
                "& .react-datepicker__month-container": {
                  width: isMobile ? "100%" : "auto",
                },
              },
            }}
          >
            <DatePicker
              selected={startDate}
              onChange={handleDateChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
              locale={enUS}
              monthsShown={isMobile ? 1 : 2}
            />
          </Box>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enUS}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              mb: 3,
              flexDirection: isMobile ? "column" : "row",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                Start:
              </Typography>
              <TimePicker
                value={startTime}
                onChange={(newValue: Date | null) =>
                  handleTimeChange(newValue, true)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
            <Box sx={{ flex: 1 }}>
              <Typography variant="subtitle1" gutterBottom>
                End:
              </Typography>
              <TimePicker
                value={endTime}
                onChange={(newValue: Date | null) =>
                  handleTimeChange(newValue, false)
                }
                slotProps={{ textField: { fullWidth: true } }}
              />
            </Box>
          </Box>
        </LocalizationProvider>
      </Box>
    </Container>
  );
};

export default Calendar;
