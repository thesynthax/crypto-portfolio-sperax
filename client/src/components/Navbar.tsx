import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGem, faUser as farUser } from '@fortawesome/free-regular-svg-icons';
import { faUser as fasUser } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect, useRef } from "react";
import DropDown from "./DropDown";

type NavbarProps = {
  walletConnected: boolean;
  setWalletConnected: Function;
}

const Navbar = (props: NavbarProps) => {
  
  const walletConnected = props.walletConnected;
  const setWalletConnected = props.setWalletConnected;
  const [openDropDown, setOpenDropDown] = useState(false);
  const excludedElementRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <nav className="navbar">
        <div className="appLogo">
          <FontAwesomeIcon icon={faGem} />
        </div>
        <h1>Cryptolio</h1>
        <div className="links">
          {walletConnected ? 
            <>
              <Link to="/">Watch List</Link>
              <Link to="/">Transaction History</Link>
              <Link to="/">Transfer Tokens</Link>
            </>
            :
            <>
              <span>Watch List</span>
              <span>Transaction History</span>
              <span>Transfer Tokens</span>
            </>
          }
          <span className="userCircle" onClick={() => {if(walletConnected){setOpenDropDown(open => !open)}}}>{walletConnected ? <FontAwesomeIcon icon={openDropDown ? fasUser : farUser} /> : <Link to="">Connect Wallet</Link>}</span>
        </div>
      </nav>
      {
        openDropDown && <DropDown connected={walletConnected} setConnected={setWalletConnected} />
      }
    </>
  )
}

export default Navbar;
