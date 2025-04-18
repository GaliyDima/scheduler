import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Box,
  Typography,
  Container,
  useTheme,
  useMediaQuery,
  Paper,
  Stack,
  Tooltip,
  IconButton,
  Divider,
  Card,
  Button,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { enUS } from "date-fns/locale";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EventIcon from "@mui/icons-material/Event";
import InfoIcon from "@mui/icons-material/Info";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import ScheduleIcon from "@mui/icons-material/Schedule";

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
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [tempStartTime, setTempStartTime] = useState<Date | null>(null);
  const [tempEndTime, setTempEndTime] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

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

  const handleMonthChange = (date: Date) => {
    setCurrentMonth(date);
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateSelected = (date: Date) => {
    if (!startDate && !endDate) return false;
    return (
      (startDate && date.getTime() === startDate.getTime()) ||
      (endDate && date.getTime() === endDate.getTime())
    );
  };

  const timePickerStyles = {
    "& .MuiClock-clock": {
      backgroundColor: "#f8f9fa",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
    "& .MuiClock-pin": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiClockPointer-root": {
      backgroundColor: theme.palette.primary.main,
    },
    "& .MuiClockPointer-thumb": {
      backgroundColor: theme.palette.primary.main,
      border: `4px solid ${theme.palette.primary.main}`,
    },
    "& .MuiClockNumber-root.Mui-selected": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
    },
    "& .MuiPickersToolbar-root": {
      backgroundColor: theme.palette.primary.main,
      color: "white",
      "& .MuiTypography-root": {
        color: "white",
      },
      "& .MuiPickersToolbar-penIconButton": {
        display: "none",
      },
    },
    "& .MuiDialogActions-root": {
      display: "none",
    },
  };

  const TimePickerCard = ({
    isStart,
    value,
    onChange,
    show,
    onClose,
  }: {
    isStart: boolean;
    value: Date | null;
    onChange: (date: Date | null) => void;
    show: boolean;
    onClose: () => void;
  }) => {
    const handleClick = () => {
      if (!show) {
        if (isStart) {
          setShowStartTimePicker(true);
          setShowEndTimePicker(false);
          setTempStartTime(value);
        } else {
          setShowEndTimePicker(true);
          setShowStartTimePicker(false);
          setTempEndTime(value);
        }
      }
    };

    const handleTimeChange = (newValue: Date | null) => {
      if (isStart) {
        setTempStartTime(newValue);
      } else {
        setTempEndTime(newValue);
      }
    };

    const handleConfirm = () => {
      if (isStart) {
        onChange(tempStartTime);
      } else {
        onChange(tempEndTime);
      }
      onClose();
    };

    return (
      <Box sx={{ position: "relative" }}>
        <Card
          sx={{
            cursor: "pointer",
            p: 2,
            backgroundColor: "white",
            borderRadius: "12px",
            boxShadow: show
              ? "0 8px 32px rgba(0, 0, 0, 0.15)"
              : "0 2px 8px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
            "&:hover": {
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
            },
          }}
          onClick={handleClick}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <WatchLaterIcon
              sx={{
                color: theme.palette.primary.main,
                fontSize: "1.5rem",
              }}
            />
            <Box>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                {isStart ? "Start time" : "End time"}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: value ? "text.primary" : "text.secondary",
                  fontWeight: 500,
                }}
              >
                {value
                  ? value.toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })
                  : "Select time"}
              </Typography>
            </Box>
          </Box>
        </Card>

        {show && (
          <Box
            sx={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: 0,
              zIndex: 1000,
              backgroundColor: "white",
              borderRadius: "12px",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <LocalizationProvider
              dateAdapter={AdapterDateFns}
              adapterLocale={enUS}
            >
              <Box>
                <StaticTimePicker
                  value={isStart ? tempStartTime : tempEndTime}
                  onChange={handleTimeChange}
                  sx={timePickerStyles}
                  ampm={false}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    p: 2,
                    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                >
                  <Button onClick={onClose} variant="text" color="inherit">
                    Cancel
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    variant="contained"
                    color="primary"
                  >
                    OK
                  </Button>
                </Box>
              </Box>
            </LocalizationProvider>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth={isMobile ? false : "md"} sx={{ px: isMobile ? 1 : 2 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          my: 4,
          borderRadius: 2,
          background: "linear-gradient(145deg, #ffffff, #f5f5f5)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Stack spacing={3}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <CalendarMonthIcon color="primary" sx={{ fontSize: 32 }} />
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Date and Time Selection
            </Typography>
            <Tooltip title="Select date range and time for your event">
              <IconButton size="small" sx={{ ml: "auto" }}>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.primary.main,
                fontWeight: 500,
              }}
            >
              <EventIcon fontSize="small" />
              Date Range
            </Typography>
            <Box
              sx={{
                "& .react-datepicker": {
                  width: "100%",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                  "& .react-datepicker__month-container": {
                    width: "100%",
                  },
                  "& .react-datepicker__header": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    borderTopLeftRadius: "8px",
                    borderTopRightRadius: "8px",
                  },
                  "& .react-datepicker__day-name": {
                    color: theme.palette.primary.contrastText,
                  },
                  "& .react-datepicker__day": {
                    borderRadius: "50%",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                    },
                  },
                  "& .react-datepicker__day--selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                  },
                  "& .react-datepicker__day--in-range": {
                    backgroundColor: theme.palette.primary.light,
                    color: theme.palette.primary.contrastText,
                  },
                  "& .react-datepicker__day--keyboard-selected": {
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
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
                monthsShown={1}
                minDate={new Date()}
                dateFormat="MM/dd/yyyy"
                showPopperArrow={false}
                onMonthChange={handleMonthChange}
                filterDate={(date) => {
                  if (!startDate && !endDate) return true;
                  if (startDate && !endDate) {
                    return date >= startDate;
                  }
                  return true;
                }}
              />
            </Box>
          </Box>

          <Divider sx={{ my: 1 }} />

          <Box>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: theme.palette.primary.main,
                fontWeight: 500,
                mb: 2,
              }}
            >
              <AccessTimeIcon fontSize="small" />
              Time Range
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <TimePickerCard
                  isStart={true}
                  value={startTime}
                  onChange={(newValue) => handleTimeChange(newValue, true)}
                  show={showStartTimePicker}
                  onClose={() => setShowStartTimePicker(false)}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TimePickerCard
                  isStart={false}
                  value={endTime}
                  onChange={(newValue) => handleTimeChange(newValue, false)}
                  show={showEndTimePicker}
                  onClose={() => setShowEndTimePicker(false)}
                />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Calendar;
