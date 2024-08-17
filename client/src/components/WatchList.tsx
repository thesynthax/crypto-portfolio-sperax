import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Textbox } from './Textbox';
import { TextboxLabel } from './TextboxLabel';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import { WatchListToken } from './WatchListToken';

interface Balances {
  [key: string]: string; 
}

type WatchListProps = {
  account: string;
}

export const WatchList = (props: WatchListProps) => {
  const [watchList, setWatchList] = useState<string[]>(() => {
    const saved = localStorage.getItem('watchList');
    return saved ? JSON.parse(saved) : [];
  });
  const [tokenInput, setTokenInput] = useState<string>('');
  const [balances, setBalances] = useState<Balances>({});

  // Function to add a token to the watch list
  const addTokenToWatchList = () => {
    if (tokenInput && !watchList.includes(tokenInput)) {
      const updatedWatchList = [...watchList, tokenInput];
      setWatchList(updatedWatchList);
      setTokenInput('');
      localStorage.setItem('watchList', JSON.stringify(updatedWatchList));
    }
  };

  // Function to remove a token from the watch list
  const removeTokenFromWatchList = (token: string) => {
    const updatedWatchList = watchList.filter(item => item !== token);
    setWatchList(updatedWatchList);
    localStorage.setItem('watchList', JSON.stringify(updatedWatchList));

    const newBalances = { ...balances };
    delete newBalances[token];
    setBalances(newBalances);
  };

  // Function to fetch the balance of a token
  const fetchTokenBalance = async (token: string) => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(token, [
        "function balanceOf(address) view returns (uint256)"
      ], signer);

      const balance = await contract.balanceOf(signer.getAddress());
      setBalances(prevBalances => ({
        ...prevBalances,
        [token]: ethers.formatUnits(balance, 18)
      }));
    } catch (error) {
      console.error("Failed to fetch balance for token:", token, error);
    }
  };

  // Fetch the balance for each token in the watch list
  useEffect(() => {
    watchList.forEach(token => fetchTokenBalance(token));
  }, [watchList]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTokenInput(e.target.value);
  }

  return (
    <div className="content">
      <h1 className="text-[#F9FAFA] text-6xl font-bold leading-tight tracking-[-0.015em] px-4 pt-4">Your Watchlist</h1>
      <div className='flex'>
        <TextboxLabel label={"Add new token to watchlist. Find token addresses "} />
        <div className="mt-[6px] ml-[-10px] border p-1 rounded-xl"><Link to="https://etherscan.io">here</Link></div>
      </div>
      <div className="flex">
        <Textbox handleChange={handleSearchChange} placeholder={"Enter the token's contract address"} canEdit={true}/> 
        <div className="mt-5"><Button onClick={addTokenToWatchList} label={"Add Token"}/></div>
      </div>

      <ul>
        {watchList.map((token, index) => (
          <li key={index}>
            <WatchListToken tokenName={token} balance={balances[token] ? `${balances[token]} tokens` : "Fetching balance..."}/>
            <button onClick={() => removeTokenFromWatchList(token)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

