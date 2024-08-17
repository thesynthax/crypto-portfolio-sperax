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

  const [account, setAccount] = useState<string>("");
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  const HandleWalletState = (value: boolean) => {
    setWalletConnected(value);
  }
  const HandleAccountState = (value: string) => {
    setAccount(value);
  }

  return (
    <Router>
      <div className="App">
        <Navbar walletConnected={walletConnected} setWalletConnected={HandleWalletState} setAccount={HandleAccountState}/>
          <Routes>
            <Route path="/" element={<Home walletConnected={walletConnected}/>} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/transfer-tokens" element={<TransferTokens />} />
            {
              !walletConnected ?
                <Route path="/connect-wallet" element={<ConnectWallet HandleWalletState={HandleWalletState} HandleAccountState={HandleAccountState}/>} />
                :
                <Route path="/profile" element={<Profile accountAddress={account}/>} />
            }
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

