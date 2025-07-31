import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Games from './pages/Games';
import Cases from './pages/Cases';
import CaseOpening from './pages/CaseOpening';
import Profile from './pages/Profile';
import Inventory from './pages/Inventory';
import Leaderboard from './pages/Leaderboard';
import Payment from './pages/Payment';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <div className="App min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      <BrowserRouter>
        <Header />
        <main className="pt-16 min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/games/:gameId" element={<Cases />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/case/:caseId" element={<CaseOpening />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
        </main>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;