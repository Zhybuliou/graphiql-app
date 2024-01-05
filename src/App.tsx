import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Navbar } from './components/navbar/Navbar';
import { AppRouter } from './routes/AppRouter';

import { LocaleProvider } from './context/local';
import Footer from './components/footer/Footer';
import StickyHeader from './components/header/header';

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <StickyHeader>
          <Navbar />
        </StickyHeader>
        <AppRouter />
        <Footer />
        <ToastContainer />
      </BrowserRouter>
    </LocaleProvider>
  );
}
