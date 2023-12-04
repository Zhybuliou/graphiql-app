import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home-page';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
}
