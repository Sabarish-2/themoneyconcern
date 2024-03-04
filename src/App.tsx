import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import GTICalPage from './pages/GTICalPage';
import GCGCalPage from './pages/GCGCalPage';
import HomePage from './pages/Homepage';
import './App.css';

function App() {

  return (
    <BrowserRouter>
    <div>
      <NavBar />
      <br />
      <Routes>
        <Route path="/themoneyconcern/gtical" element={<GTICalPage />} />
        <Route path="/themoneyconcern/gcgcal" element={<GCGCalPage />} />
        <Route path="/themoneyconcern" element={<HomePage />} />
        <Route path="/themoneyconcern/*" element={<HomePage />} />
      </Routes>
    </div >
    </BrowserRouter>
  );
}

export default App;