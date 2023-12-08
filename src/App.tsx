import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/navbar/Navbar';
import AppRouter from './routes/AppRouter';

import './App.css';
import { LocaleProvider } from './context/local';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </LocaleProvider>
  );
}
