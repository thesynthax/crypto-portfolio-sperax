import React from 'react';

interface CustomInputProps {
  value: string;
  onClick: () => void;
}

// Only to style the not-so-good-looking default react-datepicker
export const CustomDatePicker: React.FC<CustomInputProps> = React.forwardRef<HTMLButtonElement, CustomInputProps>(({ value, onClick }, ref) => (
  
  <div className="px-4 py-3">
    <label className="flex shadow-xl flex-col min-w-80 h-12 w-full">
      <div className="flex w-full bg-[#3C3F4A] flex-1 items-stretch rounded-lg h-full">
        <div className="text-[#D5D6DD] flex items-center justify-center pl-4 rounded-l-lg border-r-0">
          <button className="" onClick={onClick} ref={ref}>
            {value || "Select Date"}
          </button>
        </div>
      </div>
    </label>
  </div>
));

