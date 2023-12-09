import { BrowserRouter } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Error from './components/error/Error';
import AppRouter from './routes/AppRouter';

import './App.css';
import { LocaleProvider } from './context/local';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <Error />
      </BrowserRouter>
    </LocaleProvider>
  );
}
