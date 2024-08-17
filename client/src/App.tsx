import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { WatchList } from './components/WatchList';
import { TransactionHistory } from './components/TransactionHistory';
import { TransferTokens } from './components/TransferTokens';
import { Profile } from './components/Profile';
import { ConnectWallet } from './components/ConnectWallet';
import { NotFound } from './components/NotFound';

const App = () => {

  //const [account, setAccount] = useState<string>("");
  const [account, setAccount] = useState<string>(() => {
    const saved = localStorage.getItem('account');
    return saved ? JSON.parse(saved) : "";
  });
  //const [walletConnected, setWalletConnected] = useState<boolean>(false);
  const [walletConnected, setWalletConnected] = useState<boolean>(() => {
    const saved = localStorage.getItem('walletConnected');
    return saved ? JSON.parse(saved) : false;
  });

  const HandleWalletState = (value: boolean) => {
    setWalletConnected(value);
    localStorage.setItem('walletConnected', JSON.stringify(value));
  }
  const HandleAccountState = (value: string) => {
    setAccount(value);
    localStorage.setItem('account', JSON.stringify(value));
  }

  useEffect(() => {
    
  }, []);

  const profilePath = `/profile/${account}`;

  return (
    <Router>
      <div className="App">
        <Navbar account={account} walletConnected={walletConnected} setWalletConnected={HandleWalletState} setAccount={HandleAccountState}/>
          <Routes>
            <Route path="/" element={<Home account={account} walletConnected={walletConnected}/>} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/transfer-tokens" element={<TransferTokens />} />
            {
              !walletConnected ?
                <Route path="/connect-wallet" element={<ConnectWallet HandleWalletState={HandleWalletState} HandleAccountState={HandleAccountState}/>} />
                :
                <Route path={profilePath} element={<Profile accountAddress={account}/>} />
            }
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

