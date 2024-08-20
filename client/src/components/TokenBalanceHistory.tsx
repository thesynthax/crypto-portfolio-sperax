import { ethers, BigNumberish } from 'ethers';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { DateRangePicker } from './DateRangePicker';
import axios from 'axios';

//const etherscanApiKey = process.env.REACT_APP_ETHERSCAN_API_KEY;

type TokenHistoryProps = {
  tokenAddress: string;
  walletAddress: string;
}
type HistoricalDataPoint = {
  date: string;
  balance: string;
}
type EtherscanLog = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  from: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
}

const fetchHistoricalData = async(
  tokenAddress: string,
  walletAddress: string,
  startDate: string,
  endDate: string
): Promise<HistoricalDataPoint[]> => {
  const startTimestamp = new Date(startDate).getTime() / 1000;
  const endTimestamp = new Date(endDate).getTime() / 1000;

  /*const response = await axios.get(`https://api.etherscan.io/api`, {
    params: {
      module: 'account',
      action: 'tokentx',
      contractaddress: tokenAddress,
      address: walletAddress,
      startblock: 0,
      endblock: 99999999,
      sort: 'asc',
      apikey: etherscanApiKey,
    },
  });*/

  try {
    // Fetch token transfer events from Etherscan
    const response = await axios.get('/api/v1/balance', {
      params: {
        walletAddress,
        tokenAddress,
        startDate,
        endDate,
      },
    });
    const logs: EtherscanLog[] = response.data.result;

    // Filter events within the date range
    const filteredLogs = logs.filter((log) => {
      const logTimestamp = parseInt(log.timeStamp, 10);
      return logTimestamp >= startTimestamp && logTimestamp <= endTimestamp;
    });

    // Calculate balances at each day
    const balanceMap: { [date: string]: BigNumberish } = {};
    let currentBalance = BigInt(0);

    filteredLogs.forEach((log) => {
      const logDate = new Date(parseInt(log.timeStamp, 10) * 1000).toISOString().split('T')[0];
      const logValue = BigInt(log.value);

      if (log.to.toLowerCase() === walletAddress.toLowerCase()) {
        currentBalance += logValue;
      } else if (log.from.toLowerCase() === walletAddress.toLowerCase()) {
        currentBalance -= logValue;
      }

      balanceMap[logDate] = currentBalance;
    });

    // Format the result
    const historicalData: HistoricalDataPoint[] = Object.keys(balanceMap).map((date) => ({
      date,
      balance: ethers.formatUnits(balanceMap[date], 18), 
    }));

    return historicalData;

  } catch (error) {
    console.error('Error fetching historical data:', error);
    return [];
  }
}

export const TokenBalanceHistory = (props: TokenHistoryProps) => {
  const [historicalData, setHistoricalData] = useState<HistoricalDataPoint[]>([]);

  const handleDateChange = async (startDate: Date | undefined, endDate: Date | undefined) => {
    if (!startDate || !endDate) return;

    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];

    const data = await fetchHistoricalData(props.tokenAddress, props.walletAddress, formattedStartDate, formattedEndDate);
    setHistoricalData(data);
  };

  return (
    <div className='flex'>
      <DateRangePicker onChange={handleDateChange} />
      <ResponsiveContainer width="200%" height={300} className="mt-[10px] mr-5 w-[10vw]">
        <LineChart data={historicalData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
