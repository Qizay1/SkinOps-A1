import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Battles from './pages/Battles';
import Cases from './pages/Cases';
import Inventory from './pages/Inventory';
import Profile from './pages/Profile';
import Leaderboard from './pages/Leaderboard';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App min-h-screen bg-gray-900 text-white">
      <BrowserRouter>
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/battles" element={<Battles />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </main>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;