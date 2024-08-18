import { useState } from 'react';
import { Textbox } from './Textbox';
import { TextboxLabel } from './TextboxLabel';
import { TokenBalanceHistory } from './TokenBalanceHistory';

type BalanceHistoryDashboardProps = {
  walletAddress: string;
}

// Enter the token address and check its balance graph
export const BalanceHistoryDashboard = (props : BalanceHistoryDashboardProps) => {
  const [tokenAddress, setTokenAddress] = useState("");
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value)
  }
  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Token Balance History</h1>
      <TextboxLabel label={"Token Address"} />
      <Textbox handleChange={handleTokenChange} placeholder={"Enter the token's address"} canEdit={true}/> 
      <TokenBalanceHistory tokenAddress={tokenAddress} walletAddress={props.walletAddress} />
    </div>
  )
}
