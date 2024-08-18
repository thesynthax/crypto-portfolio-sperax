import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CustomDatePicker } from './CustomDatePicker';

type DateRangePickerProps = {
  onChange: (startDate: Date | undefined, endDate: Date | undefined) => void;
}

// For the balance history between the startDate and endDate
export const DateRangePicker  = (props: DateRangePickerProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const handleDateChange = () => {
    props.onChange(startDate, endDate);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date || undefined);
          handleDateChange();
        }}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        customInput={<CustomDatePicker value={startDate?.toLocaleDateString() || ""} onClick={() => {}} />}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => {
          setEndDate(date || undefined);
          handleDateChange();
        }}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        customInput={<CustomDatePicker value={startDate?.toLocaleDateString() || ""} onClick={() => {}} />}
      />
    </div>
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
