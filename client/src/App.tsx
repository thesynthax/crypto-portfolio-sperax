import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import About from './components/About';
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

  const [account, setAccount] = useState(null);
  const [walletConnected, setWalletConnected] = useState(true);

  return (
    <Router>
      <div className="App">
        <Navbar walletConnected={walletConnected} setWalletConnected={setWalletConnected}/>
          <Routes>
            <Route path="/" element={<Home walletConnected={walletConnected}/>} />
            <Route path="/watch-list" element={<WatchList />} />
            <Route path="/transaction-history" element={<TransactionHistory />} />
            <Route path="/transfer-tokens" element={<TransferTokens />} />
            <Route path="/profile" element={<Profile />} />
            {
              !walletConnected && <Route path="/connect-wallet" element={<ConnectWallet />} />
            }
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;

