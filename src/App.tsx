import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar/Navbar';
import AppRouter from './routes/AppRouter';

import { LocaleProvider } from './context/local';

export default function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <Navbar />
        <AppRouter />
        <ToastContainer />
      </BrowserRouter>
    </LocaleProvider>
  );
}
