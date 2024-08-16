import { Link } from "react-router-dom";

type DropDownProps = {
  connected: boolean;
  setConnected: Function;
  setAccount: Function;
}

export const DropDown = (props: DropDownProps) => {

  const disconnectWallet = () => {
    props.setConnected(false);
    props.setAccount(null);
  }

  return (
    <>
      {
        props.connected && 
          <div className="dropDown">
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/" onClick={disconnectWallet}><li>Logout Wallet</li></Link>
          </div>
      }
    </>
  )
}

export default DropDown;
