import { HashRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import GTICalPage from './pages/GTICalPage';
import GCGCalPage from './pages/GCGCalPage';
import HomePage from './pages/Homepage';
import './App.css';

function App() {

  return (
    <HashRouter>
    <div>
      <NavBar />
      <br />
      <Routes>
        <Route path="/gtical" element={<GTICalPage />} />
        <Route path="/gcgcal" element={<GCGCalPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/*" element={<HomePage />} />
      </Routes>
    </div >
    </HashRouter>
  );
}

export default App;