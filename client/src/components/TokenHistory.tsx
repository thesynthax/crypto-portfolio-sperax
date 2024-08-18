import { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';

type TokenHistoryProps = {
    startBlock: number;
    endBlock: number;
}

const TokenHistory = (props: TokenHistoryProps) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateRangeChange = (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);
    // Fetch transactions and balances based on the selected date range
    // You would use the fetchTransactions function here
  };

  return (
    <div>
      <h2>Token History</h2>
      <DateRangePicker onChange={handleDateRangeChange} />
      {startDate && endDate && (
        <div>
          <h3>Selected Date Range:</h3>
          <p>From: {startDate.toLocaleDateString()}</p>
          <p>To: {endDate.toLocaleDateString()}</p>
          {/* Display transactions and balance history here */}
        </div>
      )}
    </div>
  );
};

export default TokenHistory;

