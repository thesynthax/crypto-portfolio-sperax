import { Link } from "react-router-dom";

type DropDownProps = {
  connected: boolean;
  setConnected: Function;
}

export const DropDown = (props: DropDownProps) => {

  const connected = props.connected;
  const setConnected = props.setConnected;

  return (
    <>
      {
        connected && 
          <div className="dropDown">
            <Link to="/profile"><li>Profile</li></Link>
            <Link to="/" onClick={() => setConnected(false)}><li>Logout Wallet</li></Link>
          </div>
      }
    </>
  )
}

export default DropDown;
