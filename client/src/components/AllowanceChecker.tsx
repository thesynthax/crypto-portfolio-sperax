import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { TextboxLabel } from './TextboxLabel';
import { Textbox } from './Textbox';
import { Button } from './Button';

type AllowanceCheckerProps = {
  walletAddress: string;
}

const getAllowance = async (
  tokenAddress: string,
  ownerAddress: string,
  spenderAddress: string,
  provider: ethers.Provider
): Promise<string> => {
  const abi = [
    'function allowance(address owner, address spender) view returns (uint256)',
  ];
  const tokenContract = new ethers.Contract(tokenAddress, abi, provider);
  const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
  return ethers.formatUnits(allowance, 18); 
}

export const AllowanceChecker = (props: AllowanceCheckerProps) => {
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [spenderAddress, setSpenderAddress] = useState<string>('');
  const [allowance, setAllowance] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.Provider | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      const ethereumProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethereumProvider);
    };

    initProvider();
  }, []);

  const checkAllowance = async () => {
    if (!provider) {
      alert('Ethereum provider is not available');
      return;
    }

    try {
      const allowance = await getAllowance(tokenAddress, props.walletAddress, spenderAddress, provider);
      setAllowance(allowance);
    } catch (error) {
      console.error('Error fetching allowance:', error);
    }
  };

  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value)
  }
  const handleSpenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpenderAddress(e.target.value)
  }
  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Check token allowance</h1>

        <TextboxLabel label={"Token Address"} />
        <Textbox handleChange={handleTokenChange} placeholder={"Enter the token's address"} canEdit={true}/> 
        <TextboxLabel label={"Spender's Wallet"} />
        <Textbox handleChange={handleSpenderChange} placeholder={"Enter the spender's wallet address"} canEdit={true}/> 
        <Button onClick={checkAllowance} label={"Check Allowance"} />


      {allowance !== null && (
        <div className="m-4">
          <p>The current allowance is: {allowance} Tokens</p>
        </div>
      )}
    </div>
  );
};
