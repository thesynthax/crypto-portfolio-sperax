import { Link } from "react-router-dom";

type DropDownProps = {
  account: string;
  connected: boolean;
  setConnected: Function;
  setAccount: Function;
}

// The top-right corner drop down menu
export const DropDown = (props: DropDownProps) => {

  const disconnectWallet = () => {
    props.setConnected(false);
    props.setAccount(null);
  }

  const profilePath = `/profile/${props.account}`;

  return (
    <>
      {
        props.connected && 
          <div className="dropDown">
            <Link to={profilePath}><li>Profile</li></Link>
            <Link to="/" onClick={disconnectWallet}><li>Logout Wallet</li></Link>
          </div>
      }
    </>
  )
}

export default DropDown;
