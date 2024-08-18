import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { Button } from './Button';
import { Textbox } from './Textbox';
import { TextboxLabel } from './TextboxLabel';

const transferToken = async (
  tokenAddress: string,
  recipientAddress: string,
  amount: string,
  signer: ethers.Signer
): Promise<void> => {
  const abi = [
    'function transfer(address recipient, uint256 amount) public returns (bool)',
  ];
  const tokenContract = new ethers.Contract(tokenAddress, abi, signer);
  const formattedAmount = ethers.parseUnits(amount, 18); 

  try {
    const tx = await tokenContract.transfer(recipientAddress, formattedAmount);
    await tx.wait(); 
    console.log('Transaction successful:', tx);
  } catch (error) {
    console.error('Error transferring tokens:', error);
    throw error;
  }
}

// Fetching from the provider to transfer tokens to a recipient
export const TransferTokens = () => {
  const [tokenAddress, setTokenAddress] = useState<string>('');
  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [provider, setProvider] = useState<ethers.Provider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      const ethereumProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethereumProvider);
      const signer = await ethereumProvider.getSigner();
      setSigner(signer);
    };

    initProvider();
  }, []);

  const handleTransfer = async () => {
    if (!provider || !signer) {
      alert('Ethereum provider or signer is not available');
      return;
    }

    try {
      await transferToken(tokenAddress, recipientAddress, amount, signer);
      alert('Transfer successful!');
    } catch (error) {
      alert('Transfer failed');
    }
  };
  const handleTokenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenAddress(e.target.value)
  }
  const handleRecipientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value)
  }
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value)
  }

  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Token Transfer</h1>

        <TextboxLabel label={"Token Address"} />
        <Textbox handleChange={handleTokenChange} placeholder={"Enter the token's address"} canEdit={true}/> 
        <TextboxLabel label={"Recipient's Wallet"} />
        <Textbox handleChange={handleRecipientChange} placeholder={"Enter the recipient's wallet address"} canEdit={true}/> 
        <TextboxLabel label={"Amount"} />
        <Textbox handleChange={handleAmountChange} placeholder={"Enter the amount to be transferred"} canEdit={true}/> 
        <Button onClick={handleTransfer} label={"Transfer"} />
    </div>
  );
};
