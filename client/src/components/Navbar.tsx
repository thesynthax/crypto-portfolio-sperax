import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef, MouseEvent } from "react";
import DropDown from "./DropDown";

type NavbarProps = {
  account: string;
  walletConnected: boolean;
  setWalletConnected: Function;
  setAccount: Function;
}

const Navbar = (props: NavbarProps) => {
  
  const [openDropDown, setOpenDropDown] = useState(false);
  const excludedElementRef = useRef<HTMLDivElement>(null);
  const connectWalletButtonRef = useRef<HTMLDivElement>(null);

  const { pathname } = useLocation();

  if (!props.walletConnected && connectWalletButtonRef.current)
    connectWalletButtonRef.current.className = pathname === "/connect-wallet" ? "userCircle highlighted" : "userCircle";

  // for closing the drop down by clicking any where on the page
  const handleClickOutside = (event: MouseEvent) => {
    if (excludedElementRef.current && !excludedElementRef.current.contains(event.target as Node)) {
      setOpenDropDown(false);
    }
  };

  useEffect(() => {
    const handleClick = (event: any) => handleClickOutside(event);
    document.addEventListener('mousedown', handleClick);   

    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);


  return (
    <>
      <nav className="navbar">
        <div className="appLogo">
          <FontAwesomeIcon icon={faGem} />
        </div>
        <h1><Link to="/" className="appName">Cryptolio</Link></h1>
        <div className="links">
          {props.walletConnected ? 
            <>
              <Link to="/">Watch List</Link>
              <Link to="/history">Balance History</Link>
              <Link to="/allowance">Allowance</Link>
              <Link to="/transfer-tokens">Transfer Tokens</Link>
            </>
            :
            <>
              <span>Watch List</span>
              <span>Balance History</span>
              <span>Allowance</span>
              <span>Transfer Tokens</span>
            </>
          }
          <span ref={connectWalletButtonRef} className="userCircle" onClick={() => {if(props.walletConnected){setOpenDropDown(open => !open)}}}>{props.walletConnected ? <FontAwesomeIcon icon={openDropDown ? fasUser : farUser} /> : <Link to="/connect-wallet">Connect Wallet</Link>}</span>
        </div>
      </nav>
      {
        openDropDown && <div ref={excludedElementRef}><DropDown account={props.account} connected={props.walletConnected} setConnected={props.setWalletConnected} setAccount={props.setAccount} /></div>
      }
    </>
  )
}

export default Navbar;
