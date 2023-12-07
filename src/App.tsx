import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard';
import AppRouter from './routes/AppRouter';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Dashboard />
      <AppRouter />
    </BrowserRouter>
  );
}
