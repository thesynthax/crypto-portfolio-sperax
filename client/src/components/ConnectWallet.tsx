import { useState, useEffect } from "react";
import { RadioCarousel } from "./RadioCarousel";
import { ethers } from 'ethers';
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum: any;
  }
}

type ConnectWalletProps = {
  HandleWalletState: Function;
  HandleAccountState: Function;
};

export const ConnectWallet = (props: ConnectWalletProps) => {
  const [option, setOption] = useState<string>("metamask");
  const options = [
    { name: "coinSelector", label: "Metamask", value: "metamask" },
    { name: "coinSelector", label: "Other Coins", value: "other" },
  ];

  const handleRadioChange = (value: string) => {
    setOption(value);
  };

  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const navigate = useNavigate();
  const connectWallet = async () => {
    if (window.ethereum) { 
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        setProvider(provider);

        await provider.send("eth_requestAccounts", []);
        
        const signer = provider.getSigner();
        const accountAddress = (await signer).getAddress();
        setAccount(await accountAddress);

        props.HandleWalletState(true);
        props.HandleAccountState(await accountAddress);
        navigate('/');
      } catch (error) {
        console.error("User rejected the request or another error occurred", error);
      }
    } else {
      console.log("Metamask not detected. Please install Metamask.");
    }
  };

  return (
    <div className="content">
      <div className="">
        <RadioCarousel options={options} selectedValue={option} onChange={handleRadioChange} /> 
        {
          (option == "metamask") ? 
            <div>
              <button onClick={connectWallet}>Connect Wallet</button>
            </div> 
            : 
            <></>
        }
      </div>
    </div>
  )
}
