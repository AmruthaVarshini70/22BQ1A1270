import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShortenForm from './components/ShortenForm';
import RedirectHandler from './components/RedirectHandler';
import StatsPage from './components/StatsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShortenForm />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortcode" element={<RedirectHandler />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
