import { useEffect, useRef, useState } from "react";
import { RadioCarousel } from "./RadioCarousel";
import { ethers } from 'ethers';
import { useLocation, useNavigate } from "react-router-dom";
const ModelViewer = require("./metamask-logo/");

declare global {
  interface Window {
    ethereum: any;
  }
}

type ConnectWalletProps = {
  HandleWalletState: Function;
  HandleAccountState: Function;
};

let viewer: any;

export const ConnectWallet = (props: ConnectWalletProps) => {
  const [option, setOption] = useState<string>("metamask");
  const options = [
    { name: "coinSelector", label: "Metamask", value: "metamask" },
    { name: "coinSelector", label: "Other Wallets", value: "other" },
  ];

  const handleRadioChange = (value: string) => {
    setOption(value);
  };
  viewer = ModelViewer({
    pxNotRatio: false,
    width: 0.5,
    height: 0.5,

    followMouse: true,
  });
  viewer.stopAnimation();
  const metamaskLogoRef = useRef<HTMLDivElement>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const navigate = useNavigate();
  const { hash, pathname, search } = useLocation();
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

  const bodyElement = document.getElementsByTagName("body")[0];
  const bodyChildren = bodyElement.childNodes;
  bodyChildren.forEach((child) => {
    if (child instanceof Element)
    {
      const tagName = child.tagName.toLowerCase();
      if (tagName === "svg") {
        child.remove();
      } 
    }
  });

  useEffect(() => {
    if (pathname === "/connect-wallet" && metamaskLogoRef.current && metamaskLogoRef.current.children.length === 0 && option === "metamask") {
      metamaskLogoRef.current.appendChild(viewer.container);
    }
  });
  return (
    <div className="content">
      <div>
        <RadioCarousel options={options} selectedValue={option} onChange={handleRadioChange} /> 
        {
          (option === "metamask") ? 
            <div>
              <div ref={metamaskLogoRef} id="metamask-logo"></div>
              <div className="metamask-line">If you have an account on Metamask <button id="walletConnectButton"onClick={connectWallet}>Connect your Metamask account</button></div>
            </div> 
            : 
            <div>
              <div className="otherwallet-line">Currently under development. Come back later!</div>
            </div>
        }
      </div>
    </div>
  )
}
