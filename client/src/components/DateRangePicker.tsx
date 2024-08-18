import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

type DateRangePickerProps = {
  onChange: (startDate: Date, endDate: Date) => void;
}

export const DateRangePicker  = (props: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start || undefined);
    setEndDate(end || undefined);
    if (start && end) {
      props.onChange(start, end);
    }
  };

  return (
    <DatePicker
      selected={startDate}
      onChange={handleChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
      isClearable
    />
  );
};
/*
import React, { useState } from 'react';
import { DateRangePicker as ReactDateRangePicker, RangeKeyDict } from 'react-date-range';
import { addDays } from 'date-fns';

interface DateRangePickerProps {
  onDateRangeChange: (start: Date, end: Date) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateRangeChange }) => {
  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    setState([ranges.selection]);
    onDateRangeChange(ranges.selection.startDate, ranges.selection.endDate);
  };

  return (
    <ReactDateRangePicker
      ranges={state}
      onChange={handleSelect}
    />
  );
};

export default DateRangePicker;*/
