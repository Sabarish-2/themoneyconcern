import { HashRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import GTICalPage from './pages/GTICalPage';
import GCGCalPage from './pages/GCGCalPage';
import GIPCalPage from './pages/GIPCalPage';
import HomePage from './pages/Homepage';
import './App.css';

function App() {

  return (
    <HashRouter>
    <div>
      <NavBar />
      <br />
      <Routes>
        <Route path="/themoneyconcern/gtical" element={<GTICalPage />} />
        <Route path="/themoneyconcern/gcgcal" element={<GCGCalPage />} />
        <Route path="/themoneyconcern/gipcal" element={<GIPCalPage />} />
        <Route path="/themoneyconcern" element={<HomePage />} />
        <Route path="/themoneyconcern/*" element={<HomePage />} />
      </Routes>
    </div >
    </HashRouter>
  );
}

export default App;