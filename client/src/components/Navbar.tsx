import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from "react";
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

  const { hash, pathname, search } = useLocation();

  if (!props.walletConnected && connectWalletButtonRef.current)
    connectWalletButtonRef.current.className = pathname === "/connect-wallet" ? "userCircle highlighted" : "userCircle";

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
              <Link to="/transaction-history">Transaction History</Link>
              <Link to="/transfer-tokens">Transfer Tokens</Link>
            </>
            :
            <>
              <span>Portfolio</span>
              <span>Watch List</span>
              <span>Transaction History</span>
              <span>Transfer Tokens</span>
            </>
          }
          <span ref={connectWalletButtonRef} className="userCircle" onClick={() => {if(props.walletConnected){setOpenDropDown(open => !open)}}}>{props.walletConnected ? <FontAwesomeIcon icon={openDropDown ? fasUser : farUser} /> : <Link to="/connect-wallet">Connect Wallet</Link>}</span>
        </div>
      </nav>
      {
        openDropDown && <DropDown account={props.account} connected={props.walletConnected} setConnected={props.setWalletConnected} setAccount={props.setAccount} />
      }
    </>
  )
}

export default Navbar;
