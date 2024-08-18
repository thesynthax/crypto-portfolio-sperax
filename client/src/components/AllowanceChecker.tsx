import { useEffect, useState } from 'react';
import { ethers } from 'ethers';

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

  return (
    <div>
      <h2>Check Token Allowance</h2>
      <div>
        <input
          type="text"
          placeholder="Token Address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Spender Address"
          value={spenderAddress}
          onChange={(e) => setSpenderAddress(e.target.value)}
        />
      </div>
      <button onClick={checkAllowance}>Check Allowance</button>
      {allowance !== null && (
        <div>
          <p>Allowance: {allowance} Tokens</p>
        </div>
      )}
    </div>
  );
};
