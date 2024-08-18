import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import secrets from "../statics/secrets.json";

const AVERAGE_BLOCK_TIME = 13.5;

const fetchTransactions = async (walletAddress: string, startDate: Date, endDate: Date) => {
  const etherscanApiKey = secrets.ETHERSCAN_API_KEY;
  if (!etherscanApiKey) throw new Error("Etherscan API key is missing");
  const startBlock = await getBlockNumberByDate(startDate);
  const endBlock = await getBlockNumberByDate(endDate);

  const endpoint = `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=${startBlock}&endblock=${endBlock}&sort=asc&apikey=${etherscanApiKey}`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    if (data.status === '1' && Array.isArray(data.result)) {
      return data.result; // Array of transactions
    } else {
      console.error("Failed to fetch transactions:", data.message);
      return []; // Return an empty array on failure
    }
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return [];
  }
};

export const getBlockNumberByDate = async (date: Date): Promise<number> => {
  const infuraApiKey = secrets.INFURIA_API_KEY;
  if (!infuraApiKey) throw new Error("Infura API key is missing");
  const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${infuraApiKey}`);

  // Get the latest block number and timestamp
  const latestBlock = await provider.getBlock('latest');
  const latestBlockNumber = latestBlock?.number;
  const latestBlockTimestamp = latestBlock?.timestamp;

  // Convert the target date to a timestamp (in seconds)
  const targetTimestamp = Math.floor(date.getTime() / 1000);

  // Calculate the difference in seconds between the target date and the latest block timestamp
  const timeDifference = latestBlockTimestamp! - targetTimestamp;

  // Estimate the number of blocks since the target date
  const estimatedBlocks = Math.floor(timeDifference / AVERAGE_BLOCK_TIME);

  // Estimate the block number for the target date
  const estimatedBlockNumber = latestBlockNumber! - estimatedBlocks;

  return estimatedBlockNumber;
};

type TransactionHistoryProps = {
  walletAddress: string;
  startDate?: Date;
  endDate?: Date;
}

export const TransactionHistory = (props : TransactionHistoryProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const txs = await fetchTransactions(props.walletAddress, props.startDate!, props.endDate!);
      if (Array.isArray(txs)) {
        setTransactions(txs);
      } else {
        console.error("Transactions data is not an array:", txs);
        setTransactions([]); // Handle unexpected data format
      }
    };

    fetchData();
  }, [props.walletAddress, props.startDate, props.endDate]);

  /*const fetchBlockNumber = async () => {
    const date = new Date('2023-08-01'); // Example date
    const blockNumber = await getBlockNumberByDate(date);
    console.log(`Estimated block number for ${date}: ${blockNumber}`);
  };

  fetchBlockNumber();*/
  
  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Transaction History</h1>
      <ul>
        {transactions.map(tx => (
          <li key={tx.hash}>
            {tx.hash} - {tx.value} ETH - {new Date(tx.timeStamp * 1000).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
