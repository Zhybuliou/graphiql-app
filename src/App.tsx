import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/navbar/Navbar';
import AppRouter from './routes/AppRouter';

import { LocaleProvider } from './context/local';
import { AppStateProvider } from './context/appState';
import Footer from './components/footer/Footer';

export default function App() {
  return (
    <LocaleProvider>
      <AppStateProvider>
        <BrowserRouter>
          <Navbar />
          <AppRouter />
          <ToastContainer />
          <Footer />
        </BrowserRouter>
      </AppStateProvider>
    </LocaleProvider>
  );
}
