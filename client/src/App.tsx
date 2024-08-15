import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';

const App = () => {

  const [account, setAccount] = useState(null);
  const [walletConnected, setWalletConnected] = useState(true);

  return (
    <Router>
      <div className="App">
        <Navbar walletConnected={walletConnected} setWalletConnected={setWalletConnected}/>
        <div className="container">
          <Home walletConnected={walletConnected}/>
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/about" element={<About />}/>
            <Route path="*" />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

