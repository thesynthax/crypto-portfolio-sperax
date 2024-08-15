import { Link } from "react-router-dom";

type homepageProps = {
  walletConnected: boolean;
}

const Home = (props: homepageProps) => {
  const walletConnected = props.walletConnected; 
  return (
    <div className="homepage">
      {walletConnected ?
        <></>
        :
        <>
            <h2 className="line1"><span className="a1">W</span><span className="a2">ELCOME</span> <span className="a1">T</span><span className="a2">O</span></h2>
            <h1 className="line2">CRYPTOLIO</h1>
            <h3 className="line3">Cryptocurrency portfolio management solution</h3>
            <h3 className="line4"><span className="a1">Click on </span><Link to="" className="a2">Connect Wallet</Link><span className="a1"> to get started</span></h3>
       </> 
      }
    </div>
  );
}

export default Home; 
