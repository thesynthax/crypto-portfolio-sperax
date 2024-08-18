import { useState } from 'react';
import { DateRangePicker } from './DateRangePicker';
import TokenHistory from './TokenHistory';
import { TransactionHistory, getBlockNumberByDate } from './TransactionHistory';

type HistoryDashboardProps = {
  walletAddress: string;
}

export const HistoryDashboard = (props: HistoryDashboardProps) => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startBlock, setStartBlock] = useState<number | null>(null);
  const [endBlock, setEndBlock] = useState<number | null>(null);

  const handleDateRangeChange = async (start: Date, end: Date) => {
    setStartDate(start);
    setEndDate(end);

    if (start && end) {
      const startBlockNumber = await getBlockNumberByDate(start);
      const endBlockNumber = await getBlockNumberByDate(end);

      setStartBlock(startBlockNumber);
      setEndBlock(endBlockNumber);
    }
  };

  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Transaction and Token History</h1>
      <DateRangePicker onChange={handleDateRangeChange} />
      {startBlock !== null && endBlock !== null && (
        <>
          <TokenHistory startBlock={startBlock} endBlock={endBlock} />
          <TransactionHistory walletAddress={props.walletAddress} startDate={startDate} endDate={endDate} />
        </>
      )}
    </div>
  );
};

